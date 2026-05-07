/* ============================================================
   NATE BAUER — main.js
   Handles: nav scroll state, fade-in, mobile menu, active nav
============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------
       NAV: transparent over hero, solid over light sections
    ---------------------------------------------------------- */
    const nav = document.getElementById('nav');
    const hero = document.querySelector('.hero, .page-hero');

    function updateNav() {
        if (!nav) return;
        if (!hero) {
            nav.classList.add('scrolled');
            return;
        }
        const heroBottom = hero.getBoundingClientRect().bottom;
        nav.classList.toggle('scrolled', heroBottom <= 0);
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();


    /* ----------------------------------------------------------
       ACTIVE NAV LINK — highlight current page
    ---------------------------------------------------------- */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    /* ----------------------------------------------------------
       FADE-IN ON SCROLL via IntersectionObserver
    ---------------------------------------------------------- */
    const fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeEls.forEach(function (el) { io.observe(el); });
    }


    /* ----------------------------------------------------------
       MOBILE NAV HAMBURGER
    ---------------------------------------------------------- */
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const open = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ----------------------------------------------------------
       CONTACT FORM — simple mailto fallback
    ---------------------------------------------------------- */
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name    = (form.querySelector('#name')    || {}).value || '';
            const email   = (form.querySelector('#email')   || {}).value || '';
            const message = (form.querySelector('#message') || {}).value || '';
            const subject = encodeURIComponent('Hello from your website');
            const body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
            window.location.href = 'mailto:nathanbauer9@gmail.com?subject=' + subject + '&body=' + body;
        });
    }

}());
