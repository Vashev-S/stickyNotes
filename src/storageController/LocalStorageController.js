class LocalSotrageController {
  constructor(localStorageObject) {
    this.name = localStorageObject;
  }

  /**
   * 
   * @param {Object} item 
   */
  saveItem(item) {
    return this._saveItem(item);
  }

  /**
   * 
   * @param {Object} item 
   */
  updateItem(item) {
    return this._saveItem(item);
  }

  clearAll() {
    return window.localStorage.removeItem(this.name);
  }

  /**
   * 
   * @param {Number} key 
   */
  deleteKey(key) {
    const item = this.getItem();
    delete item[key];

    return window.localStorage.setItem(this.name, JSON.stringify(item))
  }

  _saveItem(item) {
    const existedData = this.getItem(this.name) || {};
    existedData[item.key] = item;

    return window.localStorage.setItem(this.name, JSON.stringify(existedData));
  }

  _saveItems(items) {
    const existedData = this.getItem(this.name) || {},
          refreshedData = Object.assign(existedData, items);

    return window.localStorage.setItem(this.name, JSON.stringify(refreshedData));
  }

  /**
   * 
   * @returns {Object || Null}
   */
  getItem() {
    let data = window.localStorage.getItem(this.name) || '{}';
    return JSON.parse(data);
  }
}

export default LocalSotrageController