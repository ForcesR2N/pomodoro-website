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
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            this.navbarInner.classList.remove('bg-white/100');
            this.navbarInner.classList.add('bg-white/30', 'backdrop-blur-md');
        } else {
            this.navbarInner.classList.add('bg-white/100');
            this.navbarInner.classList.remove('bg-white/30', 'backdrop-blur-md');
        }

        this.lastScrollY = currentScrollY;
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
