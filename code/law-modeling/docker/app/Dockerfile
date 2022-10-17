FROM node
ENV NODE_ENV=PROD
COPY ["../../nest-cli.json", "../../package.json", "../../tsconfig.json", "/data/"]
WORKDIR /data
RUN npm i
COPY . /data
EXPOSE 3000
CMD [ "npm", "run", "start" ]