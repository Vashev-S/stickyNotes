class NoteMoveController {

  /**
   * 
   * @param {Object} noteData {key: <String>, offsetX: <Number>, offsetY: <Number>}
   * @param {*} notes 
   * @returns 
   */
  moveNote(noteData, notes) {
    const key = noteData.key;

    if (!notes.hasOwnProperty(key)) return; //Do not throw error becasue text can be dragged over

    notes[key].x += noteData.offsetX;
    notes[key].y += noteData.offsetY;

    return this._recalculateTopNote(notes, key);
  }

  /**
   * Bubble a note
   * @param {Object} notes - notes as is (as they stored in localstorage) 
   * @param {number} key - ID of the note to buble
   * @returns 
   */
  _recalculateTopNote(notes, key) {
    let clickedZIndex = notes[key].zIndex,
      arrayNotes = Object.values(notes);

    arrayNotes.forEach(elem => {
      if (key === elem.key) {
        notes[elem.key].zIndex = arrayNotes.length;
      } else {
        if (elem.zIndex >= clickedZIndex) {
          notes[elem.key].zIndex--;
        }
      }
    });

    return notes;
  }
}

export default NoteMoveController
