// =========================
// SNAKE CYBERPUNK V2.0
// PARTE 1
// =========================

let gameState = "menu";"skins";"bootFinished"
let bootProgress = 0;
let bootFinished = false;
let snake;
let food;
let shield = null;
let shieldActive = false;
let unlockedSkins = ["neonBlue"];
let shakeIntensity = 0;
let shakeDuration = 0;
let menuSnake = [];
let menuSnakeLength = 12;
let menuSnakeX = 0;
let menuSnakeY = 520;
let menuSnakeSpeed = 10;
let score = 0;
let highScore = 0;
let level = 1;
let coins = 0;
let menuParticles = [];
let maxMenuParticles = 45;
let obstacles = [];
let currentSkin = "neonBlue";
let particles = [];
let skinPage = 0;
let gameOverState = false;
let floatingTexts = [];
// Fruta rara
let rareFood = false;
let legendaryFood = false;
let sfxEat;
let sfxRare;
let sfxLegendary;
let sfxShield;
let sfxGameOver;
let bgMusic;
let skinCards = [

  {
    id: "neonBlue",
    name: "NEON BLUE",
    price: 0
  },

  {
    id: "goldKing",
    name: "GOLD KING",
    price: 100
  },

  {
    id: "toxicGreen",
    name: "TOXIC GREEN",
    price: 200
  },

  {
    id: "infernoRed",
    name: "INFERNO RED",
    price: 300
  },

  {
    id: "purpleVoid",
    name: "PURPLE VOID",
    price: 400
  },

  {
    id: "rgbSpectrum",
    name: "RGB SPECTRUM",
    price: 500
  },

  {
    id: "cyberPulse",
    name: "CYBER PULSE",
    price: 600
  },

  {
    id: "galaxyStar",
    name: "GALAXY STAR",
    price: 700
  },

  {
    id: "matrixCode",
    name: "MATRIX CODE",
    price: 800
  },

  {
    id: "shadowNinja",
    name: "SHADOW NINJA",
    price: 900
  }

];
const MAX_OBSTACLES = 8;
const scaleSize = 20;
const skins = {

  neonBlue: "#00e5ff",

  goldKing: "#ffd700",

  toxicGreen: "#39ff14",

  infernoRed: "#ff3131",

  purpleVoid: "#a020f0",

  rgbSpectrum: "RGB",

  cyberPulse: "#00ffee",

  galaxyStar: "#ffffff",

  matrixCode: "#ff674d",

  shadowNinja: "#000000"

};
const skinNames = {

  neonBlue: "⚡ Neon Blue",

  goldKing: "👑 Gold King",

  toxicGreen: "☣ Toxic Green",

  infernoRed: "🔥 Inferno Red",

  purpleVoid: "🌌 Purple Void",

  rgbSpectrum: "🌈 RGB Spectrum",

  cyberPulse: "💠 Cyber Pulse",

  galaxyStar: "⭐ Galaxy Star",

  matrixCode: "</> Matrix Code",

  shadowNinja: "🥷 Shadow Ninja"

};
const skinPrices = {

  goldKing:100,

  toxicGreen:150,

  infernoRed:200,

  purpleVoid:250,

  rgbSpectrum:350,

  cyberPulse:400,

  galaxyStar:450,

  matrixCode:500,

  shadowNinja:600

};
const HUD_HEIGHT = 80;
function drawMenuTitle() {

  // Movimento suave do brilho
  let pulse = sin(frameCount * 0.05);

  // Converte de -1/+1 para uma faixa mais útil
  let glow = map(
    pulse,
    -1,
    1,
    15,
    35
  );


  // ==================================================
  // TÍTULO PRINCIPAL
  // ==================================================

  textAlign(CENTER, CENTER);

  drawingContext.shadowBlur = glow;

  drawingContext.shadowColor =
    "#00ffff";

  fill("#00ffff");

  textSize(62);

  text(
    "SNAKE",
    width / 2,
    120
  );


  // ==================================================
  // SUBTÍTULO
  // ==================================================

  let purplePulse =
    map(
      sin(frameCount * 0.04),
      -1,
      1,
      10,
      25
    );

  drawingContext.shadowBlur =
    purplePulse;

  drawingContext.shadowColor =
    "#ff00ff";

  fill("#ff00ff");

  textSize(28);

  text(
    "CYBERPUNK",
    width / 2,
    170
  );


  // ==================================================
  // TEXTO PEQUENO
  // ==================================================

  drawingContext.shadowBlur = 0;

  fill(180);

  textSize(14);

  text(
    "DIGITAL INFILTRATION SYSTEM",
    width / 2,
    200
  );
drawingContext.shadowBlur = 0;
drawingContext.shadowColor = "transparent";
}

