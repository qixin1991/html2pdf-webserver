FROM registry.docker-cn.com/zenato/puppeteer

RUN mkdir -p /usr/src/app && npm install -g pm2
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN PUPPETEER_DOWNLOAD_HOST=http://s3.jzez100.com/s3/linux npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000

ENTRYPOINT pm2 start --no-daemon ecosystem.json