// resources/views/components/Navbar/navbar.js
export class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navbarInner = this.navbar?.querySelector('div');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        if (!this.navbar) return;
        this.handleScroll();
        this.bindEvents();
        this.initSmoothScroll();
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            this.navbar.classList.remove("top-8", "rounded-full");
            this.navbar.classList.add("top-0", "border-t-0", "rounded-b-md", "bg-white/30", "backdrop-blur-md");
        } else {
            this.navbar.classList.remove("top-0", "border-t-0", "rounded-b-md", "bg-white/30", "backdrop-blur-md");
            this.navbar.classList.add("top-8", "rounded-full");
        }

        this.lastScrollY = currentScrollY;
    }

    initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            });
        });
    }

    bindEvents() {
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            this.handleScroll();
            isScrolling = setTimeout(() => this.handleScroll(), 66);
        });
    }
}
