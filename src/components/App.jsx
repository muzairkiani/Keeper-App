import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App(props) {

  const [notes, setNotes] = useState([]);

  

 const getNotes = async () => {
   const receivedNotes = await axios.get("http://localhost:4000/app", {});
   setNotes(receivedNotes.data);
  
 } 
  

  useEffect(() => {
    getNotes();
    }, [notes]);
   

  const addNote = async (newNote) => {

    try {
      await axios.post("http://localhost:4000/app/mynotes", newNote);
      getNotes();
    } catch (error) {
      console.log(error);
    }
    
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });
  }

  const deleteNote = async id => {

   try {
   await axios.get(`http://localhost:4000/app/delete/${id}`);
    getNotes();
   } catch (error) {
     
   }
  }

  const editNote = async (id, oldNote) => {

    try {
      const receivedNote = await axios.get(`http://localhost:4000/app/edit/${id}`);
      oldNote = receivedNote.data[1];


      
      console.log(oldNote);
      console.log(notes);
      
      //return receivedNote.data[1];
      props.changeNote(oldNote);
      console.log("doneee");


      getNotes();
     } catch (error) {
       
     }

  }

  return (
    <div>
    
      <Header />
      <CreateArea
     
      onAdd={addNote}
      onEdit={editNote}
    
      />

      

    {
      notes.map((noteItem, index) => {
      return (
        <Note
        key={index}
        id={noteItem._id}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={deleteNote}
        onEdit={editNote}
      />
      )
    })
      
    }


      <Footer />
    </div>
  );
}

export default App;
