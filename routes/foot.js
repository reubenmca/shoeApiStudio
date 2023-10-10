import express from "express";

import {
  createFoot,
  getFoots,
  getFoot,
  updateFoot,
  deleteFoot,
} from "../controllers/foot.js";

const router = express.Router();

router.post("/", createFoot);
router.get("/", getFoots);
router.get("/:id", getFoot);
router.put("/:id", updateFoot);
router.delete("/:id", deleteFoot);

export default router;