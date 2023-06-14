import express from "express";
import { addProduct, register } from "../Controllers/userController.js";
import { addProductAuth, registerChecks } from "../Middleware/authChecks.js";

const router = express.Router();

router.post('/register',registerChecks, register);
router.post('/add-product',addProductAuth, addProduct);

export default router;