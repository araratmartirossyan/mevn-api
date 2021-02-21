
# Используй последний node js в самом верху обозначаем из какого контейнера мы наследуем функцинал
FROM node:14

# для того что бы наш проект запустился нам нужно чтобы вначале запустился mongo
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

# даем права скаченному файлу wait и устанавливаем глобально nodemon и yarn 
RUN chmod +x /wait && npm install --global nodemon && npm install --global yarn --force

# Указываем рабочую ветку на дев сервере
WORKDIR /usr/src/back

# копируем package и package lock json
COPY package*.json /usr/src/back/
COPY yarn.lock /usr/src/back/

# запускаем установку модулей с командой yarn
RUN yarn

# Объявляем переменные
ENV PORT=3001
ENV HOST=localhost
ENV SECRET=Ri$h$WCE08PfH^tH0G!UvFprbhK
ENV MONGO_PORT=27017
ENV MONGO_HOST=mongodb
ENV DB_NAME=mevn
ENV MONGO_USER=root
ENV MONGO_PASS=rootpassword

EXPOSE 3001
# Далее мы указываем инструкцию EXPOSE, которая говорит Docker, 
# что приложение в контейнере должно использовать определенный порт в контейнере. 
# Это не означает, что вы можете автоматически получать доступ к сервису, 
# запущенному на порту контейнера (в нашем примере порт 80). 
# По соображениям безопасности Docker не открывает порт автоматически, но ожидает, 
# когда это сделает пользователь в команде docker run. 
# Вы можете указать множество инструкций EXPOSE для указания, какие порты должны быть открыты. 
# Также инструкция EXPOSE полезна для проброса портов между контейнерами.

# ждем наш mongo и запускаем после него yarn dev с инспектором в браузере
CMD /wait && yarn dev --watch /usr/src
