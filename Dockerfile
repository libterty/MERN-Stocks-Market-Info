# 建立image鏡像
FROM node
# 建立docker目錄檔存放鏡像
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# 由於我之後會push開發版，所以安裝nodemon
RUN npm install -g nodemon
# 在目錄內安裝套件
COPY package.json /usr/src/app/
RUN npm install
# 把所有文件移植進目錄
COPY . /usr/src/app
# 預設port
EXPOSE 8080
# 執行
CMD ["npm", "dev"]