function createMenuParticle() {

  let particle = {

    x: random(width),

    y: random(height),

    size: random(1, 3),

    speed: random(0.2, 0.8),

    drift: random(-0.3, 0.3),

    hue: random(360),

    alpha: random(80, 180)

  };

  menuParticles.push(particle);

}
function createMenuSnake() {

  menuSnake = [];

  for (let i = 0; i < menuSnakeLength; i++) {

    menuSnake.push({
      x: menuSnakeX - i * scaleSize,
      y: menuSnakeY
    });

  }

}
function updateMenuSnake() {

  menuSnakeX += menuSnakeSpeed;

  const snakeWidth =
    menuSnakeLength * scaleSize;

  // Quando sair da tela,
  // volta para o começo

  if (menuSnakeX > width + snakeWidth) {

    menuSnakeX = -snakeWidth;

  }

  // Move cada segmento seguindo o anterior

  for (let i = menuSnake.length - 1; i > 0; i--) {

    menuSnake[i].x = menuSnake[i - 1].x;
    menuSnake[i].y = menuSnake[i - 1].y;

  }

  menuSnake[0].x = menuSnakeX;
  menuSnake[0].y = menuSnakeY;

}
function drawMenuSnake() {

  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < menuSnake.length; i++) {

    let part = menuSnake[i];

    // Cabeça
    if (i === 0) {

      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = "#FFFFFF";

      fill(255);

      rect(
        part.x,
        part.y,
        scaleSize,
        scaleSize,
        6
      );

      fill(0);

      ellipse(part.x + 14, part.y + 6, 4);
      ellipse(part.x + 14, part.y + 14, 4);

    }

    // Corpo RGB
    else {

      let hue =
        (frameCount * 2 + i * 15) % 360;

      let rgbColor =
        color(hue, 100, 100);

      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = rgbColor;

      fill(rgbColor);

      rect(
        part.x,
        part.y,
        scaleSize,
        scaleSize,
        6
      );

    }

  }

  colorMode(RGB, 255);
  drawingContext.shadowBlur = 0;

}
function startShake(intensity, duration) {

  shakeIntensity = intensity;
  shakeDuration = duration;

}

function updateShake() {

  if (shakeDuration <= 0) return;

  translate(
    random(-shakeIntensity, shakeIntensity),
    random(-shakeIntensity, shakeIntensity)
  );

  shakeDuration--;

  shakeIntensity *= 0.92;

}
function drawGameOver() {

background(10, 0, 25);

push();
updateShake();

  // Grid
  drawGrid();

  textAlign(CENTER, CENTER);

  // Título
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = "#FF3131";

  fill("#FF3131");
  textSize(54);

  text("GAME OVER", width / 2, 140);

  // Pontuação
  drawingContext.shadowBlur = 0;

  fill(180);
  textSize(18);
  text("PONTUAÇÃO FINAL", width / 2, 225);

  fill("#FFFFFF");
  textSize(42);
  text(score, width / 2, 270);

  // Recorde
  fill("#00E5FF");
  textSize(20);
  text("🏆 RECORDE: " + highScore, width / 2, 325);

  // Bits ganhos
  fill("#FFD700");
  textSize(20);
  text("🪙 BITS: " + coins.toLocaleString("pt-BR"), width / 2, 360);

  // Botão visual
  let hover =
    mouseX >= width/2 - 120 &&
    mouseX <= width/2 + 120 &&
    mouseY >= 430 &&
    mouseY <= 485;

  drawingContext.shadowBlur = hover ? 25 : 15;
  drawingContext.shadowColor = "#00E5FF";

  fill(hover ? color(0,229,255,60) : color(10,20,35));

  stroke("#00E5FF");
  strokeWeight(2);

  rect(width/2 - 120, 430, 240, 55, 10);

  noStroke();

  fill("#FFFFFF");
  textSize(22);
  text("↻ JOGAR NOVAMENTE", width/2, 458);

  // Rodapé
  fill(140);
  textSize(14);
  text("Pressione R para reiniciar", width/2, 540);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";

}
function createParticles(x, y, amount, particleColor) {

  for (let i = 0; i < amount; i++) {

    particles.push({

      x: x,
      y: y,

      vx: random(-3, 3),
      vy: random(-3, 3),

      size: random(3, 7),

      alpha: 255,

      color: particleColor

    });

  }

}
function createFloatingText(x, y, value, textColor) {

  floatingTexts.push({

    x: x,
    y: y,

    value: value,
    color: textColor,

    alpha: 255,
    life: 45

  });

}
function updateFloatingTexts() {

  textAlign(CENTER, CENTER);
  textSize(18);

  for (let i = floatingTexts.length - 1; i >= 0; i--) {

    let t = floatingTexts[i];

    t.y -= 1.2;
    t.alpha -= 6;
    t.life--;

    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = t.color;

    fill(
      red(t.color),
      green(t.color),
      blue(t.color),
      t.alpha
    );

    text(t.value, t.x, t.y);

    if (t.life <= 0) {
      floatingTexts.splice(i, 1);
    }

  }

  drawingContext.shadowBlur = 0;
  textAlign(LEFT, BASELINE);

}
function updateParticles() {

  for (let i = particles.length - 1; i >= 0; i--) {

    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    p.vx *= 0.96;
    p.vy *= 0.96;

    p.alpha -= 8;
    p.size *= 0.97;

    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = p.color;

    noStroke();

    fill(red(p.color), green(p.color), blue(p.color), p.alpha);

    ellipse(p.x, p.y, p.size);

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }

  }

  drawingContext.shadowBlur = 0;

}
function buySkin(skin) {

  // Já desbloqueada
  if (unlockedSkins.includes(skin.id)) {
    return;
  }

  // Saldo insuficiente
  if (coins < skin.price) {
    return;
  }

  // Compra
  coins -= skin.price;
  unlockedSkins.push(skin.id);

  // Equipa automaticamente após comprar
  currentSkin = skin.id;

  saveGame();
}

