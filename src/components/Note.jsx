import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Note = props => {
  
  const handleClickDelete = () => {
    props.onDelete(props.id);
  }

  const handleClickEdit = () => {
  
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClickDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleClickEdit}>
        <EditIcon />
      </button>
   
    </div>
  );
}

export default Note;
