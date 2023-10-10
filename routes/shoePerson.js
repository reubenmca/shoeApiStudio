import express from "express";

import {
  createShoePerson,
  getShoePersons,
  getShoePerson,
  updateShoePerson,
  deleteShoePerson,
} from "../controllers/shoePerson.js";

const router = express.Router();

router.post("/", createShoePerson);
router.get("/", getShoePersons);
router.get("/:id", getShoePerson);
router.put("/:id", updateShoePerson);
router.delete("/:id", deleteShoePerson);

export default router;