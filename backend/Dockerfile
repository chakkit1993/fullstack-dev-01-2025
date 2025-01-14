FROM node:latest

# working directory
WORKDIR /app

# copy package.json
COPY package*.json ./

# install nodemon
RUN npm install -g nodemon
# install package.json

# install nodemon
RUN npm install prisma --legacy-peer-deps

RUN npm install
# copy ./ to ./
COPY ./ ./

# # run npx prisma generate
RUN npx prisma generate

# # run npx prisma db push
# RUN npx prisma db push


#export port:8080
EXPOSE 8080

#run "npm run dev"
# CMD ["npm", "run","dev"]
CMD ["sh", "start-app.sh"]
