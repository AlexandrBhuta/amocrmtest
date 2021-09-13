console.log('test');
document.addEventListener('DOMContentLoaded', function() {
//     function closeForm() {
//         document.querySelector('.form-popup-bg').classList.remove('is-visible');
//     }
//         /* Contact Form Interactions */
//         document.querySelector('#btnOpenForm').addEventListener('click', function (event) {
//             event.preventDefault();
//             document.querySelector('.form-popup-bg').classList.add('is-visible');
//         });
// //document.querySelector('.form-popup-bg')
//     document.getElementsByClassName('form-popup-bg')[0].addEventListener("click", function (event) {
//         event.preventDefault();
//         document.getElementsByClassName('form-popup-bg')[0].classList.remove('is-visible');
//     }, false);
//
//
//     document.querySelector('#btnCloseForm').addEventListener("click", function(event) {
//         event.preventDefault();
//         document.querySelector('#btnCloseForm').classList.remove('is-visible');
//         }, false);


    // Get the modal
    let modal = document.getElementsByClassName("form-popup-bg")[0];

// Get the button that opens the modal
    let btn = document.getElementById("btnOpenForm");

// Get the <span> element that closes the modal
    let span = document.getElementById("btnCloseForm");

// When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.classList.add('is-visible');
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.classList.remove('is-visible');
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('is-visible');
        }
    };

    /* Инициализируем маски для каждого из них */
    let inputs = document.querySelectorAll('input[type="tel"]');

    Array.prototype.forEach.call(inputs, function(input) {
        new InputMask({
            selector: input,
            layout: input.dataset.mask // читаем дата-атрибут, установленный в html и устанавливаем его значение в качестве маски
        })
    })


});

// let form = document.getElementById("formSend");
//
// async function handleSubmit(event) {
//     event.preventDefault();
//     let status = document.getElementById("my-form-status");
//     let data = new FormData(event.target);
//     fetch(event.target.action, {
//         method: form.method,
//         body: data,
//         headers: {
//             'Accept': 'application/json'
//         }
//     }).then(response => {
//         status.innerHTML = "Успешно отправлено сообщение!";
//         form.reset()
//     }).catch(error => {
//         status.innerHTML = "С вашей формой есть проблемы!"
//     });
// }
// form.addEventListener("submit", handleSubmit);

// window.addEventListener('DOMContentLoaded', function() {



    /*
    Одиночный вызов может выглядеть так:

    new InputMask({
        selector: '#myInput',
        layout: '+385(___) ___-__-__'
      })
    */

// })

function InputMask(options) {
    this.el = this.getElement(options.selector);
    if (!this.el) return console.log('Что-то не так с селектором');
    this.layout = options.layout || '+_ (___) ___-__-__';
    this.maskreg = this.getRegexp();
    this.setListeners();
}

InputMask.prototype.getRegexp = function () {
    var str = this.layout.replace(/_/g, '\\d');
    str = str.replace(/\(/g, '\\(');
    str = str.replace(/\)/g, '\\)');
    str = str.replace(/\+/g, '\\+');
    str = str.replace(/\s/g, '\\s');
    return str;
};

InputMask.prototype.mask = function (e) {
    var _this = e.target,
        matrix = this.layout,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = _this.value.replace(/\D/g, "");

    if (def.length >= val.length) val = def;
    _this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });

    if (e.type == "blur") {
        var regexp = new RegExp(this.maskreg);
        if (!regexp.test(_this.value)) _this.value = "";
    } else {
        this.setCursorPosition(_this.value.length, _this);
    }
};

InputMask.prototype.setCursorPosition = function (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
};

InputMask.prototype.setListeners = function () {
    this.el.addEventListener("input", this.mask.bind(this), false);
    this.el.addEventListener("focus", this.mask.bind(this), false);
    this.el.addEventListener("blur", this.mask.bind(this), false);
};

InputMask.prototype.getElement = function (selector) {
    if (selector === undefined) return false;
    if (this.isElement(selector)) return selector;

    if (typeof selector == 'string') {
        var el = document.querySelector(selector);
        if (this.isElement(el)) return el;
    }

    return false;
};

InputMask.prototype.isElement = function (element) {
    return element instanceof Element || element instanceof HTMLDocument;
};


var form = document.getElementById("formSend");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        status.innerHTML = "Успешно отправлено сообщение!";
        form.reset()
    }).catch(error => {
        status.innerHTML = "С вашей формой есть проблемы!"
    });
}
form.addEventListener("submit", handleSubmit)