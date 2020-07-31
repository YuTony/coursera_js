'use strict';

let cardList = ['🐶', '🐶', '🐰', '🐰', '🐱', '🐱', '🦁', '🦁', '🐭', '🐭', '🐻', '🐻'];

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let randomPosition = Math.floor(Math.random() * i);
		[array[i], array[randomPosition]] = [array[randomPosition], array[i]];
	}
	return array;
}

shuffle(cardList);

for (let card of document.querySelectorAll('.game__card')) {
	card.addEventListener('click', clickHandler);
}

function clickHandler() {
	let cardIndex = parseInt(this.dataset.orderNumber);
	let self = this;
	if (this.classList.contains('flip')) {
		this.classList.remove('flip');
	} else {
		this.classList.add('flip');
		this.querySelector('.back').innerText = cardList[cardIndex];
	}
}