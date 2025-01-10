const numCit = 13;

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
            h4Element.innerText = "Now you listen here sister, I'm not going back to that life. I'm a lone-free ranger. Emphasis on 'free'!\n(Chicken Run, 2000)";
            pElement.appendChild(h4Element);
        break;

        case 1:
            h4Element.innerText = "They're coming outta the walls. They're coming outta the goddamn walls. Let's book!\n(Aliens, 1986)";
            pElement.appendChild(h4Element);
        break;

        case 2:
            h4Element.innerText = "Roads? Where we're going we don't need roads.\n(Back to the Future, 1985)";
            pElement.appendChild(h4Element);
        break;

        case 3:
            h4Element.innerText = "It can't rain all the time.\n(The Crow, 1994)";
            pElement.appendChild(h4Element);
        break;

        case 4:
            h4Element.innerText = "Blessed are the forgetful, for they get the better even of their blunders.\n(Eternal Sunshine of the Spotless Mind, 2004)";
            pElement.appendChild(h4Element);
        break;

        case 5:
            h4Element.innerText = "I used to think that my life was a tragedy, but now I realize, it's a fucking comedy.\n(Joker, 2019)";
            pElement.appendChild(h4Element);
        break;

        case 6:
            h4Element.innerText = "I'll see you when I see you.\n(Ocean's Thirteen, 2007)";
            pElement.appendChild(h4Element);
        break;

        case 7:
            h4Element.innerText = "If you don't smoke Tarrlytons... fuck you!\n(Idiocracy, 2006)";
            pElement.appendChild(h4Element);
        break;

        case 8:
            h4Element.innerText = "So mortgage bonds are dog shit. CDOs are dog shit wrapped in cat shit.\n(The Big Short, 2015)";
            pElement.appendChild(h4Element);
        break;

        case 9:
            h4Element.innerText = "Smokey, this is not 'Nam. This is bowling. There are rules.\n(The Big Lebowski, 1998)";
            pElement.appendChild(h4Element);
        break;

        case 10:
            h4Element.innerText = "With great power comes great responsibility.\n(Spider-Man, 2002)";
            pElement.appendChild(h4Element);
        break;

        case 11:
            h4Element.innerText = "Now I am become Death, the destroyer of worlds.\n(Oppenheimer, 2023)";
            pElement.appendChild(h4Element);
        break;

        case 12:
            h4Element.innerText = "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.\n(The Matrix, 1999)";
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
