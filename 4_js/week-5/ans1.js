'use strict';
function validateForm(params) {
    const {formId, formValidClass, formInvalidClass, inputErrorClass} = params;
    const form = document.querySelector(`#${formId}`);
    const inputs = Array.from(document.querySelectorAll(`#${formId} input`));
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const isValid = inputs.reduce((total, current) => check(current) && total, true);
        form.classList.remove(formValidClass);
        form.classList.remove(formInvalidClass);
        isValid? form.classList.add(formValidClass) : form.classList.add(formInvalidClass);
    })
    form.addEventListener("blur", (e) => {
        const element = getInput(e);
        if (element) {
            check(element);
        }
    }, true);
    form.addEventListener('focus', (e) => {
        const element = getInput(e);
        element?.classList.remove(inputErrorClass);
    }, true);
    const getInput = (e) => {
        const element = e.target;
        return element.tagName === 'INPUT'? element : null;
    }
    const check = (element) => {
        const value = element.value;
        const {required, validatorMin, validatorMax, validatorPattern, validator} = element.dataset;
        const isRequired = required === "";
        const validators = {
            "letters": () => validateLetters(value, isRequired),
            "number": () => validateNumbers(value, validatorMin, validatorMax, isRequired),
            "regexp": () => validatePattern(value, validatorPattern, isRequired)
        }
        const isValid = validators[validator]? validators[validator]() : true;
        !isValid? element.classList.add(inputErrorClass) : element.classList.remove(inputErrorClass) ;
        return isValid;
    }
    const validateNumbers = (value, min, max, required) => {
        if(isNaN(value) || value === "") {
            return isNaN(value)? false : !required;
        }
        const number = parseInt(value);
        const minError = min && min > number;
        const maxError = max && max < number;
        return !(minError || maxError);
    }
    const validateLetters = (value, required) => {
        const pattern = required? /^[a-zР°-СЏС‘]+$/ : /^[a-zР°-СЏС‘]*$/
        return new RegExp(pattern, 'i').test(value);
    }
    const validatePattern = (value, pattern, required) => {
        if (!required && value === "") {
            return true;
        }
        return new RegExp(pattern).test(value);
    }
}