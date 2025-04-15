export default class Section {
  constructor({ itens, renderer }, container) {
    this._itens = itens;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItems(card) {
    this._container.append(card);
  }

  renderItens() {
    this._itens.forEach((element) => {
      this._renderer(element);
    });
  }
}
