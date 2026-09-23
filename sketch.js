// =========================
// SNAKE CYBERPUNK V2.0
// PARTE 1
// =========================
// =========================
// ADVANCED STATS
// =========================
let totalFruits = 0;
let totalGames = 0;
let totalPlayTime = 0;   // segundos
let gameStartTime = 0;
let gameState = "boot";
// novo estado
// gameState = "achievements"
const achievementList = [
  {
    id: "rookie",
    icon: "🥉",
    title: "Iniciante",
    goal: 100,
    type: "score"
  },
  {
    id: "collector",
    icon: "🍎",
    title: "Colecionador",
    goal: 250,
    type: "fruits"
  },
  {
    id: "veteran",
    icon: "🎮",
    title: "Veterano",
    goal: 50,
    type: "games"
  },
  {
    id: "rich",
    icon: "💰",
    title: "Magnata",
    goal: 10000,
    type: "coins"
  },
  {
    id: "legend",
    icon: "👑",
    title: "Lenda",
    goal: 2000,
    type: "highscore"
  },
  {
  id: "neonMaster",
  icon: "🌈",
  title: "Neon Master",
  goal: 10,        // quantidade de skins
  type: "skins"
}
];
let bootTimer = 0;
const BOOT_DURATION = 150; // 150 frames ≈ 2,5s
let bootProgress = 0;
let bootFinished = false;
let isPaused = true;
let previousState = "menu";
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
let debugMode = true;
// =========================
// CONFIGURAÇÕES
// =========================
let musicVolume = 1.0;
let sfxVolume = 1.0;
let gameFPS = 9;
let forceLegendary = false;
let achievementAnim = [];
// =========================
// ACHIEVEMENTS
// =========================
let stats = {
  gamesPlayed: 0,
  fruitsEaten: 0,
  legendaryEaten: 0,
  shieldsCollected: 0,
  totalBits: 0
};
let achievements = {

  firstBlood: false,
  luckyOne: false,
  richHacker: false,
  neonMaster: false

};
let achievementPopup = null;
let achievementTimer = 0;
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
function saveStats(){

  localStorage.setItem("snakeHighScore", highScore);
  localStorage.setItem("snakeCoins", coins);

  localStorage.setItem("snakeTotalFruits", totalFruits);
  localStorage.setItem("snakeTotalGames", totalGames);
  localStorage.setItem("snakePlayTime", totalPlayTime);

}
function loadStats(){

  highScore =
    Number(localStorage.getItem("snakeHighScore")) || 0;

  coins =
    Number(localStorage.getItem("snakeCoins")) || 0;

  totalFruits =
    Number(localStorage.getItem("snakeTotalFruits")) || 0;

  totalGames =
    Number(localStorage.getItem("snakeTotalGames")) || 0;

  totalPlayTime =
    Number(localStorage.getItem("snakePlayTime")) || 0;

}
function saveSettings() {

  localStorage.setItem(
    "snakeMusicVolume",
    musicVolume
  );

  localStorage.setItem(
    "snakeSfxVolume",
    sfxVolume
  );

  localStorage.setItem(
    "snakeFPS",
    gameFPS
  );

}
function loadSettings() {

  let savedMusic = localStorage.getItem("snakeMusicVolume");
  let savedSfx = localStorage.getItem("snakeSfxVolume");
  let savedFPS = localStorage.getItem("snakeFPS");

  // Música
  if (savedMusic === null) {
    musicVolume = 0.22;
  } else {
    musicVolume = Number(savedMusic);
  }

  // Efeitos
  if (savedSfx === null) {
    sfxVolume = 1.0;
  } else {
    sfxVolume = Number(savedSfx);
  }

  // FPS
  if (savedFPS === null) {
    gameFPS = 9;
  } else {
    gameFPS = Number(savedFPS);
  }

  frameRate(gameFPS);
  updateAudioVolumes();
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

  localStorage.setItem(
  "snakeAchievements",
  JSON.stringify(achievements)
);
}
function loadGame() {

  let savedHighScore =
    localStorage.getItem("snakeHighScore");

  let savedCoins =
    localStorage.getItem("snakeCoins");

  let savedSkin =
    localStorage.getItem("snakeSkin");

    let savedAchievements =
  localStorage.getItem("snakeAchievements");

if(savedAchievements !== null){

  achievements =
    JSON.parse(savedAchievements);

}
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
function resetAchievementAnimation(){

  achievementAnim = [];

  for(let i = 0; i < achievementList.length; i++){
    achievementAnim.push(0);
  }

}
function unlockAchievement(id, title) {

  // Já desbloqueada? Sai fora.
  if (achievements[id]) return;

  achievements[id] = true;

  // Popup
  achievementPopup = title;
  achievementTimer = 35; 

  // Som (se existir)
  if (typeof sfxAchievement !== "undefined") {
    sfxAchievement.play();
  }

  saveGame();
}
function checkAchievements(){

  // 🥉 Iniciante
  if(score >= 100){
    unlockAchievement(
      "rookie",
      "INICIANTE"
    );
  }

  // 🍎 Colecionador
  if(totalFruits >= 250){
    unlockAchievement(
      "collector",
      "COLECIONADOR"
    );
  }

  // 🎮 Veterano
  if(totalGames >= 50){
    unlockAchievement(
      "veteran",
      "VETERANO"
    );
  }

  // 💰 Magnata
  if(coins >= 10000){
    unlockAchievement(
      "rich",
      "MAGNATA"
    );
  }

  // 👑 Lenda
  if(highScore >= 2000){
    unlockAchievement(
      "legend",
      "LENDA"
    );
  }

  // 🌈 Mestre Neon (secreta)
  if(unlockedSkins.length === skinCards.length){
    unlockAchievement(
      "neonMaster",
      "NEON MASTER"
    );
  }

}
function drawAchievementPopup() {

  if (!achievementPopup) return;

  achievementTimer--;

  if (achievementTimer <= 35) {
    achievementPopup = null;
    return;
  }

  push();

  rectMode(CORNER);
  textAlign(CENTER, CENTER);

  // Glow
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = "#FFD700";

  stroke("#FFD700");
  strokeWeight(2);
  fill(20, 15, 30, 245);

  rect(width/2 - 170, 35, 340, 75, 12);

  noStroke();

  fill("#FFD700");
  textSize(15);
  text("🏆 CONQUISTA DESBLOQUEADA", width/2, 55);

  fill(255);
  textSize(22);
  text(achievementPopup, width/2, 82);

  pop();
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

  // =========================
  // CANVAS
  // =========================
  createCanvas(800, 680);

  // =========================
  // FPS PADRÃO
  // =========================
  frameRate(10);

  // =========================
  // SAVE DATA
  // =========================
  loadGame();
  loadStats();

  // NOVO
  loadSettings();

  // =========================
  // GAME OBJECTS
  // =========================
  snake = new Snake();

  createMenuSnake();

  createFood();
  createObstacle();

  // =========================
  // MENU PARTICLES
  // =========================
  for (let i = 0; i < maxMenuParticles; i++) {
    createMenuParticle();
  }

  // =========================
  // ÁUDIO PADRÃO
  // =========================
  bgMusic.setLoop(true);

  // Caso não exista save ainda
  if (musicVolume === undefined) {
    musicVolume = 0.22;
  }

  if (sfxVolume === undefined) {
    sfxVolume = 0.60;
  }

  // Aplica os volumes carregados
  updateAudioVolumes();

  // Volumes individuais de fallback
  sfxEat.setVolume(0.45 * sfxVolume);
  sfxRare.setVolume(0.55 * sfxVolume);
  sfxLegendary.setVolume(0.70 * sfxVolume);
  sfxShield.setVolume(0.60 * sfxVolume);
  sfxGameOver.setVolume(0.75 * sfxVolume);

}
function startGame() {
  userStartAudio();

updateAudioVolumes();
  gameStartTime = millis();
totalGames++;
saveStats();
 isPaused = false;   // ← ADICIONE ESTA LINHA

  // Música
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
  }

  // Estado
  gameState = "playing";
  gameOverState = false;
  stats.gamesPlayed++;
  saveStats();
  score = 0;
  level = 1;

  // Mapa
  obstacles = [];
  shield = null;
  shieldActive = false;

  // Frutas
  rareFood = false;
  legendaryFood = false;

  // Efeitos
  particles = [];
  floatingTexts = [];
  shakeIntensity = 0;
  shakeDuration = 0;

  // Cobra
  snake = new Snake();

  createFood();
  createObstacle();

  frameRate(9);

  // GARANTE QUE O DRAW VOLTE A RODAR
  loop();
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
function drawMenuButton(label, x, y, w, h, colorGlow, icon = "") {

  const hover =
    mouseX >= x &&
    mouseX <= x + w &&
    mouseY >= y &&
    mouseY <= y + h;

  drawingContext.shadowBlur = hover ? 28 : 14;
  drawingContext.shadowColor = colorGlow;

  fill(hover ? color(255, 255, 255, 35) : color(10, 18, 35));
  stroke(colorGlow);
  strokeWeight(2);

  rect(x, y, w, h, 12);

  noStroke();
  fill(hover ? "#FFFFFF" : colorGlow);

  textAlign(CENTER, CENTER);
  textSize(hover ? 22 : 20);

  text(`${icon} ${label}`, x + w/2, y + h/2 + 1);

  drawingContext.shadowBlur = 0;

  return hover;
}
function drawMenu() {

  background(5, 3, 15);
// =========================
// BOTÃO CONFIGURAÇÕES
// =========================
let gearHover =
  mouseX >= 15 &&
  mouseX <= 50 &&
  mouseY >= 15 &&
  mouseY <= 50;

fill(gearHover ? "#8B5CF6" : "#111827");
stroke("#8B5CF6");
strokeWeight(2);

rect(15, 15, 35, 35, 10);

noStroke();

textAlign(CENTER, CENTER);
textSize(18);
fill(255);
text("⚙", 32, 33);
  drawGrid();

  // Partículas de fundo
  for (let i = 0; i < 25; i++) {
    fill(0, random(150,255), random(150,255), 120);
    noStroke();
    circle(
      (frameCount * (i+1) * 0.2 + i*90) % width,
      (i*47) % height,
      random(1,3)
    );
  }

  // =========================
  // TÍTULO
  // =========================
  textAlign(CENTER);

  drawingContext.shadowBlur = 35;
  drawingContext.shadowColor = "#00F5FF";

  fill("#00F5FF");
  textSize(58);
  text("SNAKE", width/2, 95);

  drawingContext.shadowBlur = 18;
  drawingContext.shadowColor = "#FF00D4";

  fill("#FF00D4");
  textSize(32);
  text("CYBERPUNK", width/2, 135);

  drawingContext.shadowBlur = 0;

  fill(180);
  textSize(14);
  text("DIGITAL INFILTRATION SYSTEM", width/2, 160);

  // =========================
  // BOTÕES
  // =========================
  const btnX = width/2 - 120;
  const btnW = 240;
  const btnH = 50;

  drawMenuButton("JOGAR", btnX, 200, btnW, btnH, "#00F5FF", "▶");
  drawMenuButton("SKINS", btnX, 270, btnW, btnH, "#FF00D4", "🎨");
  drawMenuButton("ESTATÍSTICAS", btnX, 340, btnW, btnH, "#3B82F6", "📊");
  drawMenuButton("CONQUISTAS",width/2 - 120,410,240,50,"#F59E0B","🏆");

  // =========================
  // PAINEL PLAYER
  // =========================
  const panelX = width/2 - 145;
  const panelY = 475;

  drawingContext.shadowBlur = 22;
  drawingContext.shadowColor = "#00E5FF";

  fill(8, 20, 35, 230);
  stroke("#00E5FF");
  strokeWeight(2);

  rect(panelX, panelY, 290, 95, 14);

  drawingContext.shadowBlur = 0;

  // Wallet
  noStroke();
  fill("#00E5FF");
  textAlign(LEFT, CENTER);
  textSize(12);
  text("WALLET", panelX + 18, panelY + 18);

  fill("#FFD700");
  textSize(22);
  text(
    "🪙 " + coins.toLocaleString("pt-BR"),
    panelX + 18,
    panelY + 42
  );

  // Divisor
  stroke(40, 70, 100);
  line(
    panelX + 145,
    panelY + 15,
    panelX + 145,
    panelY + 80
  );
  noStroke();

  // Recorde
  fill("#7DD3FC");
  textSize(11);
  text("RECORDE", panelX + 160, panelY + 18);

  fill(255);
  textSize(18);
  text("🏆 " + highScore, panelX + 160, panelY + 40);

  // Skin equipada
  fill("#C084FC");
  textSize(11);
  text("SKIN", panelX + 160, panelY + 60);

  fill(255);
  textSize(13);
  text(skinNames[currentSkin], panelX + 160, panelY + 78);

  // Rodapé
  fill(90);
  textAlign(CENTER);
  textSize(12);
  text(
    "SNAKE CYBERPUNK // SYSTEM ONLINE",
    width/2,
    height - 18
  );
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

  if (gameState === "boot") {
    drawBoot();
    return;
  }

  if (gameState === "menu") {
    drawMenu();
    return;
  }

  if (gameState === "skins") {
    drawSkins();
    return;
  }

  if (gameState === "stats") {
    drawStats();
    return;
  }

  if (gameState === "achievements") {
  drawAchievements();
  return;
  }

  if (gameState === "settings") {
    drawSettings();
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
function drawAchievements() {

  background(8, 10, 20);
  drawGrid();

  // Inicializa animação
  if (achievementAnim.length !== achievementList.length) {
    achievementAnim = new Array(achievementList.length).fill(0);
  }

  // =========================
  // TÍTULO
  // =========================
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "#F59E0B";

  fill("#F59E0B");
  textAlign(CENTER, CENTER);
  textSize(30);
  text("CONQUISTAS", width / 2, 45);

  drawingContext.shadowBlur = 0;

  fill(150);
  textSize(12);
  text("100% COMPLETION", width / 2, 68);

  const cardX = 60;
  const cardW = width - 120;
  const startY = 95;
  const barX = cardX + 185;
  const barW = cardW - 235;

  let unlocked = 0;

  for (let i = 0; i < achievementList.length; i++) {

    const a = achievementList[i];
    const y = startY + i * 82;

    const progress = getAchievementProgress(a);
    const pct = constrain(progress / a.goal, 0, 1);

    // Animação suave
    achievementAnim[i] = lerp(
      achievementAnim[i],
      pct,
      0.08
    );

    const done = achievements[a.id] === true;

    if (done) unlocked++;

    // Card
    fill(12, 20, 35, 235);
    stroke(done ? "#F59E0B" : "#334155");
    strokeWeight(done ? 2 : 1.5);
    rect(cardX, y, cardW, 64, 14);

    noStroke();

    // Ícone
    textAlign(LEFT, CENTER);
    textSize(24);
    fill(255);
    text(a.icon, cardX + 15, y + 32);

    // Nome
    textSize(16);
    text(a.title, cardX + 50, y + 20);

    // Progresso
    fill(150);
    textSize(10);
    text(progress + " / " + a.goal, cardX + 50, y + 42);

    // Barra de fundo
    fill(45);
    rect(barX, y + 28, barW, 8, 4);

    // Barra preenchida
    let fillAmount = done ? 1 : achievementAnim[i];

    fill(done ? "#F59E0B" : "#22D3EE");
    rect(
      barX,
      y + 28,
      barW * fillAmount,
      8,
      4
    );

    // Porcentagem
    let percent = done
      ? 100
      : round(achievementAnim[i] * 100);

    fill(done ? "#F59E0B" : 200);
    textAlign(RIGHT, CENTER);
    textSize(11);
    text(
      percent + "%",
      cardX + cardW - 15,
      y + 32
    );
  }

  // =========================
  // RODAPÉ
  // =========================
  fill("#F59E0B");
  textAlign(CENTER, CENTER);
  textSize(15);
  text(
    unlocked + " / " + achievementList.length + " DESBLOQUEADAS",
    width / 2,
    520
  );

  // Botão voltar
  drawMenuButton(
    "VOLTAR",
    width / 2 - 100,
    560,
    200,
    45,
    "#2563EB",
    "←"
  );
}
function drawBoot() {

  background(3, 5, 12);

  // Grid
  stroke(15, 25, 40);

  for (let x = 0; x < width; x += 20)
    line(x, 0, x, height);

  for (let y = 0; y < height; y += 20)
    line(0, y, width, y);

  noStroke();

  bootTimer++;

 // Glitch leve
let glitch = random(-1.5, 1.5);

textAlign(CENTER);

// ===== GLITCH RGB =====
fill(255, 0, 120, 70);
textSize(60);
text("FSC", width/2 + glitch - 2, 250);

fill(0, 220, 255, 70);
text("FSC", width/2 + glitch + 2, 250);

// ===== LOGO RGB =====
colorMode(HSB, 360, 100, 100);

let hueRGB = (frameCount * 2) % 360;
let rgbColor = color(hueRGB, 100, 100);

drawingContext.shadowBlur = 35;
drawingContext.shadowColor = rgbColor;

fill(rgbColor);
text("FSC", width/2 + glitch, 250);

colorMode(RGB, 255);
drawingContext.shadowBlur = 0;

// Volta pro modo normal
colorMode(RGB, 255);

  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = "#8B5CF6";

  fill("#FFFFFF");
  textSize(28);
  text("STUDIOS", width/2, 295);

  drawingContext.shadowBlur = 0;

  fill(130);
  textSize(14);
  text("STUDIO INDEPENDENTE", width/2, 325);

  // Barra de carregamento
  const barW = 260;
  const progress = constrain(bootTimer / BOOT_DURATION, 0, 1);

  stroke("#334155");
  fill(20);
  rect(width/2 - barW/2, 380, barW, 12, 6);

  noStroke();
  fill("#00E5FF");
  rect(width/2 - barW/2, 380, barW * progress, 12, 6);

  fill(170);
  textSize(12);
  text("INITIALIZING...", width/2, 405);

  if (bootTimer >= BOOT_DURATION) {
    gameState = "menu";
    bootTimer = 0;
  }
}
function formatPlayTime(seconds){

  let h = floor(seconds / 3600);
  let m = floor((seconds % 3600) / 60);

  return nf(h, 2) + "h " + nf(m, 2) + "m";

}
function drawStats() {

  background(8, 10, 20);
  drawGrid();

  // =========================
  // TÍTULO
  // =========================
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = "#22D3EE";

  fill("#22D3EE");
  textAlign(CENTER);
  textSize(34);
  text("ESTATÍSTICAS", width/2, 55);

  drawingContext.shadowBlur = 0;

  fill(170);
  textSize(13);
  text("PLAYER PROFILE", width/2, 78);

  // =========================
  // CARDS
  // =========================
  const startX = 90;
  const startY = 115;
  const gap = 20;

  const stats = [
    ["🏆", "RECORDE", highScore],
    ["🪙", "BITS", coins.toLocaleString("pt-BR")],
    ["🍎", "FRUTAS", totalFruits],
    ["🎮", "PARTIDAS", totalGames],
    ["⏱", "TEMPO", formatPlayTime(totalPlayTime)],
    ["⭐", "SKIN", skinNames[currentSkin]]
  ];

  let index = 0;

  for (let row = 0; row < 3; row++) {

    for (let col = 0; col < 2; col++) {

      const x = startX + col * (300 + gap);
      const y = startY + row * 105;

      fill(12, 20, 35, 230);
      stroke("#334155");
      strokeWeight(1.5);

      rect(x, y, 300, 85, 14);

      noStroke();

      fill(255);
      textAlign(LEFT, CENTER);
      textSize(26);
      text(stats[index][0], x + 18, y + 42);

      fill(140);
      textSize(11);
      text(stats[index][1], x + 60, y + 22);

      fill("#22D3EE");
      textSize(22);
      text(stats[index][2], x + 60, y + 48);

      index++;
    }
  }

  // =========================
  // BOTÃO VOLTAR
  // =========================
  drawMenuButton(
    "VOLTAR",
    width/2 - 110,
    575,
    220,
    45,
    "#3B82F6",
    "←"
  );
  
}
function updateAudioVolumes() {

  bgMusic.setVolume(musicVolume);

  sfxEat.setVolume(0.45 * sfxVolume);
  sfxRare.setVolume(0.55 * sfxVolume);
  sfxLegendary.setVolume(0.70 * sfxVolume);
  sfxShield.setVolume(0.60 * sfxVolume);
  sfxGameOver.setVolume(0.75 * sfxVolume);
}

function drawSettings() {

  background(8, 10, 20);

  drawGrid();

  // =========================
  // TÍTULO
  // =========================
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = "#8B5CF6";

  fill("#8B5CF6");
  textAlign(CENTER);
  textSize(34);
  text("CONFIGURAÇÕES", width/2, 55);

  drawingContext.shadowBlur = 0;

  fill(170);
  textSize(13);
  text("SYSTEM SETTINGS", width/2, 78);

  // =========================
  // PAINEL
  // =========================
  const panelX = width/2 - 150;
  const panelW = 300;
  const cardH = 58;

  const items = [
    ["🎵", "MÚSICA", floor(musicVolume * 100) + "%"],
    ["🔊", "EFEITOS", floor(sfxVolume * 100) + "%"],
    ["⚡", "FPS", gameFPS]
  ];

  for (let i = 0; i < items.length; i++) {

    const y = 120 + i * 72;

    // Card
    fill(12, 20, 35, 230);
    stroke("#334155");
    strokeWeight(1.5);
    rect(panelX, y, panelW, cardH, 12);

    noStroke();

    // Ícone
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(24);
    text(items[i][0], panelX + 18, y + 29);

    // Nome
    fill(180);
    textSize(11);
    text(items[i][1], panelX + 55, y + 18);

    // Valor
    fill("#22D3EE");
    textSize(18);
    text(items[i][2], panelX + 240, y + 18);

    // =========================
    // SLIDER
    // =========================

    // Fundo
    fill(40);
    rect(panelX + 55, y + 40, 180, 6, 3);

    // Valor do slider
    let value =
      i === 0 ? musicVolume :
      i === 1 ? sfxVolume :
      gameFPS / 12;

    // Barra preenchida
    fill("#8B5CF6");
    rect(panelX + 55, y + 40, 180 * value, 6, 3);

    // Posição da bolinha
let knobX = panelX + 55 + (180 * value);
let knobY = y + 43;

// Hover
let hover = dist(mouseX, mouseY, knobX, knobY) < 10;

fill(hover ? "#E9D5FF" : 255);
stroke("#8B5CF6");
strokeWeight(hover ? 3 : 2);

ellipse(knobX, knobY, hover ? 16 : 14);

noStroke();
  }

  // =========================
  // BOTÃO VOLTAR
  // =========================
  drawMenuButton(
    "VOLTAR",
    width/2 - 100,
    560,
    200,
    45,
    "#3B82F6",
    "←"
  );
}
function mouseDragged() {

  // Só funciona na tela de configurações
  if (gameState !== "settings") return;

  const panelX = width / 2 - 150;

  for (let i = 0; i < 3; i++) {

    const y = 120 + i * 72;

    // Área do slider
    if (
      mouseY >= y + 34 &&
      mouseY <= y + 50
    ) {

      let value = constrain(
        (mouseX - (panelX + 55)) / 180,
        0,
        1
      );

      if (i === 0) {
        musicVolume = value;
      }

      else if (i === 1) {
        sfxVolume = value;
      }

      else if (i === 2) {
        gameFPS = round(6 + value * 6);
        frameRate(gameFPS);
      }

      updateAudioVolumes();
      saveSettings();
    }
  }
}
function drawPauseOverlay() {

  // Escurece o jogo
  fill(0, 180);
  rect(0, 0, width, height);

  // Painel principal
  fill(15, 25, 40, 240);
  stroke("#22D3EE");
  strokeWeight(2);

  rect(width/2 - 150, 130, 300, 320, 16);

  noStroke();

  // Título
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "#22D3EE";

  fill("#22D3EE");
  textAlign(CENTER);
  textSize(34);
  text("PAUSADO", width/2, 170);

  drawingContext.shadowBlur = 0;

  // Subtítulo
  fill(170);
  textSize(13);
  text("Sistema em espera", width/2, 195);

  // Botões
  drawMenuButton(
    "CONTINUAR",
    width/2 - 100,
    225,
    200,
    42,
    "#22D3EE",
    "▶"
  );

  drawMenuButton(
    "REINICIAR",
    width/2 - 100,
    280,
    200,
    42,
    "#F59E0B",
    "↻"
  );

  drawMenuButton(
    "CONFIGURAÇÕES",
    width/2 - 100,
    335,
    200,
    42,
    "#8B5CF6",
    "⚙"
  );

  drawMenuButton(
    "MENU",
    width/2 - 100,
    390,
    200,
    42,
    "#EF4444",
    "⌂"
  );

  // Rodapé
  fill(120);
  textSize(11);
  text("ESC • Continuar", width/2, 442);
}
function getAchievementProgress(a){

  if(a.type === "score")
    return min(score, a.goal);

  if(a.type === "fruits")
    return min(totalFruits, a.goal);

  if(a.type === "games")
    return min(totalGames, a.goal);

  if(a.type === "coins")
    return min(coins, a.goal);

  if(a.type === "highscore")
    return min(highScore, a.goal);

  if(a.type === "skins")
  return min(unlockedSkins.length, a.goal);

  return 0;
}
function drawGame() {

  background(10, 0, 25);

  push();
  updateShake();

  drawGrid();
  updateLevel();

  // =========================
  // PAUSA
  // =========================
  if (!isPaused) {
    snake.update();
  }

  // =========================
  // MORTE
  // =========================
  if (snake.dead()) {

    // Soma tempo jogado
    totalPlayTime += floor(
      (millis() - gameStartTime) / 1000
    );

    if (score > highScore) {
      highScore = score;
    }

    saveGame();
    saveStats();

    bgMusic.stop();
    sfxGameOver.play();

    drawAchievementPopup();

    pop();

    gameState = "gameover";
    return;
  }

  // =========================
  // ESCUDO
  // =========================
  if (!isPaused) {

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

    // Spawn
    if (!shield && !shieldActive && random(200) < 1) {
      createShield();
    }
  }

  // =========================
  // COMER FRUTA
  // =========================
  if (!isPaused && snake.eat(food)) {

    // NOVA ESTATÍSTICA
    totalFruits++;

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

      unlockAchievement(
        "luckyOne",
        "LUCKY ONE"
      );

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

      checkAchievements();
    }

    if (score > highScore) {
      highScore = score;
    }

    saveGame();
    saveStats();

    createFood();
  }

  // =========================
  // DESENHO
  // =========================
  drawObstacles();
  drawFood();
  drawShield();

  if (!isPaused) {
    updateParticles();
    updateFloatingTexts();
  }

  snake.show();
  drawHUD();

  drawAchievementPopup();

  // =========================
  // MENU PAUSA
  // =========================
  if (isPaused) {
    drawPauseOverlay();
  }

  pop();
}
function mousePressed() {

  // ======================================
  // MENU
  // ======================================
  if (gameState === "menu") {

    // ⚙ CONFIGURAÇÕES
    if (
      mouseX >= 15 && mouseX <= 50 &&
      mouseY >= 15 && mouseY <= 50
    ) {
      previousState = "menu";
      gameState = "settings";
      return;
    }

    // ▶ JOGAR
    if (
      mouseX >= width/2 - 120 &&
      mouseX <= width/2 + 120 &&
      mouseY >= 200 &&
      mouseY <= 250
    ) {
      startGame();
      return;
    }

    // 🎨 SKINS
    if (
      mouseX >= width/2 - 120 &&
      mouseX <= width/2 + 120 &&
      mouseY >= 270 &&
      mouseY <= 320
    ) {
      gameState = "skins";
      return;
    }
    // 🏆 CONQUISTAS
if (
  mouseX >= width/2 - 120 &&
  mouseX <= width/2 + 120 &&
  mouseY >= 410 &&
  mouseY <= 460
) {
  resetAchievementAnimation();
  gameState = "achievements";
  return;
}

    // 📊 ESTATÍSTICAS
    if (
      mouseX >= width/2 - 120 &&
      mouseX <= width/2 + 120 &&
      mouseY >= 340 &&
      mouseY <= 390
    ) {
      gameState = "stats";
      return;
    }
  }

  // ======================================
  // ESTATÍSTICAS
  // ======================================
  else if (gameState === "stats") {

    if (
      mouseX >= width/2 - 100 &&
      mouseX <= width/2 + 100 &&
      mouseY >= 560 &&
      mouseY <= 605
    ) {
      gameState = "menu";
      return;
    }
  }

  // ======================================
// CONQUISTAS
// ======================================
else if (gameState === "achievements") {

  // VOLTAR
  if (
    mouseX >= width/2 - 100 &&
    mouseX <= width/2 + 100 &&
    mouseY >= 560 &&
    mouseY <= 605
  ) {
    gameState = "menu";
    return;
  }

}
  // ======================================
  // CONFIGURAÇÕES
  // ======================================
  else if (gameState === "settings") {

    const panelX = width/2 - 150;

    // SLIDERS
    for (let i = 0; i < 3; i++) {

      const y = 120 + i * 72;

      if (
        mouseX >= panelX + 55 &&
        mouseX <= panelX + 235 &&
        mouseY >= y + 34 &&
        mouseY <= y + 50
      ) {

        let value = constrain(
          (mouseX - (panelX + 55)) / 180,
          0,
          1
        );

        if (i === 0) musicVolume = value;
        else if (i === 1) sfxVolume = value;
        else if (i === 2) {
          gameFPS = round(6 + value * 6);
          frameRate(gameFPS);
        }

        updateAudioVolumes();
        saveSettings();
        return;
      }
    }

    // ← VOLTAR
    if (
      mouseX >= width/2 - 100 &&
      mouseX <= width/2 + 100 &&
      mouseY >= 560 &&
      mouseY <= 605
    ) {

      if (previousState === "pause") {
        gameState = "playing";
        isPaused = true;
      } else {
        gameState = "menu";
      }

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

    // ← VOLTAR
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

    // Comprar / Equipar
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
  // PAUSA
  // ======================================
  else if (gameState === "playing" && isPaused) {

    // ▶ CONTINUAR
    if (
      mouseX >= width/2 - 100 &&
      mouseX <= width/2 + 100 &&
      mouseY >= 225 &&
      mouseY <= 267
    ) {
      isPaused = false;
      bgMusic.play();
      return;
    }

    // ↻ REINICIAR
    if (
      mouseX >= width/2 - 100 &&
      mouseX <= width/2 + 100 &&
      mouseY >= 280 &&
      mouseY <= 322
    ) {
      isPaused = false;
      bgMusic.stop();
      startGame();
      return;
    }

    // ⚙ CONFIGURAÇÕES
    if (
      mouseX >= width/2 - 100 &&
      mouseX <= width/2 + 100 &&
      mouseY >= 335 &&
      mouseY <= 377
    ) {
      previousState = "pause";
      gameState = "settings";
      return;
    }

    // ⌂ MENU
    if (
      mouseX >= width/2 - 100 &&
      mouseX <= width/2 + 100 &&
      mouseY >= 390 &&
      mouseY <= 432
    ) {
      isPaused = false;
      bgMusic.stop();
      gameState = "menu";
      return;
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

  const cx = shield.x + scaleSize / 2;
  const cy = shield.y + scaleSize / 2;

  drawingContext.shadowBlur = 28;
  drawingContext.shadowColor = "#22D3EE";

  // Aura externa
  noStroke();
  fill(34, 211, 238, 45);
  ellipse(cx, cy, scaleSize + 10);

  // Hexágono
  fill("#22D3EE");

  beginShape();

  for (let i = 0; i < 6; i++) {

    let angle = TWO_PI / 6 * i - PI / 6;

    vertex(
      cx + cos(angle) * 11,
      cy + sin(angle) * 11
    );

  }

  endShape(CLOSE);

  // Núcleo
  fill("#E0F7FF");
  ellipse(cx, cy, 7);

  // Reset
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";

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

  const cx = food.x + scaleSize / 2;
  const cy = food.y + scaleSize / 2;

  noStroke();

  // =========================
  // ☀️ LENDÁRIA
  // =========================
  if (legendaryFood) {

    const pulse = sin(frameCount * 0.15) * 3;
    const rot = frameCount * 0.03;
    const floatY = sin(frameCount * 0.08) * 2;

    push();

    translate(cx, cy + floatY);

    drawingContext.shadowBlur = 42+ pulse;
    drawingContext.shadowColor = "#FFD700";

    // Aura
    noStroke();
    fill(255, 215, 0, 35);
    ellipse(0, 0, 34 + pulse);

    fill(255, 215, 0, 70);
    ellipse(0, 0, 24 + pulse);

    // Anel giratório
    push();
    rotate(rot);

    stroke("#FFD700");
    strokeWeight(2);
    noFill();
    ellipse(0, 0, 28);

    line(-14, 0, 14, 0);
    line(0, -14, 0, 14);

    pop();

    // Raios
    stroke("#FFE066");
    strokeWeight(2);

    for (let i = 0; i < 8; i++) {
      const a = TWO_PI / 8 * i + rot;
      line(
        cos(a) * 14,
        sin(a) * 14,
        cos(a) * 20,
        sin(a) * 20
      );
    }

    // Núcleo
    noStroke();
    fill("#FFF8DC");
    ellipse(0, 0, 12 + pulse * 0.3);

    fill("#FFFFFF");
    ellipse(0, 0, 5);

    pop();
  }

  // =========================
  // 🫐 RARA
  // =========================
  else if (rareFood) {

    drawingContext.shadowBlur = 22;
    drawingContext.shadowColor = "#7C3AED";

    fill("#8B5CF6");
    ellipse(cx, cy, 15);

    fill(255, 255, 255, 180);
    ellipse(cx - 3, cy - 3, 4);

    fill("#22C55E");
    ellipse(cx + 3, cy - 8, 6, 3);
  }

  // =========================
  // 🍎 COMUM
  // =========================
  else {

    drawingContext.shadowBlur = 18;
    drawingContext.shadowColor = "#EF4444";

    fill("#EF4444");
    ellipse(cx - 3, cy, 10, 12);
    ellipse(cx + 3, cy, 10, 12);
    ellipse(cx, cy + 2, 13, 10);

    stroke("#6B3E26");
    strokeWeight(2);
    line(cx, cy - 8, cx, cy - 12);

    noStroke();

    fill("#22C55E");
    ellipse(cx + 4, cy - 9, 6, 3);

    fill(255, 255, 255, 160);
    ellipse(cx - 4, cy - 2, 3);
  }

  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = "transparent";
  strokeWeight(1);
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

  const GAME_HEIGHT = height - HUD_HEIGHT;

  let cols = floor(width / scaleSize);
  let rows = floor(GAME_HEIGHT / scaleSize);

  // =========================
  // RESET
  // =========================

  rareFood = false;
  legendaryFood = false;

  // =========================
  // DEBUG MODE
  // Tecla L força a próxima fruta lendária
  // =========================

  if (forceLegendary) {

    legendaryFood = true;
    forceLegendary = false;

  } else {

    let chance = random(100);

    if (chance < 3) {

      legendaryFood = true;

    } else if (chance < 15) {

      rareFood = true;

    }

  }

  // =========================
  // GERAR POSIÇÃO
  // =========================

  while (true) {

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
  // PAUSAR / CONTINUAR (ESC)
  // ======================================
  if (keyCode === ESCAPE) {

    // Pausa durante a partida
    if (gameState === "playing") {

      isPaused = !isPaused;

      if (isPaused) {
        bgMusic.pause();
      } else {
        bgMusic.play();
      }

      return false; // evita sair da tela cheia
    }
// Voltar das configurações
if (
  keyCode === ESCAPE &&
  gameState === "settings"
) {
  gameState = "menu";
  return false;
}
    // Voltar da loja
    if (gameState === "skins") {
      gameState = "menu";
      return false;
    }

    // Voltar das estatísticas
    if (gameState === "stats") {
      gameState = "menu";
      return false;
    }
  }

  // ======================================
  // REINICIAR (GAME OVER)
  // ======================================
  if (
    gameState === "gameover" &&
    (key === "r" || key === "R")
  ) {
    startGame();
    return;
  }

  // ======================================
  // MOVIMENTO DA COBRA
  // (desativado quando pausado)
  // ======================================
  if (gameState === "playing" && !isPaused) {

    if (keyCode === UP_ARROW && snake.ydir !== 1) {
      snake.dir(0, -1);
    }

    else if (keyCode === DOWN_ARROW && snake.ydir !== -1) {
      snake.dir(0, 1);
    }

    else if (keyCode === LEFT_ARROW && snake.xdir !== 1) {
      snake.dir(-1, 0);
    }

    else if (keyCode === RIGHT_ARROW && snake.xdir !== -1) {
      snake.dir(1, 0);
    }
  }

  // ======================================
  // ATALHOS DA LOJA
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

    return;
  }

  // ======================================
  // DEBUG MODE
  // ======================================
  if (debugMode && gameState === "playing") {

    // P = +100 Score +1000 Bits
    if (key === "p" || key === "P") {

      score += 100;
      coins += 1000;

      checkAchievements();
      saveGame();
      saveStats();
    }

    // L = Força fruta lendária
    if (key === "l" || key === "L") {

      forceLegendary = true;
      createFood();
    }

    // B = Desbloqueia todas as skins
    if (key === "b" || key === "B") {

      unlockedSkins = skinCards.map(s => s.id);

      checkAchievements();
      saveGame();
    }
  }
}// ← ESTA CHAVE FECHA A keyPressed()

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