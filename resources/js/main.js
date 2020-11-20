class Main {
    constructor() {
        this.arrCountries = [];
        this.modal = new Modal({
            id: '#my-modal',
            triger: 'article'
        });
        this.launch();
    }
    launch() {
        this.getData()
            .then(arrCountries => this.drawData({ arrCountries })
                .then((arrArticle) => this.addEvents({ arrArticle }))
            )
    }
    getData() {
        return new Promise((resolve, reject) => {
            fetch('https://restcountries.eu/rest/v2/lang/es', {
                method: 'GET',
                /* headers: {'Content-Type': 'application/json' }*/
            }).then(rs => rs.json()).then(arrCountries => {
                arrCountries.length = 12
                resolve(arrCountries);
            }).catch(e => reject(e));
        });
    }
    drawData({ arrCountries }) {
        return new Promise((resolve, reject) => {
            let template = document.querySelector('template');
            template = document.importNode(template.content, true);
            let articleTemplate = template.querySelector('article');
            let mainContainer = document.querySelector('.main-content');
            let arrArticle = [];
            arrCountries.forEach((country, index) => {
                let article = articleTemplate.cloneNode(true);
                article.querySelector('.card-title').innerHTML = country.name;
                article.querySelector('header>img').src = country.flag;
                let listDetail = article.querySelectorAll('.detail');
                listDetail[0].querySelector('strong').innerHTML = country.capital;
                listDetail[1].querySelector('strong').innerHTML = country.population;
                listDetail[2].querySelector('strong').innerHTML = country.currencies[0].code;
                listDetail[3].querySelector('strong').innerHTML = country.alpha2Code;
                article.id = `country-${index}`;
                arrArticle.push({
                    html: article,
                    data: country
                });
                mainContainer.appendChild(article);
            });
            resolve(arrArticle);
        });
    }

    addEvents({ arrArticle }) {
        arrArticle.forEach(article => {
            article.html.querySelector('button').addEventListener(`click`, () => {
                this.drawInModal({ country: article.data, target: this.modal.html })
                    .then(() => this.modal.show());
            })
        });
    }

    drawInModal({ country, target }) {
        return new Promise((resolve, reject) => {
            target.querySelector('.modal-title').innerHTML = country.name;
            target.querySelector('.modal-header img').src = country.flag;

            let arrDetails = Array.from(target.querySelectorAll('.modal-detail'));
            arrDetails['0'].querySelector('strong').innerHTML = country.region;
            arrDetails['1'].querySelector('strong').innerHTML = country.subregion;
            resolve();
        });
    }
}