class MediaGallery {
  constructor() {
    this.currentVideo = null;
    this.videos = [];
    this.screenshots = [];
    this.conceptArt = [];
    this.initializeGallery();
  }

  async initializeGallery() {
    try {
      const [videosResponse, galleryResponse] = await Promise.all([
        fetch('/media/videos.json'),
        fetch('/media/gallery.json')
      ]);

      const videosData = await videosResponse.json();
      const galleryData = await galleryResponse.json();

      this.videos = [...videosData.trailers, ...videosData.gameplay];
      this.screenshots = galleryData.screenshots;
      this.conceptArt = galleryData.concept_art;

      this.renderGallery();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize gallery:', error);
    }
  }

  renderGallery() {
    this.renderVideos();
    this.renderScreenshots();
    this.renderConceptArt();
  }

  renderVideos() {
    const container = document.getElementById('video-gallery');
    if (!container) return;

    const html = this.videos.map(video => `
      <div class="video-item" data-video-id="${video.id}">
        <img src="${video.thumbnail}" alt="${video.title}" />
        <h3>${video.title}</h3>
        <button class="play-btn" data-url="${video.url}">Play</button>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  renderScreenshots() {
    const container = document.getElementById('screenshot-gallery');
    if (!container) return;

    const html = this.screenshots.map(screenshot => `
      <div class="screenshot-item">
        <img src="${screenshot.url}" alt="${screenshot.title}" />
        <div class="screenshot-info">
          <h3>${screenshot.title}</h3>
          <p>${screenshot.description}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  renderConceptArt() {
    const container = document.getElementById('concept-art-gallery');
    if (!container) return;

    const html = this.conceptArt.map(art => `
      <div class="concept-art-item">
        <img src="${art.url}" alt="${art.title}" />
        <div class="concept-info">
          <h3>${art.title}</h3>
          <p>${art.description}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  setupEventListeners() {
    document.querySelectorAll('.play-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const videoUrl = e.target.dataset.url;
        this.playVideo(videoUrl);
      });
    });
  }

  playVideo(url) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal">&times;</button>
        <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MediaGallery();
});