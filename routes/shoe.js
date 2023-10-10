import express from "express";

import {
  createShoe,
  getShoes,
  getShoe,
  updateShoe,
  deleteShoe,
} from "../controllers/shoe.js";

const router = express.Router();

router.post("/", createShoe);
router.get("/", getShoes);
router.get("/:id", getShoe);
router.put("/:id", updateShoe);
router.delete("/:id", deleteShoe);

export default router;