const numCit = 10;

window.onload = function() {

    // animazione del nome sito
    let elements = document.getElementsByClassName('typewrite');

    for (let i=0; i<elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-type');
            let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    let css = document.createElement("style");
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; color: #b5e853}";
    document.body.appendChild(css);

    // selezione random della quote
    let numRandom = Math.floor(Math.random() * numCit);
    let pElement = document.createElement("p");
    let h4Element = document.createElement("h4");
    h4Element.style.color= "#666";

    switch(numRandom){
        case 0:
            h4Element.innerText = "“Ora sta a sentire sorella, non torno a fare quella vita. Sono il libero, ruspante, solitario. E sottolineo libero!”\n(Galline in fuga, 2000)";
            pElement.appendChild(h4Element);
        break;

        case 1:
            h4Element.innerText = "“Vengono fuori dalle pareti! Vengono fuori dalle fottute pareti!”\n(Aliens Scontro finale, 1986)";
            pElement.appendChild(h4Element);
        break;

        case 2:
            h4Element.innerText = "“Strade? Dove stiamo andando non c'è bisogno di strade!”\n(Ritorno al futuro, 1985)";
            pElement.appendChild(h4Element);
        break;

        case 3:
            h4Element.innerText = "“Non può piovere per sempre.”\n(Il Corvo, 1994)";
            pElement.appendChild(h4Element);
        break;

        case 4:
            h4Element.innerText = "“Beati gli smemorati, perché avranno la meglio anche sui loro errori.”\n(Se mi lasci ti cancello, 2004)";
            pElement.appendChild(h4Element);
        break;

        case 5:
            h4Element.innerText = "“Ho sempre pensato che la mia vita fosse una tragedia, ma ora mi rendo conto che è una cazzo di commedia!”\n(Joker, 2019)";
            pElement.appendChild(h4Element);
        break;

        case 6:
            h4Element.innerText = "“Ci vediamo quando ci vediamo.”\n(Ocean's Thirteen, 2007)";
            pElement.appendChild(h4Element);
        break;

        case 7:
            h4Element.innerText = "“Se non fumi le Tarrlytons... vaffanculo!”\n(Idiocracy, 2006)";
            pElement.appendChild(h4Element);
        break;

        case 8:
            h4Element.innerText = "“Le obbligazioni ipotecarie sono merda di cane, i CDO sono merda di cane avvolta in merda di gatto.”\n(La Grande Scommessa, 2015)";
            pElement.appendChild(h4Element);
        break;

        case 9:
            h4Element.innerText = "“Questo non è il Vietnam, è il bowling. Ci sono delle regole.”\n(Il grande Lebowski, 1998)";
            pElement.appendChild(h4Element);
        break;
    }
    document.getElementsByClassName('quote')[0].appendChild(pElement);
};

class TxtType {

    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }

    tick() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 150;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}
