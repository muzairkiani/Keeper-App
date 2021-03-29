import React, { useState, useEffect } from "react";
import Note from "./Note";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';


function MainComponent(props) {

    const [notes, setNotes] = useState([]);
    const [editFlag, setEditFlag] = useState(false);


    const getNotes = async () => {
        const receivedNotes = await axios.get("http://localhost:4000/app", {});
        setNotes(receivedNotes.data);

    }


    useEffect(() => {
        getNotes();
    }, [notes]);


    const addNote = async (newNote) => {

        if (!editFlag) {
            try {
                await axios.post("http://localhost:4000/app/mynotes", newNote);
                console.log("post");
            } catch (error) {
                console.log(error);
            }

            setNotes(prevNotes => {
                return [...prevNotes, newNote];
            });
        }
        else if (editFlag) {

            console.log(note);

            try {

                await axios.put("http://localhost:4000/app/edit", note)
                    .then(res => console.log(res));

                setEditFlag(false);
                console.log("edit");

            } catch (error) {

                console.error("Wasn't able to update property.", error);

            }


        }

    }

    const deleteNote = async id => {

        try {
            await axios.delete(`http://localhost:4000/app/delete/${id}`);
            getNotes();
        } catch (error) {


        }
    }


    const editNote = (note) => {


        handleClick();
        setEditFlag(true);
        setNote(note);
        console.log(note);


    }


    const [note, setNote] = useState({
        title: "",
        content: ""
    });


    const [behaviour, setBehaviour] = useState({
        expansion: false,
        rows: "1"
    })

    function handleClick() {
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
        addNote(note);


        setNote({
            title: "",
            content: ""
        });

        event.preventDefault();
    }


    return (
        <div>
            <React.Fragment>
                <form className="create-note">
                    {behaviour.expansion ? <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    /> : null}

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
                            <AddIcon />
                        </Fab>
                    </Zoom>

                </form>
            </React.Fragment>

            <React.Fragment>
                {
                    notes.map((noteItem, index) => {
                        return (
                            <Note
                                key={index}
                                id={noteItem._id}
                                title={noteItem.title}
                                content={noteItem.content}
                                onDelete={deleteNote}
                                onEdit={() => editNote(noteItem)}
                            />
                        )
                    })

                }
            </React.Fragment>


        </div>
    );
}

export default MainComponent;
