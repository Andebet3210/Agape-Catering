import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  role: { type: String, required: true, enum: ["ExecutiveChef", "CateringManager"] },
  password: { type: String, required: true },
  photo: { type: String, default: "" },
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;