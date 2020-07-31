let card = document.querySelectorAll('.card');
let front = document.querySelectorAll('.front');
let back = document.querySelectorAll('.back');

function on (numberOfCard) {
    back[numberOfCard].style.transform = 'rotateY(180deg)';
    front[numberOfCard].style.transform = 'rotateY(360deg)';
}

function off (numberOfCard) {
    back[numberOfCard].style.transform = 'rotateY(0deg)';
    front[numberOfCard].style.transform = 'rotateY(180deg)';
    console.log('off');
}

let previousCard;
for (let i=0; i<card.length; i++) {
    card[i].onclick = () => {
        
        if (i==previousCard) {
            off(i)
            previousCard = null;
        }
        else {
            on(i);
            previousCard = i;  
        }
        
    }
}