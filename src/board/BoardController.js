import NoteController from '../note/NoteController/NoteController'
import BoardNoteEventController from './BoardNoteEventController'

class BoardController {
  constructor() {
    this.noteController = new NoteController();
    this.boardNoteEventController = new BoardNoteEventController();
  }

  addNote(width, height, text, title) {
    return this.noteController.addNote(width, height, text, title);
  }

  clearAll() {
    return this.noteController.clearAll();
  }

  deleteNote(id) {
    return this.noteController.deleteNote(id);
  }

  getNotes() {
    return this.noteController.getAll();
  }

  moveNote(noteData) {
    return this.noteController.moveNote(noteData);
  }

  changeNote(e) {
    const note =  this.boardNoteEventController.changeNote(e);
    return this.noteController.changeNote(note);
  }

  noteSizeChange(e) {
    const note = this.boardNoteEventController.noteSizeChange(e);

    return this.noteController.changeNote(note); 
  }

  noteDragStart(e) {
    return this.boardNoteEventController.noteDragStart(e);
  }

  noteDragEnd(e) {
    const note = this.boardNoteEventController.noteDragEnd(e);

    return this.moveNote(note);
  }

  /**
   * consider click as a move by (0;0)
   * @param {*} e 
   * @returns 
   */
  noteClicked(e) {
    const note = this.boardNoteEventController.noteClicked(e);

    return this.moveNote(note);
  }

}

export default BoardController