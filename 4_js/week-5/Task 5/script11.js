"use strict";
// РЎРѕР±С‹С‚РёСЏ

// РљРѕРґ РІР°Р»РёРґР°С†РёРё С„РѕСЂРјС‹
function validateForm(objParam) {
  let methodsForValidate = {
    name: srcEvent => {
      let str;

      str = srcEvent.value;
      if (!(str.match(/[^Рђ-РЇР°-СЏA-Za-z]/g) == null)) {
        srcEvent.classList.add(objParam.inputErrorClass); // РµСЃР»Рё РЅРµ РїСЂРѕС€Р»Р° РІР°Р»РёРґР°С†РёСЏ
        return false;
      } else {
        if (str == "") {
          srcEvent.classList.add(objParam.inputErrorClass);
          return false;
        }
      }
    },
    age: srcEvent => {
      let userAge;
      let minAge;
      let maxAge;

      userAge = Number(srcEvent.value);
      minAge = Number(srcEvent.dataset.validatorMin);
      maxAge = Number(srcEvent.dataset.validatorMax);
      if (userAge < minAge || userAge > maxAge || isNaN(userAge)) {
        srcEvent.classList.add(objParam.inputErrorClass); // РµСЃР»Рё РЅРµ РїСЂРѕС€Р»Р° РІР°Р»РёРґР°С†РёСЏ
        return false;
      }
    },
    phone: srcEvent => {
      const validPhone = srcEvent.dataset.validatorPattern;
      let phone;

      phone = srcEvent.value;
      if (phone == "") {
        return;
      } else if (phone.match(validPhone) == null) {
        srcEvent.classList.add(objParam.inputErrorClass); // РµСЃР»Рё РЅРµ РїСЂРѕС€Р»Р° РІР°Р»РёРґР°С†РёСЏ
        return false;
      }
    },
    number: srcEvent => {
      let number;

      number = Number(srcEvent.value);
      if (isNaN(number)) {
        srcEvent.classList.add(objParam.inputErrorClass); // РµСЃР»Рё РЅРµ РїСЂРѕС€Р»Р° РІР°Р»РёРґР°С†РёСЏ
        return false;
      }
    },
    removeWrongClass: srcEvent => {
      srcEvent.addEventListener(
        "focus",
        function(event) {
          if (srcEvent.classList.contains(objParam.inputErrorClass)) {
            srcEvent.classList.remove(objParam.inputErrorClass);
          }
          event.stopImmediatePropagation();
        },
        true
      );
    },
    checkAllForms: () => {
      let arrInputs = [];
      let form;
      let arrFlags = [];

      form = document.querySelector("form");
      arrInputs = Array.from(document.querySelectorAll("input"));
      arrInputs.map(value => {
        let method = value.name;

        if (methodsForValidate[method](value) == false) {
          form.classList.contains(objParam.formValidClass)
            ? form.classList.remove(objParam.formValidClass)
            : null;
          form.classList.add(objParam.formInvalidClass);
          arrFlags.push("bad");
        }
      });
      if (arrFlags.length == 0) {
        form.classList.contains(objParam.formInvalidClass)
          ? form.classList.remove(objParam.formInvalidClass)
          : null;
        form.classList.add(objParam.formValidClass);
      }
    }
  };
  Object.defineProperty(methodsForValidate, "classCleaner", {
    enumerable: false
  });
  Object.defineProperty(methodsForValidate, "button", {
    enumerable: false
  });

  document.addEventListener("click", function(event) {
    let srcEvent;
    srcEvent = event.target;

    // СЃРѕР±С‹С‚РёСЏ
    if (srcEvent.tagName === "INPUT") {
      // РїРѕР»Рµ name
      if (srcEvent.name == "name") {
        srcEvent.addEventListener(
          "blur",
          function(event) {
            methodsForValidate.name(srcEvent);
            event.stopImmediatePropagation();
          },
          true
        );

        methodsForValidate.removeWrongClass(srcEvent);
      }

      // РїРѕР»Рµ age
      else if (srcEvent.name == "age") {
        srcEvent.addEventListener(
          "blur",
          function(event) {
            methodsForValidate.age(srcEvent);
            event.stopImmediatePropagation();
          },
          true
        );

        methodsForValidate.removeWrongClass(srcEvent);
      }

      // РїРѕР»Рµ phone
      else if (srcEvent.name == "phone") {
        srcEvent.addEventListener(
          "blur",
          function(event) {
            methodsForValidate.phone(srcEvent);
            event.stopImmediatePropagation();
          },
          true
        );

        methodsForValidate.removeWrongClass(srcEvent);
      }

      //РїРѕР»Рµ number
      else if (srcEvent.name == "number") {
        srcEvent.addEventListener(
          "blur",
          function(event) {
            methodsForValidate.number(srcEvent);
            event.stopImmediatePropagation();
          },
          true
        );

        methodsForValidate.removeWrongClass(srcEvent);
      }
    }

    if (srcEvent.tagName === "BUTTON") {
      event.preventDefault();
      methodsForValidate.checkAllForms();
    }
  });

  document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      event.preventDefault();
      methodsForValidate.checkAllForms();
    }
  });
}
