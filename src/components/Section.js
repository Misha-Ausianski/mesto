export class Section {
    // constructor ({items, render}, selector) {
    constructor ({ render }, selector) {
        // this._renderedItems = items;
        this._render = render;
        this._container = selector;
    }

    setItem(item) {
        this._container.prepend(item);
    }

    // renderItems() {
    //     this._renderedItems.forEach((item) => {
    //         this._render(item);
    //     });
    // }

    renderItems(items) {
        items.forEach((item) => {
            this._render(item);
        });
    }
}