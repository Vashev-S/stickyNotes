import "./note.css";

function NoteComponent(props) {

  return (
    <div className="note-wrapper">
    {props.notes.map(note => {
          let style = {
            position: "absolute",
            width: note.width,
            height: note.height,
            left: note.x,
            backgroundColor: note.color,
            top: note.y,
            zIndex: note.zIndex
          }
          return (
            <div  className="note"
                  style={style}
                  id={note.key}
                  key={note.key}
                  draggable>
              <button onClick={props.deleteNote.bind(null, note.key)}>X</button>
              <div  className="note__title"
                    notepart="title"
                    draggable="false"
                    contentEditable="true"
                    suppressContentEditableWarning={true}>
                      {note.title}
              </div>
              <div  className="note__text"
                    draggable="false"
                    contentEditable="true"
                    notepart="body"
                    suppressContentEditableWarning={true}>
                     {note.text}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default NoteComponent;
