class Modal {
    constructor({ id, triger }) {
        this.html = document.querySelector(`${id}`);
        this.trigerSelector = triger;
        this.launch();
    }

    launch() {
        let arrTrigers = Array.from(document.querySelectorAll(`${this.trigerSelector}`));
        this.addEvents(arrTrigers);
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

    addEvents(arrTrigers) {
        // arrTrigers.forEach(triger => {
        //     triger.addEventListener(`click`, () => {
        //         console.log('hola');
        //         this.show();
        //     })
        // });
        document.addEventListener(`keydown`, (e) => {
            if (e.key === "Escape") { this.hide() }
        });
        document.addEventListener(`click`, (e) => {
            if (e.target == this.html) { this.hide() }
        });
    }
}