function equipSkin(skin) {

  if (!unlockedSkins.includes(skin.id)) return;

  currentSkin = skin.id;

  saveGame();
}
function saveGame() {

  localStorage.setItem(
    "snakeHighScore",
    highScore
  );

  localStorage.setItem(
    "snakeCoins",
    coins
  );

  localStorage.setItem(
    "snakeSkin",
    currentSkin
  );

  localStorage.setItem(
    "snakeUnlockedSkins",
    JSON.stringify(unlockedSkins)
  );

}
function loadGame() {

  let savedHighScore =
    localStorage.getItem("snakeHighScore");

  let savedCoins =
    localStorage.getItem("snakeCoins");

  let savedSkin =
    localStorage.getItem("snakeSkin");

  let savedUnlockedSkins =
    localStorage.getItem("snakeUnlockedSkins");

  if (savedHighScore !== null) {
    highScore = Number(savedHighScore);
  }

  if (savedCoins !== null) {
    coins = Number(savedCoins);
  }

  if (savedSkin !== null) {
    currentSkin = savedSkin;
  }

  if (savedUnlockedSkins !== null) {
  try {
    unlockedSkins = JSON.parse(savedUnlockedSkins);
  } catch {
    unlockedSkins = ["neonBlue"];
  }
}

}
function buySkin(skin) {

  // Já desbloqueada
  if (unlockedSkins.includes(skin.id)) {
    return;
  }

  // Sem saldo
  if (coins < skin.price) {
    return;
  }

  // Compra
  coins -= skin.price;

  unlockedSkins.push(skin.id);

  // Equipa automaticamente
  currentSkin = skin.id;

  saveGame();
}
function updateMenuParticles() {

  for (let particle of menuParticles) {

    particle.y -= particle.speed;
    particle.x += particle.drift;

    // Saiu pelo topo
    if (particle.y < -10) {

      particle.y = height + 10;
      particle.x = random(width);

    }

    // Saiu pela lateral
    if (
      particle.x < -10 ||
      particle.x > width + 10
    ) {

      particle.x = random(width);
      particle.y = height + 10;   // <- melhoria
    }

  }

}
function drawMenuParticles() {

  colorMode(
    HSB,
    360,
    100,
    100,
    255
  );

  noStroke();

  for (
    let particle of menuParticles
  ) {

    let particleColor = color(
      particle.hue,
      100,
      100,
      particle.alpha
    );

    drawingContext.shadowBlur = 12;

    drawingContext.shadowColor =
      particleColor;

    fill(particleColor);

    ellipse(
      particle.x,
      particle.y,
      particle.size
    );

  }

colorMode(RGB, 255);

drawingContext.shadowBlur = 0;
drawingContext.shadowColor = "transparent";
}
function preload() {

  soundFormats("mp3");

  sfxEat = loadSound("assets/eat.mp3");
  sfxRare = loadSound("assets/rare.mp3");
  sfxLegendary = loadSound("assets/legendary.mp3");
  sfxShield = loadSound("assets/shield.mp3");
  sfxGameOver = loadSound("assets/gameover.mp3");

  bgMusic = loadSound("assets/cyberpunk_loop.mp3");

}
function setup() {

  createCanvas(800, 680);

  frameRate(10);

  loadGame();

  snake = new Snake();

  createMenuSnake();

  for (let i = 0; i < maxMenuParticles; i++) {
    createMenuParticle();
  }

  createFood();
  createObstacle();
bgMusic.setLoop(true);
bgMusic.setVolume(0.22);

sfxEat.setVolume(0.45);
sfxRare.setVolume(0.55);
sfxLegendary.setVolume(0.70);
sfxShield.setVolume(0.60);
sfxGameOver.setVolume(0.75);
}
function startGame() {
if (!bgMusic.isPlaying()) {
  bgMusic.play();
}
  // Estado do jogo
  gameState = "playing";
  score = 0;
  level = 1;

  // Mapa
  obstacles = [];
  shield = null;
  shieldActive = false;

  // Frutas
  rareFood = false;
  legendaryFood = false;

  // NOVO: limpa efeitos visuais
  particles = [];
  floatingTexts = [];
  shakeIntensity = 0;
  shakeDuration = 0;

  // Cobra
  snake = new Snake();

  createFood();
  createObstacle();

  frameRate(9);
}
function equipSkin(skin){

  if(
    !unlockedSkins.includes(skin.id)
  ) return;

  currentSkin = skin.id;

  saveGame();

}
function buySkin(skin){

  if(
    unlockedSkins.includes(skin.id)
  ) return;

  if(
    coins < skin.price
  ) return;

  coins -= skin.price;

  unlockedSkins.push(skin.id);

  saveGame();

}

