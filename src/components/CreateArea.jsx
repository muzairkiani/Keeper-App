import React, {useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';


function CreateArea(props) {


  const [note, setNote] = useState({
    title: "",
    content: ""
  });


  const [editOption, setEditOption] = useState(true)

  const[behaviour, setBehaviour]=useState({
    expansion: false,
    rows: "1"
  })

  function handleClick(){
    setBehaviour({
      expansion: true,
      rows: "3"
    });

  }

  function handleChange(event) {
   
    const { name, value } = event.target;
    
   

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
   
 
    setNote({
      title: "",
      content: ""
    });

    event.preventDefault();
  }

  const  changeNote = oldNote => {

    props.onEdit(props.oldNote);
    setEditOption(true);
    setNote({
      title: oldNote.title,
      content: oldNote.content
    })
    console.log(props.oldNote + "hey");




  }

  return (
    <div>
      <form className="create-note">
      {behaviour.expansion ?  <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />: null}
       
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={behaviour.rows}
        />
        <Zoom in={behaviour.expansion}>
        <Fab onClick={submitNote}>
          <AddIcon/>
        </Fab>
        </Zoom>

      </form>
    </div>
  );
}

export default CreateArea;
