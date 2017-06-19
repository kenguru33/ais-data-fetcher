FROM node:latest
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8080
CMD ["node", "/app"]

