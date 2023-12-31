$(document).ready(function () {
    $('.tab-container:first').show();
    $('.tab-navigation li:first').addClass('active');

    $('.tab-navigation li').click(function (event) {
        index = $(this).index();
        $('.tab-navigation li').removeClass('active');
        $(this).addClass('active');
        $('.tab-container').hide();
        $('.tab-container').eq(index).show();
    });
});

$(document).ready(function () {
    $("form").on("submit", function (event) {
        var name = $("#name").val();
        var email = $("#email-register").val();
        var contactNumber = $("#phone").val();
        var nation = $("#nation").val();
        var course = $("#course").val();
        var typeclass = $("#typeclass").val();

        if (name === null || email === null || contactNumber === null || nation === null ||
            course === null || typeclass === null ) {
            alert('Please fill all the forms!');
        } else {
            addRegister();
        }
    });
});

jQuery.validator.addMethod("noSpace", function (value, element) {
    return value == '' || value.trim().length != 0;
}, "No space please and don't leave it empty");

jQuery.validator.addMethod("customEmail", function (value, element) {
    return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
}, "Please enter valid email address!");

jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
}, "Please specify a valid phone number");

$.validator.addMethod("alphanumeric", function (value, element) {
    return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, and underscores only please");


function addRegister() {
    if (localStorage.getItem("formData") === null) {
        let formData = [];

        formData.push({
            name: $("#name").val(),
            email: $("#email-register").val(),
            contactNumber: $("#phone").val(),
            nation: $("#nation").val(),
            course: $("#course").val(),
            typeclass: $("#typeclass").val(),
        });

        localStorage.setItem("formData", JSON.stringify(formData));
    } else {
        let storedData = JSON.parse(localStorage.getItem("formData"));

        const formData = {
            name: $("#name").val(),
            email: $("#email-register").val(),
            contactNumber: $("#phone").val(),
            nation: $("#nation").val(),
            course: $("#course").val(),
            typeclass: $("#typeclass").val(),
        };

        storedData.push(formData);
        localStorage.setItem("formData", JSON.stringify(storedData));
    }
}

function addValidate() {
    var $leadRegistrationForm = $('#leadRegistration');

    if ($leadRegistrationForm.length) {
        $leadRegistrationForm.validate({
            rules: {
                email: {
                    required: true,
                    customEmail: true
                },
                name: {
                    required: true
                },
                phone: {
                    required: true,
                    noSpace: true,
                    phoneUS: true
                },
                nation: {
                    required: true
                },
                course: {
                    required: true
                },
                typeclass: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Please enter email!',
                    email: 'Please enter valid email!'
                },
                name: {
                    required: 'Please enter full name!'
                },
                phone: {
                    required: 'Please enter contact number!'
                },
                nation: {
                    required: 'Please enter your nation!'
                },
                course: {
                    required: 'Please select course!'
                },
                typeclass: {
                    required: 'Please select type class!'
                },
                submitHandler: function (form) {
                    form.submit();
                }
            }
        });
    }
}