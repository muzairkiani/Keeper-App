import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    title:  String,
    content: String
});


const note = mongoose.model("Note", noteSchema);

export default note;