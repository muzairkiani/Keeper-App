import express from "express";

import note from "../models/NoteModels.js";


const router = express.Router();

export const getNotes = async (req, res) => {

    try {
        const foundNotes = await note.find();          
        res.status(200).json(foundNotes);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}


export const postNote = async (req, res) => {

    const {title, content} = req.body;

    const noteCreated = new note({title, content})
        try {
            await noteCreated.save();
            res.status(201).json(note);
            
        } catch (error) {
            res.status(409).json({message: error.message});
            
        }

}

export const deleteNote =  async (req, res) => {

    const {id} = req.params;
   const noteToBeDeleted = await note.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

export const editNote = async (req, res) => {

    //const {id} = req.params;
    
    const id= req.body._id;
    const {title, content} = req.body;
    const updatedNote = {title, content};


    try {
        console.log(updatedNote);

        const noteToBeEdited = await note.findByIdAndUpdate(id, updatedNote, { new: true });
        noteToBeEdited.save();

        console.log("done");
   
        res.json(noteToBeEdited);

    } catch (error) {

        console.log(error);
        
    }
   

}
export default router;
