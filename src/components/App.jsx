import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import MainComponent from "./MainComponent"


function App() {

  const [notes, setNotes] = useState([]);

    const getNotes = async () => {
    const receivedNotes = await axios.get("http://localhost:4000/app", {});
    setNotes(receivedNotes.data);

  }

  useEffect(() => {
    getNotes();
  }, [notes]);

  return (
    <div>
      <Header />
      <MainComponent
      />
      <Footer />
    </div>
  );
}

export default App;