function drawMenu() {

  background(5, 3, 15);

  const gameHeight = height - HUD_HEIGHT;

  // ======================================
  // PARTÍCULAS
  // ======================================

  updateMenuParticles();
  drawMenuParticles();

  // ======================================
  // COBRA RGB
  // ======================================

  updateMenuSnake();
  drawMenuSnake();

  // ======================================
  // GRID
  // ======================================

  stroke(25, 10, 45);

  for (let x = 0; x < width; x += scaleSize) {
    line(x, 0, x, gameHeight);
  }

  for (let y = 0; y < gameHeight; y += scaleSize) {
    line(0, y, width, y);
  }

  noStroke();

  // ======================================
  // TÍTULO
  // ======================================

  drawMenuTitle();

  // ======================================
  // BOTÃO JOGAR
  // ======================================

  let playX = width / 2 - 120;
  let playY = 260;
  let playW = 240;
  let playH = 55;

  let playHover =
    mouseX >= playX &&
    mouseX <= playX + playW &&
    mouseY >= playY &&
    mouseY <= playY + playH;

  drawingContext.shadowBlur = playHover ? 30 : 15;
  drawingContext.shadowColor = "#00FFFF";

  fill(playHover ? color(0,255,255,60) : color(10,20,35));

  stroke("#00FFFF");
  strokeWeight(2);

  rect(playX, playY, playW, playH, 10);

  noStroke();

  fill(playHover ? "#FFFFFF" : "#00FFFF");
  textAlign(CENTER, CENTER);
  textSize(playHover ? 24 : 22);

  text("▶ JOGAR", width/2, playY + playH/2);

  // ======================================
  // BOTÃO SKINS
  // ======================================

  let skinX = width / 2 - 120;
  let skinY = 335;
  let skinW = 240;
  let skinH = 50;

  let skinHover =
    mouseX >= skinX &&
    mouseX <= skinX + skinW &&
    mouseY >= skinY &&
    mouseY <= skinY + skinH;

  drawingContext.shadowBlur = skinHover ? 25 : 15;
  drawingContext.shadowColor = "#FF00FF";

  fill(skinHover ? color(255,0,255,60) : color(15,10,30));

  stroke("#FF00FF");
  strokeWeight(2);

  rect(skinX, skinY, skinW, skinH, 10);

  noStroke();

  fill(skinHover ? "#FFFFFF" : "#FF00FF");
  textSize(skinHover ? 21 : 19);

  text("🎨 SKINS", width/2, skinY + skinH/2);

  // ======================================
  // WALLET / PERFIL
  // ======================================

  let panelX = width/2 - 145;
  let panelY = 390;
  let panelW = 290;
  let panelH = 100;

  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = "#00E5FF";

  fill(10,18,35);
  stroke("#00E5FF");
  strokeWeight(2);

  rect(panelX, panelY, panelW, panelH, 12);

  noStroke();
  drawingContext.shadowBlur = 0;

  // Wallet
  fill("#00E5FF");
  textAlign(LEFT, CENTER);
  textSize(12);
  text("WALLET", panelX + 18, panelY + 18);

  fill("#FFD700");
  textSize(22);
  text("🪙 " + coins.toLocaleString("pt-BR"),
       panelX + 18,
       panelY + 42);

  // Divisor
  stroke(40,70,100);
  line(panelX + 150, panelY + 15,
       panelX + 150, panelY + 85);
  noStroke();

  // Recorde
  fill("#7DD3FC");
  textAlign(LEFT, CENTER);
  textSize(11);
  text("RECORDE", panelX + 165, panelY + 20);

  fill("#FFFFFF");
  textSize(17);
  text("🏆 " + highScore,
       panelX + 165,
       panelY + 40);

  // Skin
  fill("#C084FC");
  textSize(11);
  text("SKIN", panelX + 165, panelY + 60);

  fill("#FFFFFF");
  textSize(13);
  text(skinNames[currentSkin],
       panelX + 165,
       panelY + 78);

  // ======================================
  // RODAPÉ
  // ======================================

  fill(80);
  textAlign(CENTER, CENTER);
  textSize(11);

  text(
    "SNAKE CYBERPUNK // SYSTEM ONLINE",
    width/2,
    height - 20
  );

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";

}
function createShield() {

  const gameHeight = height - HUD_HEIGHT;

  let cols = floor(width / scaleSize);
  let rows = floor(gameHeight / scaleSize);

  let x;
  let y;

  do {

    x = floor(random(cols)) * scaleSize;
    y = floor(random(rows)) * scaleSize;

  } while (isPositionOccupied(x, y));

  shield = createVector(x, y);

}
function draw() {

  if (gameState === "menu") {
    drawMenu();
    return;
  }

  if (gameState === "skins") {
    drawSkins();
    return;
  }

  if (gameState === "playing") {
    drawGame();
    return;
  }

  if (gameState === "gameover") {
    drawGameOver();
    return;
  }

}

