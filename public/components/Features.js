class Features {
  constructor() {
    this.init();
  }

  init() {
    this.setupAnimations();
    this.setupInteractions();
  }

  setupAnimations() {
    const options = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.feature-card, .tech-card').forEach(card => {
      observer.observe(card);
    });
  }

  setupInteractions() {
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.showFeatureDetails(card);
      });

      card.addEventListener('mouseleave', () => {
        this.hideFeatureDetails(card);
      });
    });
  }

  showFeatureDetails(card) {
    const details = card.querySelector('.feature-details');
    if (details) {
      details.style.opacity = '1';
      details.style.transform = 'translateY(0)';
    }
  }

  hideFeatureDetails(card) {
    const details = card.querySelector('.feature-details');
    if (details) {
      details.style.opacity = '0';
      details.style.transform = 'translateY(10px)';
    }
  }
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Features();
});