#!/bin/bash

if [[ $(pwd | grep tools) ]]; then
  cd ..
fi

RED="\e[1;31m"
RED_SOFT="\e[0;31m"
GREEN="\e[1;32m"
GREEN_SOFT="\e[0;32m"
BLUE="\e[1;34m"
BLUE_SOFT="\e[0;34m"
YELLOW="\e[1;33m"
NO_COLOR="\e[0m"

checkPort() {
  PORT=$1
  DOCKER=$2
  OUTPUT=""
  sentinel=0
  while [[ "$OUTPUT" == "" ]] && [[ "$sentinel" -lt 6 ]]
  do
    OUTPUT="$(CHECK_PORT_PORT=${PORT} CHECK_PORT_DOCKER=${DOCKER} ./node_modules/@babel/node/bin/babel-node.js ./tools/check-port.js)"
    if [[ "$OUTPUT" == "" ]]; then
      sleep 5
      let sentinel=sentinel+1
      if [[ "$sentinel" -eq 1 ]]; then
        printf >&2 "\n"
      fi
      printf >&2 "[${RED}$sentinel/6${NO_COLOR}] Trying to check port ${YELLOW}$PORT${NO_COLOR}\n"
    fi
  done
  echo "$OUTPUT"
}

checkPortFast() {
  PORT=$1
  DOCKER=$2
  OUTPUT="$(CHECK_PORT_PORT=${PORT} CHECK_PORT_DOCKER=${DOCKER} ./node_modules/@babel/node/bin/babel-node.js ./tools/check-port.js)"
  echo "$OUTPUT"
}

OWNER="[${GREEN_SOFT}init-mysql-db.sh${NO_COLOR}] "
DOCKER_NETWORK="su-schedule-network"
CONTAINER_DB_NAME="su-schedule"
CONTAINER_ADMIN_NAME="su-schedule-admin"
DB_PORT="3306"
ADMIN_PORT="8080"
DB_ROOT_PASSWORD="Sandira7391551210"

###### LOAD ENVIRONMENT VARIABLES ######

PROJECT_URL="$(pwd)";
source "${PROJECT_URL}/.env"

###### DOCKER NETWORK ######

printf "\n${OWNER}${BLUE}Checking Docker...${NO_COLOR}\n"

dockerNetworkCreated="$(docker network ls -q -f name=^${DOCKER_NETWORK}$)"
if [[ "$dockerNetworkCreated" == "" ]]; then
  docker network create ${DOCKER_NETWORK}
  printf "\n${OWNER}${GREEN}Docker Network \"${DOCKER_NETWORK}\" created.${NO_COLOR}\n\n"
fi

###### MYSQL ######

containerUp="$(docker ps -q -f name=^${CONTAINER_DB_NAME}$)"
container="$(docker ps -a -q -f name=^${CONTAINER_DB_NAME}$)"
if [[ "$containerUp" != "" ]]; then
  printf "\n${OWNER}${GREEN}Docker MySQL is running on port ${DB_PORT}.${NO_COLOR}\n\n"
elif [[ "$container" == "" ]]; then
  docker run --name ${CONTAINER_DB_NAME} --net=${DOCKER_NETWORK} -p ${DB_PORT}:${DB_PORT} -e MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD} -d mysql
  printf "\n${OWNER}${GREEN}Docker MySQL created and started. Running on port ${DB_PORT}.${NO_COLOR}\n\n"
else
  docker start ${container}
  printf "\n${OWNER}${GREEN}Docker MySQL started. Running on port ${DB_PORT}.${NO_COLOR}\n\n"
fi

###### PHP_MY_ADMIN ######

adminContainerUp="$(docker ps -q -f name=^${CONTAINER_ADMIN_NAME}$)"
adminContainerQuestion="y"
if [[ "$adminContainerUp" != "" ]]; then
  printf "\n${OWNER}${GREEN}Docker phpMyAdmin is running on port ${ADMIN_PORT}.${NO_COLOR}"
  printf "\n${OWNER}${GREEN}Open ${BLUE}http://localhost:${ADMIN_PORT}${GREEN} in your browser.${NO_COLOR}\n\n"
else
  printf "\nDo you want to start a phpMyAdmin Docker image?: [y/n]\n"
  read adminContainerQuestion
  if [[ "$adminContainerQuestion" == "y" ]]; then
    adminContainer="$(docker ps -a -q -f name=^${CONTAINER_ADMIN_NAME}$)"
    if [[ "$adminContainer" == "" ]]; then
      docker run --name ${CONTAINER_ADMIN_NAME} --net=${DOCKER_NETWORK} -e MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD} -e PMA_HOST="${CONTAINER_DB_NAME}" -e PMA_PORT=${DB_PORT} -p ${ADMIN_PORT}:80 -d phpmyadmin/phpmyadmin
      printf "\n${OWNER}${GREEN}Docker phpMyAdmin created and started. Running on port ${ADMIN_PORT}.${NO_COLOR}"
      printf "\n${OWNER}${GREEN}Open ${BLUE}http://localhost:${ADMIN_PORT}${GREEN} in your browser.${NO_COLOR}\n\n"
    else
      docker start ${adminContainer}
      printf "\n${OWNER}${GREEN}Docker phpMyAdmin started. Running on port ${ADMIN_PORT}.${NO_COLOR}"
      printf "\n${OWNER}${GREEN}Open ${BLUE}http://localhost:${ADMIN_PORT}${GREEN} in your browser.${NO_COLOR}\n\n"
    fi
  fi
fi

###### CHECK PORTS ######

printf "\n${OWNER}${BLUE}Checking ports...${NO_COLOR}\n"

portMysql="$(checkPort ${DB_PORT})"
if [[ "$portMysql" != "" ]]; then
  printf "\n${OWNER}${GREEN}MySQL database is ready to work.${NO_COLOR}\n"
  printf "${OWNER}${GREEN}$portMysql${NO_COLOR}\n\n"
else
  printf "\n${OWNER}${YELLOW}Unable to check if database port is ready.${NO_COLOR}\n"
  printf "${OWNER}Sorry, you will need to check it manually.\n\n"
fi

if [[ "$adminContainerQuestion" == "y" ]]; then
  portPhpMyAdmin="$(checkPort ${ADMIN_PORT})"
  if [[ "$portPhpMyAdmin" != "" ]]; then
    printf "\n${OWNER}${GREEN}phpMyAdmin is ready to work.${NO_COLOR}\n"
    printf "${OWNER}${GREEN}$portPhpMyAdmin${NO_COLOR}\n"
    printf "${OWNER}${GREEN}Open ${BLUE}http://localhost:${ADMIN_PORT}${GREEN} in your browser.${NO_COLOR}\n\n"
  else
    printf "\n${OWNER}${RED}Unable to check if phpMyAdmin port is ready.${NO_COLOR}\n"
    printf "${OWNER}${RED}Sorry, you will need to check it manually.${NO_COLOR}\n\n"
  fi
fi
