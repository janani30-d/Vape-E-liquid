

/* ==========================================
   VAPOR - INDEPENDENT MENU TOGGLE
========================================== */

(function () {

    function initializeVaporMenu() {

        const menuButton = document.getElementById("vaporMenuToggle");
        const navigation = document.getElementById("vaporNavigation");

        if (!menuButton || !navigation) {
            console.warn("VAPOR menu elements not found.");
            return;
        }

        menuButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen = navigation.classList.toggle("active");

            menuButton.classList.toggle("active", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        document.addEventListener("click", function (event) {

            if (
                window.innerWidth <= 1199 &&
                !navigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navigation.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");

            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navigation.classList.remove("active");
                menuButton.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");

            }

        });

    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeVaporMenu
        );
    } else {
        initializeVaporMenu();
    }

})();



    




/***********HOME-1*********/


/* =====================================================
   VAPOR HOME 1 - HERO SLIDER
   PART 4 - JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector("#vaporHero");

    if (!hero) return;

    const slides = hero.querySelectorAll(".vapor-hero-slide");
    const dots = hero.querySelectorAll(".vapor-hero-dot");

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let slideInterval = null;

    const slideDuration = 5000;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =================================================
       SHOW SLIDE
    ================================================= */

    function showSlide(index) {

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });

        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

            dot.setAttribute(
                "aria-current",
                i === currentSlide ? "true" : "false"
            );

        });

    }


    /* =================================================
       NEXT SLIDE
    ================================================= */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* =================================================
       START AUTOPLAY
    ================================================= */

    function startSlider() {

        if (reducedMotion || slideInterval) return;

        slideInterval = setInterval(function () {

            nextSlide();

        }, slideDuration);

    }


    /* =================================================
       STOP AUTOPLAY
    ================================================= */

    function stopSlider() {

        if (slideInterval) {

            clearInterval(slideInterval);
            slideInterval = null;

        }

    }


    /* =================================================
       DOT CLICK EVENTS
    ================================================= */

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);

            stopSlider();
            startSlider();

        });

    });


    /* =================================================
       PAUSE ON HOVER
    ================================================= */

    hero.addEventListener("mouseenter", function () {

        stopSlider();

    });


    /* =================================================
       RESUME ON MOUSE LEAVE
    ================================================= */

    hero.addEventListener("mouseleave", function () {

        startSlider();

    });


    /* =================================================
       PAUSE WHEN TAB IS HIDDEN
    ================================================= */

    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {

            stopSlider();

        } else {

            startSlider();

        }

    });


    /* =================================================
       INITIALIZE SLIDER
    ================================================= */

    showSlide(0);
    startSlider();

});









/* =====================================================
   VAPOR FAQ - OPEN & CLOSE ACCORDION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(
        ".vapor-faq-item"
    );

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".vapor-faq-question"
        );

        const icon = item.querySelector(
            ".vapor-faq-toggle i"
        );

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(function (faq) {

                faq.classList.remove("active");

                const faqQuestion = faq.querySelector(
                    ".vapor-faq-question"
                );

                const faqIcon = faq.querySelector(
                    ".vapor-faq-toggle i"
                );

                faqQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

                faqIcon.classList.remove("fa-minus");
                faqIcon.classList.add("fa-plus");

            });

            // Open the clicked item if it was closed
            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");

            }

        });

    });

});










/* ==========================================
   VAPOR HOME 2 - EXPANDING REVIEWS
   PART 4: JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const reviewSection = document.getElementById("vaporHome2Reviews");

    if (!reviewSection) return;

    const reviewCards = reviewSection.querySelectorAll(
        ".vapor-home2-review-card"
    );

    if (!reviewCards.length) return;


    /* ======================================
       INITIALIZE REVIEW CARDS
    ====================================== */

    function activateReview(selectedCard) {

        reviewCards.forEach(function (card) {

            const isActive = card === selectedCard;

            card.classList.toggle("active", isActive);

            const trigger = card.querySelector(
                ".vapor-home2-review-trigger"
            );

            if (trigger) {
                trigger.setAttribute(
                    "aria-expanded",
                    isActive ? "true" : "false"
                );
            }

        });

    }


    /* ======================================
       CLICK EVENT
    ====================================== */

    reviewCards.forEach(function (card) {

        const trigger = card.querySelector(
            ".vapor-home2-review-trigger"
        );

        if (!trigger) return;

        trigger.addEventListener("click", function () {

            activateReview(card);

        });

    });


    /* ======================================
       DEFAULT SELECTED CARD
    ====================================== */

    const initialCard =
        reviewSection.querySelector(".vapor-home2-review-card.active") ||
        reviewCards[0];

    activateReview(initialCard);

});












