'use strict'

function validRe(re, val) {
    // if (!val) {
    //     return true;
    // }
    let reg = new RegExp(re, 'i');
    return reg.test(val);
}

function validNum(min, max, val) {
    if (min && max) {
        min = parseInt(min);
        max = parseInt(max);
        val = parseInt(val);
        // console.log(min,max,val);
        return val > min && val < max;
    } else {
        return true;
    }
}

function validElement(elem) {
    let dataset = elem.dataset;
    if (!elem.value) {
        if (dataset.hasOwnProperty('required')) {
            return false;
        } else {
            return true;
        }
    }

    switch (dataset.validator) {
        case 'letters':
            return validRe('^[a-zа-я]+$', elem.value);
        case 'number':
            return validNum(dataset.validatorMin, dataset.validatorMax, elem.value);
        case 'regexp':
            return validRe(dataset.validatorPattern, elem.value);
    }
}

window.validateForm = function (obj) {
    let form = document.getElementById(obj.formId);

    let inputs = Array.from(document.querySelectorAll(`#${obj.formId} input`));

    form.addEventListener('focus', event => {
        // console.log(event.target.tagName);
        let target = event.target;
        if (target.tagName === 'INPUT') {
            target.classList.remove(obj.inputErrorClass);
        }
    }, true);

    form.addEventListener('blur', event => {
        let target = event.target;
        if (target.tagName === 'INPUT') {
            if (!validElement(target)) {
                target.classList.add(obj.inputErrorClass);
            }
        }
    }, true);

    form.addEventListener('submit', event => {
        event.preventDefault();
        form.classList.remove(obj.formInvalidClass);
        form.classList.remove(obj.formValidClass);

        let hasError = false;
        inputs.forEach(elem => {
            // let target = elem.target;
            if (!validElement(elem)) {
                hasError = true;
                elem.classList.add(obj.inputErrorClass);
            }
        })

        if (hasError) {
            form.classList.add(obj.formInvalidClass);
        } else {
            form.classList.add(obj.formValidClass);
        }
    })

}

// Код валидации формы
