import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //ดึงข้อมูลจากไพล์ users มาบันทึกลง database User
    const createdUsers = await User.insertMany(users);

    //เลือก id จาก record แรก เนื่องจากเป็น admin
    const adminUser = createdUsers[0]._id;

    //ดึงข้อมูลจากไพล์ products โดย map แต่ล่ะ product record คืนกับให้ตัวแปร sampleProducts
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //insert all products และ  user admin ลง database
    await Product.insertMany(sampleProducts);

    //แสดง message และ ใช้ module colors เพื่อแสดงสี
    console.log("Data Imported!".green.inverse);

    // ออกจาก process แต่ไม่ใช้ kill
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// console.log(process.argv[2]);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
