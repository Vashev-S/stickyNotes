import NoteStorageController from "../../storageController/NoteStorageController";
import NoteMoveController from "./NoteMoveController";

class Note {
  constructor() {
    this.noteStorage = new NoteStorageController();
  }

  addNote(width = '200px', height = '200px', title = 'Put ya title here', text = 'Comment section') {
    const note = {
      width: width,
      height: height, 
      title: title,
      text: text,
      x: 150,
      y: 150,
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      zIndex: 0,
      key: new Date().getTime().toString()
    }

    return this._saveNote(note);
  }

  moveNote(noteData) {
    const existedNotes = this.getAll(true),
          updatedNotes = new NoteMoveController().moveNote(noteData, existedNotes);

    return this._saveNotes(updatedNotes);
  }

  changeNote(noteData) {
    const notes = this.getAll(true),
          key = noteData.key;

    if (!notes.hasOwnProperty(key)) throw new Error('Attempt to change note that does not exists.');

    Object.assign(notes[key], noteData);
    return this._saveNote(notes[key]);
  }

  /**
   * 
   * @returns {Array} list of notes after an action
   */
  clearAll() {
    this.noteStorage.clearAll();
    return this.getAll();
  }

  deleteNote(key) {
    return this.noteStorage.deleteKey(key);
  }

  /**
   * 
   * @returns {Array} list of notes after an action
   */
  _saveNote(note) {
    this.noteStorage.saveItem(note);

    return this.getAll();
  }

  /**
   * 
   * @returns {Array} list of notes after an action
   */
  _saveNotes(notes) {
    this.noteStorage._saveItems(notes)

    return this.getAll();
  }

  /**
   * 
   * @returns {Array} array of notes
   */
  getAll(asObj = false) {
    if (asObj) {
      return this.noteStorage.getAll()
    } else {
      return Object.values(this.noteStorage.getAll());
    }
  }
}

export default Note
