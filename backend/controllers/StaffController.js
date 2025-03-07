import Staff from "../models/StaffModel.js"; // Add .js extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path"; // Only import once
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("photo");

const createStaff = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err });
    }

    try {
      const { firstName, lastName, email, gender, role, password } = req.body;
      const photo = req.file ? req.file.path : "";

      const existingStaff = await Staff.findOne({ email });
      if (existingStaff) {
        return res.status(400).json({ message: "Staff already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newStaff = new Staff({
        firstName,
        lastName,
        email,
        gender,
        role,
        password: hashedPassword,
        photo,
      });

      await newStaff.save();
      const token = jwt.sign({ id: newStaff._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(201).json({ accessToken: token, message: "Staff registered successfully" });
    } catch (error) {
      console.error("Error creating staff:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};

const listStaff = async (req, res) => {
  try {
    const staff = await Staff.find({});
    res.json({ success: true, data: staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching staff list" });
  }
};

export { createStaff, listStaff };