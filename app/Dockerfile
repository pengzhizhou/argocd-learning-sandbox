FROM node:slim
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY app.js ./
EXPOSE 80
CMD ["node", "app.js"]
