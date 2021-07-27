class BoardNoteEventController {
  constructor() {
    this.dragX = 0;
    this.dragY = 0;
  }

  noteDragStart(e) {
    this.dragX = e.clientX;
    this.dragY = e.clientY;

    return {x: this.dragX, y: this.dragY}
  }

  noteDragEnd(e) {
    const note = {
      key: e.target.id,
      offsetX: e.clientX - this.dragX,
      offsetY: e.clientY - this.dragY 
    }

    this.dragX = 0;
    this.dragY = 0;

    return note;
  }

  /**
   * incapsulated logic to get an ID of a note
   * @param {*} e 
   * @returns 
   */
  getNoteId(e) {
    return e.target.id || e.target.offsetParent.id;
  }

  noteClicked(e) {
    const note = {
      key: this.getNoteId(e),
      offsetX: 0,
      offsetY: 0
    }

    return note;
  }

  noteTextChanged(e) {
    const noteKey = e.offsetParent.id;
    return noteKey;
  }

  noteSizeChange(e) {
    const width = e.target.clientWidth,
          height = e.target.clientHeight,
          note = {
            key: this.getNoteId(e),
            width: width,
            height: height
          };
  
    return note;
  }

  changeNote(e) {
    const whatHasBeenChanged = e.target.getAttribute('notepart'),
          newValue = e.target.innerHTML,
          note = {
            key: this.getNoteId(e)
          };

    if (whatHasBeenChanged === 'title') {
      note.title = newValue;
    }
    if (whatHasBeenChanged === 'body') {
      note.text = newValue;
    }

    return note;
  }
}

export default BoardNoteEventController;
