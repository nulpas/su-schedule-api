FROM node:lts

ARG jwtSecret
ARG saltRounds
ARG nodeEnv
ENV JWT_SECRET=$jwtSecret
ENV SALT_ROUNDS=$saltRounds
ENV NODE_ENV=$nodeEnv

WORKDIR /usr/src/app

COPY dist/. ./

RUN yarn install --production=false

RUN npm i sequelize -g

CMD ["sequelize", "db:migrate --env $NODE_ENV"]
CMD ["node", "vyz.js"]

EXPOSE 4001
