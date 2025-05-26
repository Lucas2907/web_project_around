export default class Section {
  constructor({ itens, renderer }, container) {
    this._itens = itens;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItems(card, isPrepend) {
    if (isPrepend) {
      this._container.prepend(card);
    } else {
      this._container.append(card);
    }
  }

  renderItens() {
    this._itens.forEach((item) => {
      this._renderer(item);
    });
  }
}
