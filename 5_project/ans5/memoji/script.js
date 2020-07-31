'use strict';

var cards = document.querySelectorAll(".cards__list .cards__item");
var cardsMix = [];

//Случайное перемешивание элементов в массиве по алгоритму Фишера-Йетса.
function shuffle(arr){
    var j, temp;
    for(var i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

//есть ли элемент с таким классом
function contains(cards, className) {
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.classList.contains(className)) {
            return card;
        }
    }
    return false;
}

//удаляет класс unequal и закрывает карточки
function closeUnequal (cards) {
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        if (card.querySelector('.cards__emoji').classList.contains('unequal')) {
            card.querySelector('.cards__emoji').classList.remove('unequal');
            card.classList.remove('flipper');
        }
    }
}

//Вывод карточек случайным образом
cardsMix = shuffle(Array.from(cards));
for (var j = 0;  j < cardsMix.length; j++) {
    document.querySelector('.cards__list').appendChild(cardsMix[j]);
}

for (var i = 0; i < cards.length; i++) {

    cards[i].addEventListener("click", function (event) {
        event.preventDefault();

        if (this.querySelector('.cards__emoji').classList.contains('equal')
            || this.querySelector('.cards__emoji').classList.contains('unequal')
        ) {
            return false;
        }

        var cardOpen = contains(cards, 'open');

        this.classList.add('flipper');

        closeUnequal (cards);

         if (cardOpen) {
             if (cardOpen.textContent === this.textContent && !this.classList.contains('open')) {
                 this.querySelector('.cards__emoji').classList.add('equal');
                 cardOpen.querySelector('.cards__emoji').classList.add('equal');

                 cardOpen.classList.remove('open');
             }
             if (cardOpen.textContent !== this.textContent && !this.classList.contains('open')) {
                 this.querySelector('.cards__emoji').classList.add('unequal');
                 cardOpen.querySelector('.cards__emoji').classList.add('unequal');

                 cardOpen.classList.remove('open');
             }
         } else {
             this.classList.add('open');
         }

    }, true);
}
