import React, {useEffect} from 'react';
import NoteComponent from "../note/NoteComponent";
import BoardController from "./BoardController";

const boardController = new BoardController();

function BoardComponent() {
  const [noteList, setNoteList] = React.useState(boardController.getNotes());

  function deleteNote(id) {
    boardController.deleteNote(id)
  }

  function addNote() {
    setNoteList(boardController.addNote());
  }

  function clearAll() {
    setNoteList(boardController.clearAll());
  }

  function noteDragStart(e) {
    boardController.noteDragStart(e);
  }

  function noteDragEnd(e) {
    setNoteList(boardController.noteDragEnd(e));
  }

  function onNoteClick(e) {
    setNoteList(boardController.noteClicked(e));
  }

  function onTextChange(e) {
    setNoteList(boardController.changeNote(e));
  }

  function onSizeChange(e) {
    boardController.noteSizeChange(e);
  }


  //Really do not like it, but have not enough resources to implement something neat
  let canCall = true;
  useEffect(() => {
    //There has to be a lot of stuff getting data from server compare it with local data ask user to
    //replace or merge local data with server data and so on
    //6 hours was not enough for me to implement it
    /*fetch('fakeURI')
      .then(response => response.json())
      .then(noteList => setNoteList(noteList));*/

    const observer = new MutationObserver(function(mutations) {
      (function() {
          if (!canCall)
              return;
              onSizeChange(mutations[0]);
          canCall = false;
          setTimeout(function(){
              canCall = true;
          }, 200);
      })()

    });
    let target = document.querySelector('.note');

    if (!target) return;

    observer.observe(target, {
      attributes: true
    });
  });
  //The end of a "Do not like it" part


  return (
    <div className="board">
      <div className="board__buttonGroup">
        <button className="" type="button" onClick={addNote}>Add a new note</button>
        <button className="" type="button" onClick={clearAll}>Clear All</button>
      </div>
      <div  className="note-cont"
            onDragStart={noteDragStart}
            onDragEnd={noteDragEnd}
            onClick={onNoteClick}
            onBlur={onTextChange}>
        
        {noteList.length ? (
          <NoteComponent notes = {noteList} deleteNote = {deleteNote.bind(this)}/>):
          (<p>Create the first Note</p>)
        }
        
      </div>
    </div>
  )
}

export default BoardComponent