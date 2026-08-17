const backToTop = document.querySelector("#backToTop");
const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");
const menuWraper = document.querySelector(".menu-wraper");
const menuIcon = document.querySelector("#menu-icon");
const scrollProgress = document.querySelector(".scroll-progress");
const submitBtn = document.querySelector("#sendBtn");
const contactForm = document.querySelector("#contactForm");
const preloader = document.querySelector("#preloader");
// Email Validation 
const emailError = document.querySelector("#emailError");
// Form Error
const formError = document.querySelector("#formError");

// Preloader
window.addEventListener("load", function() {
    setTimeout(function () {
        preloader.classList.add("hide");
    }, 300)
});

// Contact Form

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous messages
    formError.textContent = "";
    emailError.textContent = "";

    formError.classList.remove("error", "success");

    // Empty fields
    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        subject === "" ||
        message === ""
    ) {
        formError.textContent = "Please Fill Out All Fields.";
        formError.classList.add("error");
        return;
    }

    // Email validation
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please Enter a Valid Email.";
        return;
    }

    // Sending
    formError.textContent = "Sending...";
    
    try {
        const formData = new FormData(contactForm);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            formError.textContent = "Message Sent Successfully! ✅";

            formError.classList.remove("error");
            formError.classList.add("success");

            contactForm.reset();
        } else {
            formError.textContent =
                "Something went wrong. Please try again.";

            formError.classList.remove("success");
            formError.classList.add("error");
        }

    } catch (error) {
        formError.textContent =
            "Unable to send message. Please try again.";

        formError.classList.remove("success");
        formError.classList.add("error");
    }
});

// const sectionHeaders = document.querySelectorAll(".sectionHeader")
// const cards = document.querySelectorAll(".skill-category, .education-card, .project-card")


const observe = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

// Section Animation
sections.forEach(function (section) {
    section.classList.add("reveal");
    observe.observe(section);
});


// Cards Animation
const cardGroups = [
    document.querySelectorAll(".skill-category"),
    document.querySelectorAll(".education-card"),
    document.querySelectorAll(".project-card")
];

cardGroups.forEach(function (group) {

    group.forEach(function (card, index) {
        card.classList.add("reveal");
        card.style.transitionDelay = `${index * 0.15}s`;
        observe.observe(card);
    });

});


// // Section Header Animation
// const observeSecHeader = new IntersectionObserver(function (entries) {
//     entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("show");
//         }
//     });
// });

// sectionHeaders.forEach(function (sectionHeader) {
//     sectionHeader.classList.add("reveal");
//     observeSecHeader.observe(sectionHeader);
// });

menuWraper.addEventListener("click", function () {
    navbar.classList.toggle("active");

    if (menuIcon.classList.contains("fa-bars")) {
        menuIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    }
    menuIcon.classList.toggle("active")
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
        menuIcon.classList.remove("active");
    })
});

document.addEventListener("click", function (e) {
    if (navbar.contains(e.target) || menuWraper.contains(e.target)) {

    } else {
        navbar.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }
})

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", function () {

    if (window.scrollY > 100) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

    let scrollTop = window.scrollY;
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;

    let scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    scrollProgress.style.width = scrollPercent + "%";

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

    sections.forEach(function (section) {
        let id = section.getAttribute("id");
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(function (link) {
                link.classList.remove("active");
            });
            document.querySelector('.navbar a[href*="' + id + '"]')
                .classList.add("active");
        }

    });


});