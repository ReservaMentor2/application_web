FROM node:22-alpine
WORKDIR /webApplication

COPY . /webApplication

RUN npm install -g @angular/cli
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]