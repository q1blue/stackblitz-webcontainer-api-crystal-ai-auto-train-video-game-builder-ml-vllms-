class AlchemyGame {
  constructor() {
    this.level = 1;
    this.score = 0;
    this.cauldronContents = [];
    this.discoveries = new Set();
    
    this.elements = {
      fire: { name: 'Fire', color: '#ff4444' },
      water: { name: 'Water', color: '#4444ff' },
      earth: { name: 'Earth', color: '#44ff44' },
      air: { name: 'Air', color: '#ffffff' }
    };
    
    this.recipes = {
      'fire+water': { name: 'Steam', color: '#aaaaaa' },
      'earth+water': { name: 'Clay', color: '#8b4513' },
      'fire+earth': { name: 'Lava', color: '#ff8c00' },
      'air+water': { name: 'Mist', color: '#e6e6fa' },
      'fire+air': { name: 'Lightning', color: '#ffff00' },
      'earth+air': { name: 'Dust', color: '#d2b48c' }
    };
    
    this.initializeGame();
  }

  initializeGame() {
    this.renderBasicElements();
    this.setupEventListeners();
    this.updateStats();
  }

  renderBasicElements() {
    const container = document.getElementById('basic-elements');
    Object.entries(this.elements).forEach(([key, element]) => {
      const div = document.createElement('div');
      div.className = 'element';
      div.style.backgroundColor = element.color;
      div.textContent = element.name;
      div.dataset.element = key;
      container.appendChild(div);
    });
  }

  setupEventListeners() {
    document.getElementById('basic-elements').addEventListener('click', (e) => {
      if (e.target.classList.contains('element')) {
        this.addToCauldron(e.target.dataset.element);
      }
    });

    document.getElementById('brew').addEventListener('click', () => this.brew());
  }

  addToCauldron(element) {
    if (this.cauldronContents.length < 2) {
      this.cauldronContents.push(element);
      this.updateCauldronVisual();
    }
  }

  updateCauldronVisual() {
    const content = document.getElementById('cauldron-content');
    content.style.height = `${(this.cauldronContents.length * 50)}%`;
    
    if (this.cauldronContents.length > 0) {
      const colors = this.cauldronContents.map(element => this.elements[element].color);
      content.style.background = colors.length > 1 
        ? `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
        : colors[0];
    }
  }

  brew() {
    if (this.cauldronContents.length !== 2) return;
    
    const recipe = this.cauldronContents.sort().join('+');
    const result = this.recipes[recipe];
    
    if (result && !this.discoveries.has(recipe)) {
      this.discoveries.add(recipe);
      this.score += 100;
      this.addDiscovery(result);
      this.checkLevelUp();
    }
    
    this.cauldronContents = [];
    this.updateCauldronVisual();
    this.updateStats();
  }

  addDiscovery(result) {
    const container = document.getElementById('discovered-items');
    const div = document.createElement('div');
    div.className = 'discovered';
    div.style.backgroundColor = result.color;
    div.textContent = result.name;
    container.appendChild(div);
  }

  checkLevelUp() {
    const newLevel = Math.floor(this.discoveries.size / 2) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
      this.updateStats();
    }
  }

  updateStats() {
    document.getElementById('level').textContent = this.level;
    document.getElementById('score').textContent = this.score;
  }
}

// Start the game when the page loads
window.addEventListener('load', () => {
  new AlchemyGame();
});