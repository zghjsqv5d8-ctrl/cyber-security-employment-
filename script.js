/* =========================================================
   CYBERSHIELD SOLUTIONS
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("mainNav");
    const navMenu = document.getElementById("navMenu");

    const navLinks = document.querySelectorAll(
        "#mainNav .nav-link"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    /* =====================================================
       NAVBAR
       ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                const id = section.id;

                navLinks.forEach(link => {
                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + id
                    ) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });


                /* close mobile menu */

                if (
                    navMenu &&
                    navMenu.classList.contains("show")
                ) {

                    const collapse =
                        bootstrap.Collapse
                            .getInstance(navMenu);

                    if (collapse) {
                        collapse.hide();
                    }
                }

            });

        });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target
                            .classList
                            .add("active");

                        observer.unobserve(
                            entry.target
                        );
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* =====================================================
       CARD REVEAL
       ===================================================== */

    const cards = document.querySelectorAll(
        ".position-card, .skill-chip, .process-step"
    );


    if ("IntersectionObserver" in window) {

        const cardObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const card =
                            entry.target;

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                        observer.unobserve(card);

                    });

                },
                {
                    threshold: 0.1
                }
            );


        cards.forEach((card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(20px)";

            card.style.transition =
                `opacity .6s ease ${Math.min(index * 70, 280)}ms,
                 transform .6s ease ${Math.min(index * 70, 280)}ms`;

            cardObserver.observe(card);
        });

    } else {

        cards.forEach(card => {
            card.style.opacity = "1";
            card.style.transform = "none";
        });

    }


    /* =====================================================
       SOCIAL LINKS
       ===================================================== */

    document
        .querySelectorAll(".social-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function (event) {

                    if (
                        this.getAttribute("href") === "#"
                    ) {
                        event.preventDefault();
                    }

                }
            );

        });


    /* =====================================================
       APPLY / DETAILS PLACEHOLDER
       ===================================================== */

    document
        .querySelectorAll(
            '.position-card a[href="#"]'
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const card =
                        this.closest(".position-card");

                    if (!card) return;

                    const title =
                        card.querySelector(
                            ".position-card__title"
                        );

                    if (!title) return;

                    const position =
                        title.textContent.trim();

                    console.log(
                        "Selected position:",
                        position
                    );

                }
            );

        });

});
