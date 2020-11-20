class Modal {
    constructor({ id, triger }) {
        this.html = document.querySelector(`${id}`);
        this.trigerSelector = triger;
        this.closeBtn = this.html.querySelector('.modal-close');
        this.launch();
    }

    launch() {
        this.addEvents();
    }
    show() {
        this.html.style.display = "flex";
        setTimeout(() => {
            this.html.classList.add(`modal-show`);
        }, 300);

    }
    hide() {
        this.html.classList.remove(`modal-show`);
        setTimeout(() => {
            this.html.style.display = "none";
        }, 300);

    }

    addEvents() {
        document.addEventListener(`keydown`, (e) => {
            if (e.key === "Escape") { this.hide() }
        });
        document.addEventListener(`click`, (e) => {
            if (e.target == this.html || e.target == this.closeBtn) { this.hide() }
        });
    }
}