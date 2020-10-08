const linkKeys = {
    "about-link": "#about",
    "developers-link": "#developers",
    "technology-link": "#technology",
    "products-link": "#products",
    "team-link": "#team",
    "contact-link": "#contact"
}

const sectionKeys = [
    "#main-section",
    "#about",
    "#developers",
    "#technology",
    "#products",
    "#team",
    "#contact",
    "#contact-info"
];

$(document).ready(function () {
    // setTimeout(() => {
    //     $("#video").css({display: "block"});
    // }, 3000);

    scrollTo("#main-section", 0);
    checkSectionIsVisible();

    $('nav a').click(function (event) {
        scrollTo(linkKeys[event.target.className], 62);
    });

    $("#contact-button").click(function () {
        const data = {
            name: $("#contact-name")[0].value,
            email: $("#contact-email")[0].value,
            company: $("#contact-company")[0].value
        };
        $(".success-message").hide();

        if (data.name && data.email && data.company) {
            validateEmail();
            validateCompany();
            validateName();
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(String(data.email).toLowerCase())) {
                return;
            }
            $.ajax({
                type: "POST",
                url: "/contact",
                data: data,
                success: function (res) {
                    console.log(res);
                    resetContactForm();
                    $(".success-message").show();
                },
                dataType: "json"
            });
        } else {
            validateEmail();
            validateCompany();
            validateName();
        }
    });

    $(window).scroll(function () {
        checkSectionIsVisible();
        const containerHeight = window.innerHeight;
        const scrollPosition = window.scrollY + 73;

        if (scrollPosition > containerHeight) {
            $("header").removeClass("black-header");
            $("header").addClass("white-header");
        } else {
            $("header").removeClass("white-header");
            $("header").addClass("black-header");
        }
    });
});

function scrollTo(selector, value) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(selector).offset().top - value
    }, 0);
}

function checkSectionIsVisible() {
    sectionKeys.forEach((selector) => {
        let top_of_element = $(selector).offset().top;
        let bottom_of_element = $(selector).offset().top + $(selector).outerHeight();
        let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        let top_of_screen = $(window).scrollTop();

        if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
            $(`${selector} .horizontal-divider`).removeClass("animate__backInDown");
            $(`${selector} .horizontal-divider`).addClass("animate__backInDown");

            $(`${selector} .vertical-divider.left-align`).removeClass("animate__backInLeft");
            $(`${selector} .vertical-divider.left-align`).addClass("animate__backInLeft");

            $(`${selector} .vertical-divider.right-align`).removeClass("animate__backOutRight");
            $(`${selector} .vertical-divider.right-align`).addClass("animate__backOutRight");
        }
    });
}


function validateEmail() {
    const emailInput = $("#contact-email")[0];
    const email = emailInput.value;
    const container = $(".email-error-message");

    if (!email) {
        container.html("Email is required");
        return;
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
        container.html("Email is invalid");
        return;
    }

    container.html("");
}

function validateName() {
    const nameInput = $("#contact-name")[0];
    const name = nameInput.value;
    const container = $(".name-error-message");

    if (!name) {
        container.html("Name is required");
        return;
    }

    container.html("");
}

function validateCompany() {
    const companyInput = $("#contact-company")[0];
    const company = companyInput.value;
    const container = $(".company-error-message");
    console.log(company);

    if (!company) {
        container.html("Company is required");
        return;
    }

    container.html("");
}

function resetContactForm() {
    $("#contact-email").val("");
    $("#contact-name").val("");
    $("#contact-company").val("");
}