function drawGame() {

  background(10, 0, 25);

  push();
  updateShake();

  drawGrid();
  updateLevel();

  snake.update();

  // =========================
  // MORTE
  // =========================

  if (snake.dead()) {

    if (score > highScore) {
      highScore = score;
    }

    saveGame();

    bgMusic.stop();
    sfxGameOver.play();

    pop();

    gameState = "gameover";
    return;
  }

  // =========================
  // PEGAR ESCUDO
  // =========================

  if (shield) {

    let head = snake.body[snake.body.length - 1];

    if (head.x === shield.x && head.y === shield.y) {

      shieldActive = true;
      shield = null;

      sfxShield.play();

      createParticles(
        head.x + 10,
        head.y + 10,
        20,
        color("#00E5FF")
      );

      createFloatingText(
        head.x + 10,
        head.y,
        "ESCUDO",
        color("#00E5FF")
      );

    }

  }

  // Spawn do escudo
  if (!shield && !shieldActive && random(200) < 1) {
    createShield();
  }

  // =========================
  // COMER FRUTA
  // =========================

  if (snake.eat(food)) {

    if (legendaryFood) {

      sfxLegendary.play();
      startShake(8, 10);

      createParticles(
        food.x + 10,
        food.y + 10,
        40,
        color("#FFD700")
      );

      createFloatingText(
        food.x + 10,
        food.y,
        "+100",
        color("#FFD700")
      );

      score += 100;
      coins += 50;

    }

    else if (rareFood) {

      sfxRare.play();
      startShake(4, 6);

      createParticles(
        food.x + 10,
        food.y + 10,
        22,
        color("#00BFFF")
      );

      createFloatingText(
        food.x + 10,
        food.y,
        "+50",
        color("#00BFFF")
      );

      score += 50;
      coins += 25;

    }

    else {

      sfxEat.play();
      startShake(2, 3);

      createParticles(
        food.x + 10,
        food.y + 10,
        10,
        color("#FF00AA")
      );

      createFloatingText(
        food.x + 10,
        food.y,
        "+10",
        color("#FF00AA")
      );

      score += 10;
      coins += 5;

    }

    if (score > highScore) {
      highScore = score;
    }

    saveGame();
    createFood();

  }

  // =========================
  // DESENHO
  // =========================

  drawObstacles();
  drawFood();
  drawShield();

  updateParticles();
  updateFloatingTexts();

  snake.show();
  drawHUD();

  pop();

}
function mousePressed() {

  // ======================================
  // MENU
  // ======================================
  if (gameState === "menu") {

    if (
      mouseX >= width/2 - 120 &&
      mouseX <= width/2 + 120 &&
      mouseY >= 260 &&
      mouseY <= 315
    ) {
      startGame();
      return;
    }

    if (
      mouseX >= width/2 - 120 &&
      mouseX <= width/2 + 120 &&
      mouseY >= 335 &&
      mouseY <= 385
    ) {
      gameState = "skins";
      return;
    }
  }

  // ======================================
  // SKINS
  // ======================================
  else if (gameState === "skins") {

    const skinsPerPage = 6;
    const cardWidth = 210;
    const cardHeight = 145;
    const gap = 15;

    const startX =
      (width - (cardWidth * 3 + gap * 2)) / 2;

    const startY = 110;

    // Voltar
    if (
      mouseX >= 20 &&
      mouseX <= 120 &&
      mouseY >= 20 &&
      mouseY <= 55
    ) {
      gameState = "menu";
      return;
    }

    // Página anterior
    if (
      skinPage > 0 &&
      mouseX >= width/2 - 130 &&
      mouseX <= width/2 - 70 &&
      mouseY >= height - 70 &&
      mouseY <= height - 20
    ) {
      skinPage--;
      return;
    }

    // Próxima página
    const totalPages =
      ceil(skinCards.length / skinsPerPage);

    if (
      skinPage < totalPages - 1 &&
      mouseX >= width/2 + 70 &&
      mouseX <= width/2 + 130 &&
      mouseY >= height - 70 &&
      mouseY <= height - 20
    ) {
      skinPage++;
      return;
    }

    // Cards
    const startIndex = skinPage * skinsPerPage;
    const endIndex =
      min(startIndex + skinsPerPage, skinCards.length);

    let card = 0;

    for (let i = startIndex; i < endIndex; i++) {

      const skin = skinCards[i];

      const row = floor(card / 3);
      const col = card % 3;

      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + gap);

      const bx = x + 55;
      const by = y + 108;

      if (
        mouseX >= bx &&
        mouseX <= bx + 100 &&
        mouseY >= by &&
        mouseY <= by + 24
      ) {

        if (unlockedSkins.includes(skin.id)) {
          equipSkin(skin);
        } else {
          buySkin(skin);
        }

        return;
      }

      card++;
    }
  }

  // ======================================
  // GAME OVER
  // ======================================
  else if (gameState === "gameover") {

    if (
      mouseX >= width/2 - 120 &&
      mouseX <= width/2 + 120 &&
      mouseY >= 430 &&
      mouseY <= 485
    ) {
      startGame();
      return;
    }
  }

}
function drawSkins() {

  background(5, 3, 15);

  const gameHeight = height - HUD_HEIGHT;

  // ======================================
  // GRID
  // ======================================

  stroke(25, 10, 45);

  for (let x = 0; x < width; x += scaleSize) {
    line(x, 0, x, gameHeight);
  }

  for (let y = 0; y < gameHeight; y += scaleSize) {
    line(0, y, width, y);
  }

  noStroke();

  // ======================================
  // BOTÃO VOLTAR
  // ======================================

  let backHover =
    mouseX >= 20 &&
    mouseX <= 120 &&
    mouseY >= 20 &&
    mouseY <= 55;

  drawingContext.shadowBlur = backHover ? 20 : 8;
  drawingContext.shadowColor = "#00E5FF";

  fill(backHover ? color(0,229,255,50) : color(15,20,35));

  stroke("#00E5FF");
  strokeWeight(2);

  rect(20, 20, 100, 35, 8);

  noStroke();

  fill(backHover ? "#FFFFFF" : "#00E5FF");
  textAlign(CENTER, CENTER);
  textSize(14);

  text("← VOLTAR", 70, 38);

  // ======================================
  // TÍTULO
  // ======================================

  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "#FF00FF";

  fill("#FF00FF");
  textSize(38);

  text("SKINS", width/2, 40);

  drawingContext.shadowBlur = 0;

  // ======================================
  // WALLET
  // ======================================

  let walletX = width/2 - 120;
  let walletY = 55;

  fill(10,18,35);
  stroke("#FFD700");
  strokeWeight(2);

  rect(walletX, walletY, 240, 40, 10);

  noStroke();

  fill("#FFD700");
  textSize(18);

  text(
    "🪙 " + coins.toLocaleString("pt-BR") + " BITS",
    width/2,
    walletY + 20
  );

  // ======================================
  // CARDS
  // ======================================

  let cardWidth = 210;
  let cardHeight = 145;
  let gap = 15;

  let startX =
    (width - (cardWidth * 3 + gap * 2)) / 2;

  let startY = 110;

  const skinsPerPage = 6;

  const startIndex =
    skinPage * skinsPerPage;

  const endIndex =
    min(startIndex + skinsPerPage, skinCards.length);

  let card = 0;

  for (let i = startIndex; i < endIndex; i++) {

    let skin = skinCards[i];

    let row = floor(card / 3);
    let col = card % 3;

    let x =
      startX + col * (cardWidth + gap);

    let y =
      startY + row * (cardHeight + gap);

    drawSkinCard(
      skin,
      x,
      y,
      cardWidth,
      cardHeight
    );

    card++;

  }

  // ======================================
  // PAGINAÇÃO
  // ======================================

  let totalPages =
    ceil(skinCards.length / skinsPerPage);

  fill(180);
  textSize(15);

  text(
    "PÁGINA " +
    (skinPage + 1) +
    " / " +
    totalPages,
    width/2,
    height - 45
  );

  if (skinPage > 0) {

    fill("#00E5FF");
    textSize(28);

    text("◀", width/2 - 100, height - 45);

  }

  if (skinPage < totalPages - 1) {

    fill("#FF00FF");
    textSize(28);

    text("▶", width/2 + 100, height - 45);

  }

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";

}
function drawSkinCard(skin, x, y, w, h) {

  const unlocked = unlockedSkins.includes(skin.id);
  const equipped = currentSkin === skin.id;

  const hovering =
    mouseX >= x &&
    mouseX <= x + w &&
    mouseY >= y &&
    mouseY <= y + h;

  // ======================================
  // CARD
  // ======================================

  drawingContext.shadowBlur = hovering ? 22 : 10;

  if (equipped) {

    drawingContext.shadowColor = "#00E5FF";
    fill(8, 35, 42);
    stroke("#00E5FF");

  } else if (hovering) {

    drawingContext.shadowColor = "#FF00FF";
    fill(22, 12, 38);
    stroke("#FF00FF");

  } else {

    drawingContext.shadowColor = "#331144";
    fill(12, 8, 24);
    stroke("#442255");

  }

  strokeWeight(2);

  rect(x, y, w, h, 12);

  noStroke();

  // ======================================
  // PREVIEW
  // ======================================

  drawSkinPreview(
    skin.id,
    x + w/2,
    y + 38
  );

  // ======================================
  // NOME
  // ======================================

  drawingContext.shadowBlur = 0;

  fill(255);

  textAlign(CENTER, CENTER);

  textSize(14);

  text(
    skin.name,
    x + w/2,
    y + 72
  );

  // ======================================
  // STATUS
  // ======================================

  textSize(11);

  if (equipped) {

    fill("#00E5FF");

    text(
      "✓ EQUIPADA",
      x + w/2,
      y + 92
    );

  }

  else if (unlocked) {

    fill("#00FF88");

    text(
      "DESBLOQUEADA",
      x + w/2,
      y + 92
    );

  }

  else {

    fill("#FF6666");

    text(
      "🔒 " +
      skin.price.toLocaleString("pt-BR"),
      x + w/2,
      y + 92
    );

  }

  // ======================================
  // BOTÃO
  // ======================================

  if (!equipped) {

    const bx = x + 55;
    const by = y + 108;
    const bw = 100;
    const bh = 24;

    const buttonHover =
      mouseX >= bx &&
      mouseX <= bx + bw &&
      mouseY >= by &&
      mouseY <= by + bh;

    drawingContext.shadowBlur =
      buttonHover ? 18 : 8;

    drawingContext.shadowColor =
      unlocked ? "#00E5FF" : "#FFD700";

    fill(
      unlocked
        ? color(0,229,255)
        : color(255,215,0)
    );

    rect(
      bx,
      by,
      bw,
      bh,
      7
    );

    drawingContext.shadowBlur = 0;

    fill(0);

    textSize(11);

    text(
      unlocked
        ? "EQUIPAR"
        : "COMPRAR",
      x + w/2,
      by + bh/2
    );

  }

  // ======================================
  // RESET
  // ======================================

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";

}
function drawSkinPreview(skinID, centerX, centerY) {

  const segments = 5;
  const segmentSize = 12;

  for (let i = 0; i < segments; i++) {

    let x = centerX - 28 + i * 14;
    let y = centerY;

    noStroke();

    // ======================================
    // RGB SPECTRUM
    // ======================================

    if (skinID === "rgbSpectrum") {

      colorMode(HSB, 360, 100, 100);

      let hue = (frameCount * 2 + i * 30) % 360;

      let rgbColor = color(hue, 100, 100);

      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = rgbColor;

      fill(rgbColor);

    }

    // ======================================
    // OUTRAS SKINS
    // ======================================

    else {

      colorMode(RGB, 255);

      let skinColor = skins[skinID];

      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = skinColor;

      fill(skinColor);

    }

    rect(x, y, segmentSize, segmentSize, 4);

  }

  colorMode(RGB, 255);
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";

}
function drawShield() {

  if (!shield) return;

  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = "#00AAFF";

  noStroke();

  fill("#00AAFF");

  ellipse(
    shield.x + scaleSize / 2,
    shield.y + scaleSize / 2,
    scaleSize + 4
  );

  fill(255);

  textAlign(CENTER, CENTER);
  textSize(12);

  text(
    "🛡",
    shield.x + scaleSize / 2,
    shield.y + scaleSize / 2
  );

  // Reset gráfico
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";
  textAlign(LEFT, BASELINE);

}
function drawGrid() {

  const gameHeight = height - HUD_HEIGHT;

  stroke(25, 10, 45);
  strokeWeight(1);

  for (let x = 0; x <= width; x += scaleSize) {
    line(x, 0, x, gameHeight);
  }

  for (let y = 0; y <= gameHeight; y += scaleSize) {
    line(0, y, width, y);
  }

  noStroke();
  strokeWeight(1);

}
function drawFood() {

  noStroke();

  // 👑 LENDÁRIA
  if (legendaryFood) {

    drawingContext.shadowBlur = 35;
    drawingContext.shadowColor = "#FFD700";

    fill("#FFD700");

    ellipse(
      food.x + scaleSize / 2,
      food.y + scaleSize / 2,
      18
    );

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);

    text(
      "★",
      food.x + scaleSize / 2,
      food.y + scaleSize / 2
    );

  }

  // 💙 RARA
  else if (rareFood) {

    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = "#00BFFF";

    fill("#00BFFF");

    ellipse(
      food.x + scaleSize / 2,
      food.y + scaleSize / 2,
      16
    );

  }

  // 🍎 COMUM
  else {

    drawingContext.shadowBlur = 18;
    drawingContext.shadowColor = "#FF00AA";

    fill("#FF00AA");

    ellipse(
      food.x + scaleSize / 2,
      food.y + scaleSize / 2,
      14
    );

  }

  // Reset
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";
  textAlign(LEFT, BASELINE);

}
function getSkinName() {

  switch (currentSkin) {

    case "neonBlue":
      return "⚡ Neon Blue";

    case "goldKing":
      return "👑 Gold King";

    case "toxicGreen":
      return "☢ Toxic Green";

    case "infernoRed":
      return "🔥 Inferno Red";

    case "purpleVoid":
      return "🌌 Purple Void";

    case "rgbSpectrum":
      return "🌈 RGB Spectrum";

    case "cyberPulse":
      return "💠 Cyber Pulse";

    case "galaxyStar":
      return "⭐ Galaxy Star";

    case "matrixCode":
      return "🟩 Matrix Code";

    case "shadowNinja":
      return "🌑 Shadow Ninja";

    default:
      return "Desconhecida";

  }

}

