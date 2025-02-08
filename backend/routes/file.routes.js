import { Router } from "express";
import { uploadFile, getCreditReport } from "../controllers/file.controller.js";
import upload from "../middlewares/multerConfig.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/credit-report/:userId", getCreditReport);

export default router;