/* ==========================================
   VAPOR HOME 2 - FAQ ACCORDION
   PART 4 - JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const faqSection = document.getElementById("vaporHome2Faq");

    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll(
        ".vapor-home2-faq-item"
    );

    if (!faqItems.length) return;


    /* ==========================================
       CLOSE ALL FAQ ITEMS
    ========================================== */

    function closeAllFaq() {

        faqItems.forEach(function (item) {

            item.classList.remove("active");

            const question = item.querySelector(
                ".vapor-home2-faq-question"
            );

            if (question) {
                question.setAttribute("aria-expanded", "false");
            }

        });

    }


    /* ==========================================
       OPEN SELECTED FAQ ITEM
    ========================================== */

    function openFaq(selectedItem) {

        closeAllFaq();

        selectedItem.classList.add("active");

        const question = selectedItem.querySelector(
            ".vapor-home2-faq-question"
        );

        if (question) {
            question.setAttribute("aria-expanded", "true");
        }

    }


    /* ==========================================
       FAQ CLICK EVENT
    ========================================== */

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".vapor-home2-faq-question"
        );

        if (!question) return;

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");

            if (isActive) {

                closeAllFaq();

            } else {

                openFaq(item);

            }

        });

    });


    /* ==========================================
       INITIAL FAQ STATE
    ========================================== */

    const initialFaq =
        faqSection.querySelector(".vapor-home2-faq-item.active");

    if (initialFaq) {

        openFaq(initialFaq);

    } else {

        openFaq(faqItems[0]);

    }

});















/* ==========================================
   VAPOR RESPONSIVE HOME DROPDOWN
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const dropdowns = document.querySelectorAll(
        ".vapor-home-dropdown"
    );

    dropdowns.forEach(function (dropdown) {

        const trigger = dropdown.querySelector(
            ".vapor-home-trigger"
        );

        if (!trigger) return;

        trigger.addEventListener("click", function (event) {

            if (window.innerWidth <= 1199) {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    dropdown.classList.contains("active");

                // Close other dropdowns
                dropdowns.forEach(function (item) {

                    item.classList.remove("active");

                    const itemTrigger = item.querySelector(
                        ".vapor-home-trigger"
                    );

                    if (itemTrigger) {
                        itemTrigger.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });

                // Toggle selected dropdown
                if (!isOpen) {

                    dropdown.classList.add("active");

                    trigger.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }

        });

    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {

        if (window.innerWidth > 1199) return;

        dropdowns.forEach(function (dropdown) {

            if (!dropdown.contains(event.target)) {

                dropdown.classList.remove("active");

                const trigger = dropdown.querySelector(
                    ".vapor-home-trigger"
                );

                if (trigger) {
                    trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            }

        });

    });

    // Reset dropdown when switching to desktop
    window.addEventListener("resize", function () {

        if (window.innerWidth > 1199) {

            dropdowns.forEach(function (dropdown) {

                dropdown.classList.remove("active");

                const trigger = dropdown.querySelector(
                    ".vapor-home-trigger"
                );

                if (trigger) {
                    trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });

        }

    });

});





   /* ==========================================
   VAPOR HOME 2 - EXPANDING REVIEWS
   PART 4: JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const reviewSection = document.getElementById("vaporHome2Reviews");

    if (!reviewSection) return;

    const reviewCards = reviewSection.querySelectorAll(
        ".vapor-home2-review-card"
    );

    if (!reviewCards.length) return;


    /* ======================================
       INITIALIZE REVIEW CARDS
    ====================================== */

    function activateReview(selectedCard) {

        reviewCards.forEach(function (card) {

            const isActive = card === selectedCard;

            card.classList.toggle("active", isActive);

            const trigger = card.querySelector(
                ".vapor-home2-review-trigger"
            );

            if (trigger) {
                trigger.setAttribute(
                    "aria-expanded",
                    isActive ? "true" : "false"
                );
            }

        });

    }


    /* ======================================
       CLICK EVENT
    ====================================== */

    reviewCards.forEach(function (card) {

        const trigger = card.querySelector(
            ".vapor-home2-review-trigger"
        );

        if (!trigger) return;

        trigger.addEventListener("click", function () {

            activateReview(card);

        });

    });


    /* ======================================
       DEFAULT SELECTED CARD
    ====================================== */

    const initialCard =
        reviewSection.querySelector(".vapor-home2-review-card.active") ||
        reviewCards[0];

    activateReview(initialCard);

});















/* ==========================================
   VAPOR HOME 2 - EXPANDING REVIEWS
   PART 4: JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const reviewSection = document.getElementById("vaporHome2Reviews");

    if (!reviewSection) return;

    const reviewCards = reviewSection.querySelectorAll(
        ".vapor-home2-review-card"
    );

    if (!reviewCards.length) return;


    /* ======================================
       INITIALIZE REVIEW CARDS
    ====================================== */

    function activateReview(selectedCard) {

        reviewCards.forEach(function (card) {

            const isActive = card === selectedCard;

            card.classList.toggle("active", isActive);

            const trigger = card.querySelector(
                ".vapor-home2-review-trigger"
            );

            if (trigger) {
                trigger.setAttribute(
                    "aria-expanded",
                    isActive ? "true" : "false"
                );
            }

        });

    }


    /* ======================================
       CLICK EVENT
    ====================================== */

    reviewCards.forEach(function (card) {

        const trigger = card.querySelector(
            ".vapor-home2-review-trigger"
        );

        if (!trigger) return;

        trigger.addEventListener("click", function () {

            activateReview(card);

        });

    });


    /* ======================================
       DEFAULT SELECTED CARD
    ====================================== */

    const initialCard =
        reviewSection.querySelector(".vapor-home2-review-card.active") ||
        reviewCards[0];

    activateReview(initialCard);

});

















/* =========================================
   SCROLL TO TOP FUNCTION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("vaporScrollTop");

    if (!scrollTopBtn) return;

    // Show button after scrolling
    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    // Scroll smoothly to top
    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