function drawHUD() {

  const hudY = height - HUD_HEIGHT;

  // ======================================
  // FUNDO
  // ======================================

  noStroke();

  fill(8, 12, 28);
  rect(0, hudY, width, HUD_HEIGHT);

  // Linha Neon
  fill("#00E5FF");
  rect(0, hudY, width, 2);

  // ======================================
  // PRIMEIRA LINHA
  // ======================================

  const col1 = 20;
  const col2 = 180;
  const col3 = 340;
  const col4 = 510;

  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = "#00E5FF";

  fill("#00E5FF");
  textAlign(LEFT, CENTER);
  textSize(18);

  text("🏆 " + highScore, col1, hudY + 20);
  text("⭐ " + score, col2, hudY + 20);
  text("🚀 " + level, col3, hudY + 20);
  text("🪙 " + coins.toLocaleString("pt-BR"), col4, hudY + 20);

  // ======================================
  // SEGUNDA LINHA
  // ======================================

  drawingContext.shadowBlur = 0;

  fill(180);
  textSize(14);

  text(
    "🎨 " + skinNames[currentSkin],
    col1,
    hudY + 50
  );

  if (shieldActive) {

    fill("#00FFAA");

    text(
      "🛡 ESCUDO ATIVO",
      col3,
      hudY + 50
    );

  } else {

    fill(120);

    text(
      "🛡 OFF",
      col3,
      hudY + 50
    );

  }

  // Reset
  textAlign(LEFT, BASELINE);
  drawingContext.shadowColor = "transparent";

}
function updateLevel() {

  let newLevel = floor(score / 100) + 1;

  if (newLevel <= level) return;

  level = newLevel;

  // Velocidade progressiva
  let speed = min(9 + (level - 1), 16);
  frameRate(speed);

  // Novo obstáculo a cada fase
  createObstacle();

}
function isPositionOccupied(x, y) {

  // Área reservada do menu/HUD
  if (x < 280 && y < 240) {
    return true;
  }

  // Cobra
  for (let part of snake.body) {
    if (part.x === x && part.y === y) {
      return true;
    }
  }

  // Obstáculos
  for (let obs of obstacles) {
    if (obs.x === x && obs.y === y) {
      return true;
    }
  }

  return false;
}
function createFood() {

  const gameHeight = height - HUD_HEIGHT;

  const cols = floor(width / scaleSize);
  const rows = floor(gameHeight / scaleSize);

  // Reset das raridades
  rareFood = false;
  legendaryFood = false;

  // ======================================
  // CHANCES
  // ======================================

  const LEGENDARY_CHANCE = 3;   // 3%
  const RARE_CHANCE = 12;       // 12%

  let chance = random(100);

  if (chance < LEGENDARY_CHANCE) {

    legendaryFood = true;

  } else if (chance < LEGENDARY_CHANCE + RARE_CHANCE) {

    rareFood = true;

  }

  // ======================================
  // SPAWN
  // ======================================

  for (let tentativa = 0; tentativa < 500; tentativa++) {

    let x = floor(random(cols)) * scaleSize;
    let y = floor(random(rows)) * scaleSize;

    if (!isPositionOccupied(x, y)) {

      food = createVector(x, y);
      return;

    }

  }

}
function createObstacle() {

  const gameHeight = height - HUD_HEIGHT;

  const cols = floor(width / scaleSize);
  const rows = floor(gameHeight / scaleSize);

  for (let tentativa = 0; tentativa < 500; tentativa++) {

    let x = floor(random(cols)) * scaleSize;
    let y = floor(random(rows)) * scaleSize;

    // Não cria em locais ocupados
    if (isPositionOccupied(x, y)) continue;

    // Nem em cima da fruta
    if (food && food.x === x && food.y === y) continue;

    // Nem em cima do escudo
    if (shield && shield.x === x && shield.y === y) continue;

    obstacles.push(createVector(x, y));
    return;

  }

}
function drawObstacles() {

  noStroke();

  for (let obs of obstacles) {

    // Glow
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "#FFA200";

    // Bloco
    fill("#FF7800");

    rect(
      obs.x,
      obs.y,
      scaleSize,
      scaleSize,
      4
    );

    // X interno
    stroke(255);
    strokeWeight(1);

    line(
      obs.x + 3,
      obs.y + 3,
      obs.x + scaleSize - 3,
      obs.y + scaleSize - 3
    );

    line(
      obs.x + scaleSize - 3,
      obs.y + 3,
      obs.x + 3,
      obs.y + scaleSize - 3
    );

    noStroke();

  }

  // Reset gráfico
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";
  strokeWeight(1);

}

