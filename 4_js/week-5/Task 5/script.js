"use strict";
(function() {
  function numbersValidator(number, min, max) {
    number = parseInt(number);

    if (isNaN(number)) {
      return false;
    }
    if (min && number < parseInt(min)) {
      return false;
    }
    if (max && number > parseInt(max)) {
      return false;
    }
    return true;
  }

  function validateValue(value, dataset) {
    switch (dataset.validator) {
      case "number":
        return numbersValidator(
          value,
          dataset.validatorMin,
          dataset.validatorMax
        );
      case "letters":
        var reg = new RegExp("^[a-zа-яё]+$", "i");
        return reg.test(value);
      case "regexp":
        var reg = new RegExp(dataset.validatorPattern);
        return reg.test(value);
      default:
        return true;
    }
  }

  function inputVerify(input) {
    var value = input.value;

    if (input.dataset.hasOwnProperty("required") && !value) {
      return false;
    }

    var validator = input.dataset.validator;

    if (validator && value) {
      return validateValue(value, input.dataset);
    } else {
      return true;
    }
  }

  window.validateForm = function(settings) {
    var form = document.getElementById(settings.formId);
    var inputs = Array.from(
      document.querySelectorAll("#" + settings.formId + " input")
    );

    form.addEventListener(
      "focus",
      function(event) {
        var target = event.target;
        if (target.tagName === "INPUT") {
          target.classList.remove(settings.inputErrorClass);
        }
      },
      true
    );

    form.addEventListener(
      "blur",
      function(event) {
        var target = event.target;
        if (target.tagName === "INPUT") {
          if (!inputVerify(target)) {
            target.classList.add(settings.inputErrorClass);
          }
        }
      },
      true
    );

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      form.classList.remove(settings.formValidClass);
      form.classList.remove(settings.formInvalidClass);

      var error = false;
      inputs.forEach(function(input) {
        if (!inputVerify(input)) {
          input.classList.add(settings.inputErrorClass);
          error = true;
        }
      });
      if (error) {
        form.classList.add(settings.formInvalidClass);
      } else {
        form.classList.add(settings.formValidClass);
      }
    });
  };
})();
