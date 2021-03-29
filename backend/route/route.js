import express from "express";


import {getNotes, postNote, deleteNote, editNote} from "../controllers/notes.js"



const router = express.Router();

router.post("/mynotes", postNote);
router.get("/", getNotes);
router.delete("/delete/:id", deleteNote);
router.put("/edit", editNote);




export default router;