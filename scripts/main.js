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
    "#contact"
];

function isOnScreen(element) {
    let position = element.getBoundingClientRect();

    // checking whether fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        return true
    } else {
        return false;
    }
}

$(document).ready(function () {
    scrollTo("#main-section", 0);

    $('nav a').click(function (event) {
        scrollTo(linkKeys[event.target.className], 55);
    });

    $("#contact-button").click(function () {
        const data = {
            name: $("#contact-name")[0].value,
            email: $("#contact-email")[0].value,
            company: $("#contact-company")[0].value
        };

        console.log(data);

        if (data.name && data.email && data.company) {
            $.ajax({
                type: "POST",
                url: "/contact",
                data: data,
                success: function (res) {
                    console.log(res);
                },
                dataType: "json"
            });
        }
    });

    $(window).scroll(function () {
        const containerHeight = window.innerHeight;
        const scrollPosition = window.scrollY + 55;

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