function resetGame() {

  // Pontuação
  score = 0;
  level = 1;

  // Limpa mapa
  obstacles = [];
  shield = null;
  shieldActive = false;

  // Frutas especiais
  rareFood = false;
  legendaryFood = false;

  // Nova cobra
  snake = new Snake();

  // Objetos iniciais
  createFood();
  createObstacle();

  // Velocidade inicial
  frameRate(9);

  // Volta para a partida
  gameState = "playing";

}

function keyPressed() {

  // ======================================
  // ESC - Voltar da loja
  // ======================================

  if (
    keyCode === ESCAPE &&
    gameState === "skins"
  ) {
    gameState = "menu";
    return;
  }

  // ======================================
  // R - Reiniciar após Game Over
  // ======================================

  if (
    gameState === "gameover" &&
    (key === "r" || key === "R")
  ) {
    startGame();
    return;
  }

  // ======================================
  // Movimento da cobra
  // ======================================

  if (
    gameState === "playing"
  ) {

    if (
      keyCode === UP_ARROW &&
      snake.ydir !== 1
    ) {
      snake.dir(0, -1);
    }

    else if (
      keyCode === DOWN_ARROW &&
      snake.ydir !== -1
    ) {
      snake.dir(0, 1);
    }

    else if (
      keyCode === LEFT_ARROW &&
      snake.xdir !== 1
    ) {
      snake.dir(-1, 0);
    }

    else if (
      keyCode === RIGHT_ARROW &&
      snake.xdir !== -1
    ) {
      snake.dir(1, 0);
    }

  }

  // ======================================
  // Atalhos da loja (1 ao 0)
  // Apenas funcionam dentro da tela SKINS
  // ======================================

   if (gameState === "skins") {

    if (key === "1") equipSkin(skinCards[0]);
    if (key === "2") buySkin(skinCards[1]);
    if (key === "3") buySkin(skinCards[2]);
    if (key === "4") buySkin(skinCards[3]);
    if (key === "5") buySkin(skinCards[4]);
    if (key === "6") buySkin(skinCards[5]);
    if (key === "7") buySkin(skinCards[6]);
    if (key === "8") buySkin(skinCards[7]);
    if (key === "9") buySkin(skinCards[8]);
    if (key === "0") buySkin(skinCards[9]);

  }

} // ← ESTA CHAVE FECHA A keyPressed()

