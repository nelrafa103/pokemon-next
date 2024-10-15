FROM node:20
WORKDIR /pokemon-next
COPY ./ /pokemon-next/
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "dev" ]
