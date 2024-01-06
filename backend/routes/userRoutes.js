import express from "express" ;
const router = express.Router();

import {authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser}
  from "../controllers/userController.js";

  import {protect, admin} from "../middleware/authMiddleware.js";



//post(register) = เป็น middleware เพื่อตรวจคุณสมบัติ admin
// router.route("/").post(registerUser).get(getUsers); หมายถึงจะเป็นแบบ post หรือ get ก็ได้
// เช่น ถ้า post / ก็จะไปหา registerUser และ get / ก็จะไปหา getUser
router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/logout", logoutUser);
router.post("/auth", authUser);

// เป็นการเรียก /profile
// ถ้าเรียก get method ก็จะไปเรียก getUserProfile
// ถ้าเรียก put method ก็จะไปเรียก updateUserProfile
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// เป็นการเรียก โดย id
// ถ้า delete method /id ก็จะไปเรียก deleteUser
// ถ้า get method /id ก็จะไปเรียก getUserById
// ถ้า put method /id ก็จะไปเรียก updaeteUser
// protect กับ admin เปน middleware ทำหน้าที่ป้องกัน ก่อนจะเข้าถ้ง function deleteUser, getUserById, updateUser
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);

export default router;