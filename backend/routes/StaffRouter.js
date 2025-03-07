import express from "express";
import { createStaff, listStaff } from "../controllers/StaffController.js"; // Add .js extension
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const staffRouter = express.Router();

staffRouter.post("/createaccount", createStaff);
staffRouter.get("/list-staff", listStaff);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Resolved path:", resolve(__dirname, "../controllers/StaffController.js"));
export default staffRouter;