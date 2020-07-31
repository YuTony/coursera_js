'use strict';

function clickOnBlock(params) {
    var table = document.getElementById(params.tableId);

    document.addEventListener('click', function (event) {
        var el = event.target;
        if(el.classList.contains("card_shirt")){
            event.target.parentElement.classList.add('add');
        }
        if(el.classList.contains("card")){
            if(event.target.classList.contains('add'))
                event.target.classList.remove('add');
            else
                event.target.classList.add('add');
        }
        if(el.classList.contains("card_info")){
            event.target.parentElement.classList.remove('add');
        }
    });

}