import LocalSotrageController from "./LocalStorageController";


//here is a place to add work with a server
class NoteStorageController extends LocalSotrageController {
  constructor() {
    super(process.env.REACT_APP_LOCAL_STORAGE_NOTES);
  }

  getAll() {
    return this.getItem();
  }
}

export default NoteStorageController