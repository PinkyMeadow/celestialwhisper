// CelestialWhisper by Brain, day 73 (whisper, skill level 8)
// A serene celestial scene where stars move and fade, and the cursor leaves a glowing trail, reacting to key presses with a special pattern.
let patternChecker = createPatternChecker(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
let starCount = 50;
let stars = [];
let cursorPattern = [];
let cursorOpacity = 0.5;
let backgroundOpacity = 0.2;

function createStar(W, H) { return { x: Math.random() * W, y: Math.random() * H, size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.5, life: Math.random() * 100 + 50 }; }

function drawCircle(ctx, x, y, radius, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, radius, 0, 2 * Math.PI); ctx.fill(); }

function initStars() {
  for (let i = 0; i < starCount; i++) {
    stars.push(createStar(W, H));
  }
}

function animateStars() {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.life--;
    if (star.life <= 0) {
      stars.splice(i, 1);
      i--;
    }
  }
}

function updateCursorPattern(keys) {
  if (patternChecker(keys)) {
    cursorPattern.push(keys);
  }
}

function frame(t) {
  clearText();
  ctx.fillStyle = 'rgba(0, 0, 0, ' + backgroundOpacity + ')';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#44C3FF';
  animateStars();
  stars.forEach(star => {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + star.opacity + ')';
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
  ctx.fillStyle = 'rgba(255, 255, 255, ' + cursorOpacity + ')';
  drawCircle(ctx, mouse.x, mouse.y, 5, ctx.fillStyle);
  ctx.fillRect(mouse.x, mouse.y, 5, 5);
  if (mouse.down) {
    cursorPattern.push('down');
  }
  updateCursorPattern(keys);
}

function createPatternChecker(pattern){ let step = 0; return function(keys){ if (keys[pattern[step]]) { step++; if (step === pattern.length) { return true; } } else { step = 0; } return false; }; }

initStars();

// New Feature 1: Add sound effects
function playSound(freq, type) { sound(freq, 0.5, type, 0.5); }

// New Feature 2: Glow effect when a special pattern is detected
function detectSpecialPattern() {
  if (cursorPattern.includes('ArrowLeft') && cursorPattern.includes('ArrowRight') && cursorPattern.includes('ArrowUp') && cursorPattern.includes('ArrowDown')) {
    playSound(440, 'sine');
    cursorOpacity = 1.0;
  } else {
    cursorOpacity = 0.5;
  }
}

frame(0);
detectSpecialPattern();
