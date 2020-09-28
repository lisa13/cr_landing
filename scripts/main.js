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
});

function scrollTo(selector, value) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(selector).offset().top - value
    }, 0);
}