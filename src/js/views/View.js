import icons from 'url:../../img/icons.svg';
export default class View {
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.rendorError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  rendorError(message = this._errorMessage) {
    const markup = ` 
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
              <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      window.addEventListener(ev, handler);
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //spinner
  renderSpinner = function () {
    const markup = `
        <div class="spinner">
            <svg>
                 <use href="${icons}#icon-loader"></use>
            </svg>
      </div>`;
    // this._parentElement.innerHTML = '';
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}
