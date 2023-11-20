const numCit = 7;

window.onload = function() {

    // animazione del nome sito
    var elements = document.getElementsByClassName('typewrite');

    for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; color: #b5e853}";
    document.body.appendChild(css);

    // selezione random della quote
    var numRandom = Math.floor(Math.random() * numCit);
    var pElement = document.createElement("p");
    var h2Element = document.createElement("h2");
    console.log(numRandom)

    switch(numRandom){
        case 0:
            h2Element.innerText = "“Ora sta a sentire sorella, non torno a fare quella vita. Sono il libero, ruspante, solitario. E sottolineo libero!”\n(Galline in fuga, 2000)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
        break;

        case 1:
            h2Element.innerText = "“Vengono fuori dalle pareti! Vengono fuori dalle fottute pareti!”\n(Aliens Scontro finale, 1986)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
        break;

        case 2:
            h2Element.innerText = "“Strade? Dove stiamo andando non c'è bisogno di strade!”\n(Ritorno al futuro, 1985)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
        break;

        case 3:
            h2Element.innerText = "“Non può piovere per sempre.”\n(Il Corvo, 1994)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
        break;

        case 4:
            h2Element.innerText = "“Beati gli smemorati, perché avranno la meglio anche sui loro errori.”\n(Se mi lasci ti cancello, 2004)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
        break;

        case 5:
            h2Element.innerText = "“Ho sempre pensato che la mia vita fosse una tragedia, ma ora mi rendo conto che è una cazzo di commedia!”\n(Joker, 2019)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
        break;

        case 6:
            h2Element.innerText = "“Ci vediamo quando ci vediamo.”\n(Ocean's Thirteen, 2007)";
            pElement.appendChild(h2Element);
            numRandom = Math.floor(Math.random() * numCit)
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
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 150;

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