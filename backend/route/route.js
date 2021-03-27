import express from "express";


import {getNotes, postNote, deleteNote, editNote} from "../controllers/notes.js"



const router = express.Router();

router.post("/mynotes", postNote);
router.get("/", getNotes);
router.get("/delete/:id", deleteNote);
router.get("/edit/:id", editNote);




export default router;