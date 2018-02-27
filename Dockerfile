FROM registry.docker-cn.com/zenato/puppeteer

USER root
RUN mkdir -p /usr/src/app /usr/share/fonts/vista && npm install -g pm2
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN cp YaHeiConsolas.ttf /usr/share/fonts/vista/ && mkfontscale && mkfontdir && fc-cache -fv && PUPPETEER_DOWNLOAD_HOST=http://s3.jzez100.com/s3/linux npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000

ENTRYPOINT pm2 start --no-daemon ecosystem.json