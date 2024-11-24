class Navigation {
  constructor() {
    this.nav = document.querySelector('.main-nav');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    this.handleScroll();
    this.setupEventListeners();
  }

  handleScroll() {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        this.nav.classList.remove('scroll-up');
        return;
      }
      
      if (currentScroll > this.lastScroll && !this.nav.classList.contains('scroll-down')) {
        this.nav.classList.remove('scroll-up');
        this.nav.classList.add('scroll-down');
      } else if (currentScroll < this.lastScroll && this.nav.classList.contains('scroll-down')) {
        this.nav.classList.remove('scroll-down');
        this.nav.classList.add('scroll-up');
      }
      
      this.lastScroll = currentScroll;
    });
  }

  setupEventListeners() {
    document.querySelector('.play-now-btn').addEventListener('click', () => {
      window.location.href = '/play';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});