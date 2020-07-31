'use strict';

// Код валидации формы
function validateForm( object ){
    let inputList = Array.from(document.querySelectorAll('input'));
    let form = document.querySelector('form')

    inputList.forEach( input => {
        // Обработка события "снятие фокуса"
        input.addEventListener('blur', event =>{
            let eventTarget = event.target
            if (eventTarget.tagName === 'INPUT') {
                let value = eventTarget.value
                switch (eventTarget.getAttribute('name' )){
                    case 'name':
                        let regex = /[^a-zа-яё ]/iu
                        //Если элемент не прошел проверку
                        if (regex.test(value) || (value=='')){
                            eventTarget.setAttribute('class', object.inputErrorClass)
                        }
                        break;
                    case 'age':
                        let min = Number(eventTarget.dataset.validatorMin)
                        let max = Number(eventTarget.dataset.validatorMax)
                        if (!(value<=max && value>=min)){
                            eventTarget.setAttribute('class', object.inputErrorClass)
                        }
                        break;
                    case 'phone':
                        let regexValidator = new RegExp(eventTarget.dataset.validatorPattern)
                        if (!regexValidator.test(value)){
                            eventTarget.setAttribute('class', object.inputErrorClass)
                        }
                        break;
                    case 'number':
                        if (value !=='42'){
                            eventTarget.setAttribute('class', object.inputErrorClass)
                        }
                        break;
                }
            }
        }, true)

        // Обработка события "Фокус"
        input.addEventListener('focus', event => {
            let eventTarget = event.target
            if (eventTarget.tagName === 'INPUT') {
                if (eventTarget.hasAttribute('class')){
                    eventTarget.classList.remove(object.inputErrorClass)
                }
            }
        }, true)

    })

    form.addEventListener('submit', event =>{
        event.preventDefault()
        let success = document.querySelector('.form__success-msg')
        let error = document.querySelector('.form__error-msg')
        let newDiv = document.createElement('div')
        newDiv.setAttribute('id', 'newDiv')
        let parentDiv = document.querySelector('#profile')
        parentDiv.insertBefore(newDiv,success)

        let valid = true;
        inputList.forEach( eventInput => {
            let eventTarget = eventInput
            if (eventTarget.tagName === 'INPUT') {
                if (eventTarget.hasAttribute('class')) {
                    if (eventTarget.classList.contains(object.inputErrorClass)) {
                        eventTarget.classList.add(object.formInvalidClass)
                        valid = false;
                    } else {
                        eventTarget.classList.add(object.formValidClass)
                    }
                } else {
                    if (eventTarget.value !== '') {
                        eventTarget.setAttribute('class', object.formValidClass)
                    } else{
                        eventTarget.classList.add(object.formInvalidClass)
                        valid = false;
                    }
                }
            }
        }, true)

        let divCorrect = document.querySelector('#newDiv')
        if (valid){
            divCorrect.setAttribute('class', 'form_valid')
            divCorrect.appendChild(success)
        }else {
            divCorrect.setAttribute('class', 'form_invalid')
            divCorrect.appendChild(error)
        }
    })






}