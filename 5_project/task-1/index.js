function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

class Card {
    constructor(card, i) {
        this.card = card;
        this.open = false;
        this.face = card.children[0];
        this.back = card.children[1];
        this.correct = '?';
        this.card.dataset.num = i;
    }

    get val() {
        return this.back.textContent;
    }

    set val(s) {
        this.back.textContent = s;
    }

    setCorrect() {
        this.unsetWrong();
        if (this.correct == '?') {
            this.back.classList.add('correct-card');
            this.correct = 'true';
        }
    }
    unsetCorrect() {
        if (this.correct == 'true') {
            this.back.classList.remove('correct-card');
            this.correct = '?';
        }
    }
    setWrong() {
        this.unsetCorrect();
        if (this.correct == '?') {
            this.back.classList.add('wrong-card');
            this.correct = 'false';
        }
    }
    unsetWrong() {
        if (this.correct == 'false') {
            this.back.classList.remove('wrong-card');
            this.correct = '?';
        }
    }
    flip() {
        if (this.open) {
            this.unsetCorrect();
            this.unsetWrong();
            this.face.classList.remove('flip');
            this.back.classList.add('flip');
            this.open = false;
        } else {
            this.open = true;
            this.back.classList.remove('flip');
            this.face.classList.add('flip');
        }
    }
}

class Timer {
    constructor() {
        this.target = document.getElementById('timer');
        this.reset(1, 0);
    }
    start() {
        this.timer = window.setInterval(() => {
            if (this.time.sec == 0) {
                if (this.time.min == 0) {
                    this.stop();
                    board.lose();
                } else {
                    this.time = {
                        min: this.time.min - 1,
                        sec: 59,
                    }
                }
            } else {
                this.time.sec--;
            }
            this.display();
        }, 1000);
    }
    stop() {
        clearInterval(this.timer);
    }
    reset(min, sec) {
        this.time = {
            min: min,
            sec: sec,
        };
        this.display();
    }

    display() {
        this.target.textContent = `${
            this.time.min < 10 ? '0' + this.time.min : this.time.min}:${
            this.time.sec < 10 ? '0' + this.time.sec : this.time.sec}`;
    }
}

class Board {
    constructor(id) {
        this.target = document.getElementById(id);
        this.cards = Array.from(this.target.children, (val, i) => { return new Card(val, i) });

        this.timer = new Timer();

        this.mes = document.getElementById('message');
        this.jump = document.querySelector('.jump');

        document.getElementById('continue-button').addEventListener('click', () => { this.con(); });

        this.updatePics();

        this.target.addEventListener('click', e => {
            // console.log(e);
            if (!this.start) {
                this.start = true;
                this.timer.start();
            }
            let card;
            if (e.target.className === 'face' || e.target.className === 'memoji') {
                card = this.cards[e.target.parentElement.dataset.num];
            } else if (e.target.className === 'card') {
                card = this.cards[e.target.dataset.num];
            }
            if (card && !card.open) {
                card.flip();
                if (this.card1) {
                    if (this.card2) {
                        this.card1.flip();
                        this.card2.flip();
                        this.card1 = card;
                        this.card2 = null;
                    } else {
                        if (this.card1.val === card.val) {
                            this.card1.setCorrect();
                            card.setCorrect();
                            this.card1 = null;
                            this.card2 = null;
                            if (!--this.count) {
                                this.win();
                            }
                        } else {
                            this.card2 = card;
                            this.card1.setWrong();
                            this.card2.setWrong();
                        }
                    }
                } else {
                    this.card1 = card;
                }
            }
        })
    }

    updatePics() {
        let pics = ['🐰', '🐰', '🐻', '🐻', '🐼', '🐼', '🐨', '🐨', '🐯', '🐯', '🦁', '🦁'];

        let shuffledPics = shuffle(pics);

        this.card1 = null;
        this.card2 = null;

        this.cards.forEach((card, i) => {
            if (card.open) card.flip();
            card.val = shuffledPics[i];
        });

        this.start = false;

        this.count = 6;

        this.timer.reset(1, 0);

        this.jump.innerHTML = '';
    }

    win() {
        this.timer.stop();
        this.mes.classList.add('win');
        Array.from('Win').forEach(v => {
            let elem = document.createElement('span');
            elem.textContent = v;
            this.jump.appendChild(elem);
        });
    }

    lose() {
        this.mes.classList.add('lose');
        Array.from('Lose').forEach(v => {
            let elem = document.createElement('span');
            elem.textContent = v;
            this.jump.appendChild(elem);
        });
    }

    con() {
        this.mes.classList.remove('win');
        this.mes.classList.remove('lose');
        this.updatePics();
    }
}

let board = new Board('board');