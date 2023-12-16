import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//สร้าง method match password โดยรับค่าจาก enteredPassword
userSchema.methods.matchPassword = async function (enteredPassword) {
  // จะใช้ ฟังก์ชัน bcrypt เปรียบเทียบกับ enteredPassword กับ object password ใน module
  return await bcrypt.compare(enteredPassword, this.password);
};

// pre เป็นฟังกชันที่จะทำก่อน action ที่เรากำหนด ในที่นี้คือ ก่อนที่จะ save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  //เปลี่ยน password จากก่อนที่จะบันทึกให้เข้ารหัสก่อน
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