// =========================
// SNAKE CYBERPUNK V2.0
// PARTE 3
// =========================

class Snake {

  constructor() {
    this.body = [createVector(200, 200)];
    this.xdir = 1;
    this.ydir = 0;
    this.length = 1;
  }

  dir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {

    let head = this.body[this.body.length - 1].copy();

    head.x += this.xdir * scaleSize;
    head.y += this.ydir * scaleSize;

    const gameHeight = height - HUD_HEIGHT;

    // Portal horizontal
    if (head.x >= width) head.x = 0;
    if (head.x < 0) head.x = width - scaleSize;

    // Portal vertical
    if (head.y >= gameHeight) head.y = 0;
    if (head.y < 0) head.y = gameHeight - scaleSize;

    this.body.push(head);

    while (this.body.length > this.length) {
      this.body.shift();
    }
  }

  show() {

    noStroke();

    for (let i = 0; i < this.body.length; i++) {

      let part = this.body[i];
      let isHead = i === this.body.length - 1;

      // ===== RGB =====
      if (currentSkin === "rgbSpectrum") {

        colorMode(HSB, 360, 100, 100);

        let hue = (frameCount * 2 + i * 12) % 360;
        let c = color(hue, 100, 100);

        drawingContext.shadowBlur = isHead ? 28 : 20;
        drawingContext.shadowColor = c;

        fill(c);

      }

      // ===== NORMAL =====
      else {

        colorMode(RGB, 255);

        if (isHead) {

          drawingContext.shadowBlur = 25;
          drawingContext.shadowColor = "#FFFFFF";

          fill(255);

        } else {

          let bodyColor = skins[currentSkin];

          drawingContext.shadowBlur = 20;
          drawingContext.shadowColor = bodyColor;

          fill(bodyColor);

        }

      }

      rect(
        part.x,
        part.y,
        scaleSize,
        scaleSize,
        6
      );

      // Olhos
      if (isHead) {

        fill(0);

        let ex1, ey1, ex2, ey2;

        if (this.xdir === 1) {
          ex1 = part.x + 14; ey1 = part.y + 6;
          ex2 = part.x + 14; ey2 = part.y + 14;
        } else if (this.xdir === -1) {
          ex1 = part.x + 6; ey1 = part.y + 6;
          ex2 = part.x + 6; ey2 = part.y + 14;
        } else if (this.ydir === 1) {
          ex1 = part.x + 6; ey1 = part.y + 14;
          ex2 = part.x + 14; ey2 = part.y + 14;
        } else {
          ex1 = part.x + 6; ey1 = part.y + 6;
          ex2 = part.x + 14; ey2 = part.y + 6;
        }

        ellipse(ex1, ey1, 5);
        ellipse(ex2, ey2, 5);

        // brilho dos olhos
        fill(255);
        ellipse(ex1 - 1, ey1 - 1, 2);
        ellipse(ex2 - 1, ey2 - 1, 2);

      }

    }

    colorMode(RGB, 255);
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = "transparent";
  }

  eat(pos) {

    let head = this.body[this.body.length - 1];

    if (head.x === pos.x && head.y === pos.y) {
      this.length++;
      return true;
    }

    return false;
  }

  dead() {

    let head = this.body[this.body.length - 1];

    // Colisão com obstáculos
    for (let obs of obstacles) {

      if (head.x === obs.x && head.y === obs.y) {

        // Escudo protege o jogador
        if (shieldActive) {

          shieldActive = false;

          sfxShield.play();

          startShake(10, 12);

          createParticles(
            head.x + scaleSize / 2,
            head.y + scaleSize / 2,
            30,
            color("#00E5FF")
          );

          createFloatingText(
            head.x + scaleSize / 2,
            head.y,
            "BLOQUEADO",
            color("#00E5FF")
          );

          return false;
        }

        // Morreu
        return true;
      }
    }

    return false;
  }

} // Fecha a classe Snake