FROM node:16-alpine
WORKDIR /app

ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
ENV REACT_APP_API_ENDPOINT=http://192.168.0.23:9433
ENV FAST_REFRESH=false

COPY package.json .
#COPY yarn.lock .

RUN yarn install
COPY . .
EXPOSE 9450

CMD ["yarn", "start"]