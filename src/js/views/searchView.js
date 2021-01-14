class SearchView {
  _parentEL = document.querySelector('.search');

  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;
    this._clearinput();
    return query;
  }

  _clearinput() {
    this._parentEL.querySelector('.search__field').value = '';
  }

  addhandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
