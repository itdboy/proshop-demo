Proshop-2

rafce = react arrow function constant 
 
ติดตั้ง react

/frontend 

npm i react-bootstrap bootstrap react-icons

import "bootstrap/dist/css/bootstrap.min.css";

npm i react-router-dom

npm i react-router-bootstrap


blackend setup
มาที่ path proshop-v2
npm init
ระบุรายละเอียด
version 2.0.0
description : eCommerce application build with MERN stack
entry point : server.js
license : MIT

npm start
npm i express
npm i -D nodemon concurrently
npm i color

แก้ไข package.json
 "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js" ,
    "client" :  "npm start --prefix frontend"
  },
  
npm run server
npm run client 
npm run dev

ติดตั้ง axios ใน backend
npm i dotenv


ติดตั้ง axios ใน frontend
npm i axios

mongodb

mongodb+srv://boy123:boy123@cluster0.x5pxp5d.mongodb.net/proshop?retryWrites=true&w=majority

digital ocean mongodb

username = doadmin
password = <replace-with-your-password>
host = mongodb+srv://db-mongodb-sgp1-72497-06adf3d5.mongo.ondigitalocean.com
database = admin

mongodb+srv://doadmin:l7D40Ucn5j8S13b2@db-mongodb-sgp1-72497-06adf3d5.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-sgp1-72497
 
 ติดตั้ง mongoose ใน backend
 npm i mongoose
 
 ติดตั้ง bcrypt ใน backend
npm i bcryptjs

 ติดตั้ง colors(add color to terminal)  ใน backend
npm i colors


วิธี run method ใน js file

เพื่อแสดง ตำแหน่ง argv ทั้งหมด
node backend/seeder.js -d 

ระบุว่าให้แสดง argv ที่ตำแหน่ง array ไหน
console.log(process.argv[2]);
จะไปแสดงคำว่า hello ในตำแหน่ง array ที่ 2 ตามที่ระบุข้างบน
node backend/seeder.js -hello

run คำสั่งใน package.json
npm run data:import

** ในการสร้าง database ใน mongodb
1. สร้างใน mongodb server สามารถเป็นตัวเล็กทั้งหมดได้
2. สร้างใน digitalocean ต้องขึ้นต้นด้วยตัวใหญ่
3. ใน db.js ต้องแก้ไขตัวอักษรให้ตรงกับชื่อ database ด้วย

ที่ frontend ติดตั้ง redux
npm i @reduxjs/toolkit react-redux 

npm i react-toastify

install jwt at frontend  สำหรับสร้าง cookie ที่ server
npm i jsonwebtoken

สำหรับส่ง cookie จาก server ไปที่ client 
npm i cookie-parser

