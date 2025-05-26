const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.opacity = 1;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 0, 100, ${this.opacity})`;
    ctx.moveTo(this.x, this.y);

    // Curvas para desenhar um coração
    ctx.bezierCurveTo(
      this.x, this.y - this.size,
      this.x - this.size, this.y - this.size,
      this.x - this.size, this.y
    );
    ctx.bezierCurveTo(
      this.x - this.size, this.y + this.size,
      this.x, this.y + this.size * 1.5,
      this.x, this.y + this.size * 2
    );
    ctx.bezierCurveTo(
      this.x, this.y + this.size * 1.5,
      this.x + this.size, this.y + this.size,
      this.x + this.size, this.y
    );
    ctx.bezierCurveTo(
      this.x + this.size, this.y - this.size,
      this.x, this.y - this.size,
      this.x, this.y
    );
    ctx.fill();
  };

  this.update = function () {
    this.y += this.speed;
    this.opacity -= 0.005;
  };
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

  // Cria um gradiente linear com cores pastéis
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  // Cores pastéis
  gradient.addColorStop(0, '#FFB6C1');  // Rosa claro
  gradient.addColorStop(0.5, '#ADD8E6');  // Azul bebê
  gradient.addColorStop(1, '#D8BFD8');  // Lavanda (roxo claro)
  gradient.addColorStop(0, '#FFDAB9'); //Pêssego pastel

  // Aplica o gradiente como cor de fundo
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.opacity <= 0) hearts.splice(index, 1);
  });

  requestAnimationFrame(animateHearts);
}

canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 10; i++) {
    hearts.push(new Heart(
      e.clientX,
      e.clientY,
      Math.random() * 10 + 10,
      Math.random() * 2 + 1
    ));
  }
});

animateHearts();

// ========== RELÓGIO PROGRESSIVO ==========
function updateClock() {
  const startDate = new Date("2025-01-21T00:00:00"); // Data de início
  const now = new Date();
  const diffMs = now - startDate;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffMs / 1000) % 60);

  document.getElementById('clock').textContent =
    `${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
}

setInterval(updateClock, 1000);
updateClock();

// === MENSAGENS EM LOOP ===
const MENSAGENS = [
  "Você vai ser minha alma para sempre.",
  "Cada segundo ao seu lado é meu presente dos ceús.",
  "Nosso amor aumenta a cada momento..",
  "Desde o começo de 2025, minha vida mudou.",
  "Amar você é minha melhor escolha.",
  "Eu te amo mais do que ontem e vou amar muito mais amanhã.",
  "Eu amo te amar, e essa é a melhor sensação do mundo.",
  "Eu te amo minha florzinha de lírio.",
  "Eu te amo. Com a alma, com o coração e com o corpo."
];

// Array de cores para as mensagens
const COLORS = [
  '#FFB6C1', // Rosa claro
  '#ADD8E6', // Azul bebê
  '#D8BFD8', // Lavanda (roxo claro)
  '#98FB98', // Verde claro
  
  '#FFD700', // Ouro
  '#FF6347'  // Tomate
];

// Função para pegar uma mensagem aleatória
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * MENSAGENS.length);
  return MENSAGENS[randomIndex];
}

// Função para pegar uma cor aleatória
function getRandomColor() {
  const randomColorIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomColorIndex];
}

// Função para gerar posições aleatórias para as mensagens
function getRandomPosition() {
  const margin = 20; // margem para não ficar tão colado nas bordas

  // Cria uma nova div temporária para calcular o tamanho da mensagem
  const messageEl = document.createElement('div');
  messageEl.style.position = 'absolute';
  messageEl.style.visibility = 'hidden';
  messageEl.textContent = getRandomMessage();
  document.body.appendChild(messageEl);

  // Calcula o tamanho da mensagem (largura e altura)
  const messageWidth = messageEl.offsetWidth;
  const messageHeight = messageEl.offsetHeight;

  // Remove a div temporária
  document.body.removeChild(messageEl);

  // Garante que a posição seja válida e a mensagem não saia da tela
  const randomX = Math.floor(Math.random() * (window.innerWidth - messageWidth - 2 * margin)) + margin;
  const randomY = Math.floor(Math.random() * (window.innerHeight - messageHeight - 2 * margin)) + margin;

  return { x: randomX, y: randomY };
}

function showNextMessage() {
  const messageEl = document.getElementById('message');
  messageEl.style.opacity = 0;

  setTimeout(() => {
    // Pega a mensagem aleatória
    messageEl.textContent = getRandomMessage();

    // Pega a posição aleatória
    const { x, y } = getRandomPosition();

    // Posiciona a mensagem em uma posição aleatória
    messageEl.style.position = 'absolute';
    messageEl.style.left = `${x}px`;
    messageEl.style.top = `${y}px`;

    // Aplica uma cor aleatória à mensagem.
    messageEl.style.color = getRandomColor();

    messageEl.style.animation = 'none';
    void messageEl.offsetWidth; // Força reflow para reiniciar a animação
    messageEl.style.animation = null;

    messageEl.style.opacity = 1;
  }, 500);
}

showNextMessage();
setInterval(showNextMessage, 5000);
