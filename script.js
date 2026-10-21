/* =========================================================
   EDIT THIS CONFIG
   This is the only place you need to change the name,
   messages, letter, photo paths, captions, memories,
   and music file.

   ADD A PHOTO
   1. Put the file in assets/images/  (jpg, png, or webp)
   2. Copy a line in gallery.photos and edit the path
      and caption.

   ADD OR REMOVE A MEMORY
   Copy or delete an object in timeline.memories.
   Leave date as "" to hide it.
   Example date: "14 March 2025"

   CHANGE THE SONG
   Replace assets/music/birthday-song.mp3
   or change music to another file in assets/music/.

   Captions below describe the photographs that are
   actually in this folder. Rewrite them in your own words.
   ========================================================= */
const CONFIG = {
  name: "Arjun",
  pageTitle: "Happy Birthday, Arjun",
  heroImage: "assets/images/main.jpg",
  music: "assets/music/birthday-song.mp3",

  player: {
    label: "For Arjun"
  },

  welcome: {
    greeting: "Hey Arjun… ❤️",
    subtitle: "Someone has created something special just for you.",
    button: "Open Your Birthday Surprise ✨"
  },

  celebration: {
    kicker: "A birthday made for you",
    line1: "Happy Birthday,",
    line2: "Arjun! 🎂",
    message: "Today is all about you, Arjun. You deserve all the happiness, love, laughter, and beautiful moments this world has to offer. May your special day be as wonderful as you are. ❤️",
    wishButton: "Make a Wish, Arjun ✨",
    wishNote: "This wish is yours, Arjun ✨"
  },

  gallery: {
    title: "Little Moments, Beautiful Memories ❤️",
    intro: "Every picture holds a memory, and every memory has a little piece of happiness in it.",
    photos: [
      { src: "assets/images/main.jpg", caption: "You, the cake, and the candles." },
      { src: "assets/images/photo2.jpg", caption: "Both of your hands on the knife." },
      { src: "assets/images/photo3.jpg", caption: "A kiss on your cheek, one candle still lit." },
      { src: "assets/images/photo4.jpg", caption: "A white cake at the table." },
      { src: "assets/images/photo5.jpg", caption: "You, under the birthday lights." },
      { src: "assets/images/photo6.jpg", caption: "A night on the terrace." },
      { src: "assets/images/photo7.jpg", caption: "Rooftop sunset, close together." },
      { src: "assets/images/photo8.jpg", caption: "A night selfie." },
      { src: "assets/images/photo9.jpg", caption: "A mirror photo before stepping out." },
      { src: "assets/images/photo10.jpg", caption: "Two photographs from the celebration." }
    ]
  },

  timeline: {
    title: "Moments That Deserve to Be Remembered ✨",
    intro: "Photographs worth keeping close.",
    memories: [
      {
        date: "",
        title: "The birthday cake",
        image: "assets/images/main.jpg",
        caption: "Candles lit, with you beside the cake."
      },
      {
        date: "",
        title: "Cutting it together",
        image: "assets/images/photo2.jpg",
        caption: "Two hands on the knife."
      },
      {
        date: "",
        title: "Birthday lights",
        image: "assets/images/photo5.jpg",
        caption: "Black and gold balloons, and a glowing sign behind you."
      },
      {
        date: "",
        title: "At the table",
        image: "assets/images/photo4.jpg",
        caption: "A white cake, a wrapped gift, and candlelight."
      },
      {
        date: "",
        title: "Rooftop sunset",
        image: "assets/images/photo7.jpg",
        caption: "The sky turning gold behind you."
      },
      {
        date: "",
        title: "Night terrace",
        image: "assets/images/photo6.jpg",
        caption: "City lights far away."
      },
      {
        date: "",
        title: "One candle",
        image: "assets/images/photo3.jpg",
        caption: "Outside, with a single flame on the cake."
      }
    ]
  },

  letter: {
    title: "A Little Something for You, Arjun 💌",
    button: "Open Your Letter ❤️",
    text: "Dear Arjun,\n\nToday is your day, and I hope it brings you countless reasons to smile. May this new chapter of your life be filled with happiness, exciting adventures, beautiful memories, and dreams coming true.\n\nNever forget how special you are and how much goodness you deserve in life.\n\nKeep smiling, keep shining, and keep being yourself.\n\nHappy Birthday, Arjun! ❤️🎂\n\nWith lots of love and the warmest wishes."
  },

  finale: {
    title: "Once Again, Happy Birthday, Arjun! ❤️",
    message: "May your smile never fade, your heart always find happiness, and your life be filled with moments worth remembering. Here's to another beautiful year of being YOU! ✨",
    button: "Celebrate Again 🎉",
    images: [
      "assets/images/main.jpg",
      "assets/images/photo5.jpg",
      "assets/images/photo7.jpg",
      "assets/images/photo8.jpg",
      "assets/images/photo3.jpg"
    ]
  }
};

const COLORS = ["#f3d48a", "#e7a0c0", "#c9b6ff", "#fff6ee", "#ff8fb8", "#d4af37", "#f7c1d9"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const narrowScreen = window.matchMedia("(max-width: 700px)").matches;

const sky = document.getElementById("sky");
const fx = document.getElementById("fx");
const ctxSky = sky.getContext("2d");
const ctxFx = fx.getContext("2d");
const audio = document.getElementById("bgm");

const particles = [];
const rockets = [];
let musicBroken = false;
let opened = false;
let wishing = false;
let lbIndex = 0;
let lastFocus = null;
let shot = null;

const stars = Array.from({ length: reducedMotion ? 40 : 110 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.35 + 0.25,
  p: Math.random() * Math.PI * 2,
  s: 0.5 + Math.random() * 1.6,
  gold: Math.random() > 0.86
}));

const dust = Array.from({ length: reducedMotion ? 0 : 26 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 1.5 + 0.4,
  v: 0.00012 + Math.random() * 0.00035
}));

function $(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const el = $(id);
  if (!el || value == null) return;
  const text = String(value);
  const match = text.match(/^(.*?)(\s*(?:\p{Extended_Pictographic}\uFE0F?)+)\s*$/u);
  if (!match) {
    el.textContent = text;
    return;
  }
  el.replaceChildren(document.createTextNode(match[1].trimEnd()));
  const icon = document.createElement("span");
  icon.className = "emoji";
  icon.textContent = ` ${match[2].trim()}`;
  el.append(icon);
}

function setInert(el, on) {
  if (!el) return;
  if ("inert" in el) el.inert = on;
  if (on) el.setAttribute("inert", "");
  else el.removeAttribute("inert");
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function captionFor(src) {
  const found = CONFIG.gallery.photos.find((photo) => photo.src === src);
  return found && found.caption ? found.caption : "A photograph of Arjun";
}

function applyCopy() {
  document.title = CONFIG.pageTitle;
  setText("welcome-greeting", CONFIG.welcome.greeting);
  setText("welcome-subtitle", CONFIG.welcome.subtitle);
  setText("open-surprise", CONFIG.welcome.button);
  setText("hero-kicker", CONFIG.celebration.kicker);
  setText("hero-line-1", CONFIG.celebration.line1);
  setText("hero-line-2", CONFIG.celebration.line2);
  setText("hero-message", CONFIG.celebration.message);
  setText("wish-btn", CONFIG.celebration.wishButton);
  setText("gallery-title", CONFIG.gallery.title);
  setText("gallery-intro", CONFIG.gallery.intro);
  setText("journey-title", CONFIG.timeline.title);
  setText("journey-intro", CONFIG.timeline.intro);
  setText("letter-title", CONFIG.letter.title);
  setText("open-letter", CONFIG.letter.button);
  setText("finale-title", CONFIG.finale.title);
  setText("finale-message", CONFIG.finale.message);
  setText("again-btn", CONFIG.finale.button);
  setText("track-label", CONFIG.player.label);
}

function mountCake(targetId, small) {
  const host = $(targetId);
  const piece = $("cake-template").content.cloneNode(true);
  if (small) piece.querySelector(".cake").classList.add("cake-sm");
  host.appendChild(piece);
}

function renderGallery() {
  const grid = $("gallery-grid");
  if (!CONFIG.gallery.photos.length) {
    const empty = document.createElement("p");
    empty.className = "missing-note";
    empty.textContent = "Add photos in the CONFIG section of script.js.";
    grid.appendChild(empty);
    return;
  }

  CONFIG.gallery.photos.forEach((photo, index) => {
    const card = document.createElement("figure");
    card.className = "photo-card reveal";
    card.style.setProperty("--d", `${(index % 8) * 60}ms`);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-open";
    button.setAttribute("aria-label", photo.caption || `Open photo ${index + 1}`);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || `Photo ${index + 1}`;
    img.decoding = "async";
    img.loading = index < 3 ? "eager" : "lazy";
    img.addEventListener("error", () => {
      photo.missing = true;
      card.classList.add("is-missing");
      img.alt = "Photo not found";
      const note = document.createElement("p");
      note.className = "missing-note";
      note.textContent = "Photo not found. Check the file name in script.js.";
      card.appendChild(note);
    });

    button.appendChild(img);
    button.addEventListener("click", () => {
      if (!photo.missing) openLightbox(index);
    });
    card.appendChild(button);

    if (photo.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = photo.caption;
      card.appendChild(caption);
    }
    grid.appendChild(card);
  });
}

function renderTimeline() {
  const root = $("timeline");
  CONFIG.timeline.memories.forEach((memory, index) => {
    const item = document.createElement("article");
    item.className = "memory reveal";
    item.style.setProperty("--d", `${(index % 4) * 80}ms`);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-open";

    const img = document.createElement("img");
    img.src = memory.image;
    img.alt = memory.caption || memory.title || "A photograph of Arjun";
    img.decoding = "async";
    img.loading = "lazy";
    img.addEventListener("error", () => item.remove());

    const copy = document.createElement("span");
    copy.className = "memory-copy";
    if (memory.date) {
      const date = document.createElement("p");
      date.className = "memory-date";
      date.textContent = memory.date;
      copy.appendChild(date);
    }
    if (memory.title) {
      const title = document.createElement("h3");
      title.textContent = memory.title;
      copy.appendChild(title);
    }
    if (memory.caption) {
      const caption = document.createElement("p");
      caption.textContent = memory.caption;
      copy.appendChild(caption);
    }

    button.appendChild(img);
    button.appendChild(copy);
    button.addEventListener("click", () => {
      const galleryIndex = CONFIG.gallery.photos.findIndex((photo) => photo.src === memory.image && !photo.missing);
      if (galleryIndex >= 0) openLightbox(galleryIndex);
    });
    item.appendChild(button);
    root.appendChild(item);
  });
}

function renderLetter() {
  const body = $("letter-body");
  CONFIG.letter.text.trim().split(/\n\s*\n/).forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph.trim();
    body.appendChild(p);
  });
}

function renderFinale() {
  const wrap = $("finale-collage");
  CONFIG.finale.images.forEach((src) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = src;
    img.alt = captionFor(src);
    img.addEventListener("error", () => figure.remove());
    figure.appendChild(img);
    wrap.appendChild(figure);
  });
}

function renderHeroPhoto() {
  const img = $("hero-photo");
  img.src = CONFIG.heroImage;
  img.alt = "Arjun on his birthday";
  $("hero-wash").style.backgroundImage = `url("${CONFIG.heroImage}")`;
  img.addEventListener("error", () => {
    img.closest(".hero-frame").hidden = true;
  });
}

function spawnDrift(root, count) {
  for (let i = 0; i < count; i += 1) {
    const heart = i % 5 !== 0;
    const el = document.createElement("span");
    el.className = heart ? "floater heart" : "floater petal";
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${12 + Math.random() * 14}s`;
    el.style.animationDelay = `${-Math.random() * 18}s`;
    el.style.setProperty("--drift", `${Math.round(Math.random() * 90 - 45)}px`);
    el.style.setProperty("--spin", heart ? `${Math.round(Math.random() * 40 - 20)}deg` : `${180 + Math.round(Math.random() * 220)}deg`);
    el.style.setProperty("--o", (0.35 + Math.random() * 0.45).toFixed(2));
    if (heart) {
      el.textContent = "♥";
      el.style.color = pick(["#e7a0c0", "#f3d48a", "#c9b6ff", "#ff8fb8"]);
      el.style.fontSize = `${12 + Math.round(Math.random() * 16)}px`;
    }
    root.appendChild(el);
  }
}

function burstHearts(container) {
  if (!container || reducedMotion) return;
  const total = narrowScreen ? 10 : 16;
  for (let i = 0; i < total; i += 1) {
    const bit = document.createElement("span");
    bit.className = "burst";
    bit.textContent = i % 2 ? "♥" : "✦";
    bit.style.color = pick(COLORS);
    const angle = (Math.PI * 2 * i) / total;
    const dist = 70 + Math.random() * 110;
    bit.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    bit.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
    container.appendChild(bit);
    window.setTimeout(() => bit.remove(), 1300);
  }
}

function sizeCanvases() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  [sky, fx].forEach((canvas) => {
    const ctx = canvas === sky ? ctxSky : ctxFx;
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  });
}

function drawConstellation(w, h, now) {
  if (w < 780 || reducedMotion) return;
  const cx = w * 0.14;
  const cy = h * 0.16;
  const scale = Math.min(w, h) * 0.0036;
  const pts = [];
  const count = 16;
  for (let i = 0; i < count; i += 1) {
    const t = (Math.PI * 2 * i) / count;
    const x = 16 * Math.sin(t) ** 3;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push([cx + x * scale, cy + y * scale]);
  }
  ctxSky.beginPath();
  pts.forEach(([x, y], i) => (i ? ctxSky.lineTo(x, y) : ctxSky.moveTo(x, y)));
  ctxSky.closePath();
  ctxSky.strokeStyle = "rgba(243, 212, 138, 0.28)";
  ctxSky.lineWidth = 1;
  ctxSky.stroke();
  pts.forEach(([x, y], i) => {
    const twinkle = 0.35 + Math.abs(Math.sin(now / 700 + i)) * 0.65;
    ctxSky.fillStyle = `rgba(255, 236, 190, ${twinkle})`;
    ctxSky.beginPath();
    ctxSky.arc(x, y, 1.6, 0, Math.PI * 2);
    ctxSky.fill();
  });
}

function drawSky(now) {
  const w = sky.clientWidth;
  const h = sky.clientHeight;
  ctxSky.clearRect(0, 0, w, h);
  drawConstellation(w, h, now);
  stars.forEach((star) => {
    const twinkle = 0.25 + Math.abs(Math.sin(now / 1000 * star.s + star.p)) * 0.75;
    ctxSky.fillStyle = star.gold
      ? `rgba(243, 212, 138, ${twinkle})`
      : `rgba(255, 246, 232, ${twinkle})`;
    ctxSky.beginPath();
    ctxSky.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
    ctxSky.fill();
  });
  dust.forEach((bit) => {
    bit.y -= bit.v;
    if (bit.y < 0) bit.y = 1;
    ctxSky.fillStyle = "rgba(243, 212, 138, 0.45)";
    ctxSky.beginPath();
    ctxSky.arc(bit.x * w, bit.y * h, bit.r, 0, Math.PI * 2);
    ctxSky.fill();
  });
  if (!shot && !reducedMotion && Math.random() < 0.0014) {
    shot = {
      x: Math.random() * w * 0.75,
      y: Math.random() * h * 0.35,
      life: 1
    };
  }
  if (shot) {
    shot.x += 7;
    shot.y += 3.2;
    shot.life -= 0.02;
    ctxSky.strokeStyle = `rgba(255, 246, 230, ${Math.max(shot.life, 0)})`;
    ctxSky.lineWidth = 1.6;
    ctxSky.beginPath();
    ctxSky.moveTo(shot.x, shot.y);
    ctxSky.lineTo(shot.x - 28, shot.y - 12);
    ctxSky.stroke();
    if (shot.life <= 0) shot = null;
  }
}

function pushParticle(particle) {
  particles.push(particle);
  if (particles.length > 480) particles.splice(0, particles.length - 480);
}

function launchRocket() {
  const w = fx.clientWidth;
  const h = fx.clientHeight;
  rockets.push({
    x: w * (0.15 + Math.random() * 0.7),
    y: h + 6,
    vy: -(3.1 + Math.random() * 1.5),
    target: h * (0.12 + Math.random() * 0.36),
    color: pick(COLORS),
    tick: 0
  });
}

function explode(x, y, color) {
  const count = reducedMotion ? 18 : 62;
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.12;
    const speed = 0.7 + Math.random() * 2.7;
    pushParticle({
      kind: "spark",
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.01 + Math.random() * 0.012,
      color: Math.random() > 0.18 ? color : "#fff8ee",
      size: 1.4 + Math.random() * 1.7,
      gravity: 0.012
    });
  }
}

function burstConfetti(amount) {
  const w = fx.clientWidth;
  const count = reducedMotion ? 16 : amount;
  for (let i = 0; i < count; i += 1) {
    pushParticle({
      kind: "confetti",
      x: w * (0.08 + Math.random() * 0.84),
      y: -12 - Math.random() * 80,
      vx: -1.4 + Math.random() * 2.8,
      vy: 1.4 + Math.random() * 2.4,
      w: 5 + Math.random() * 6,
      h: 8 + Math.random() * 7,
      rot: Math.random() * 6,
      vr: -0.18 + Math.random() * 0.36,
      life: 1,
      decay: 0.0035 + Math.random() * 0.002,
      color: pick(COLORS),
      gravity: 0.018
    });
  }
}

function celebrate(options) {
  const settings = options || {};
  const rocketsToFire = settings.rockets == null ? 6 : settings.rockets;
  const confetti = settings.confetti == null ? 80 : settings.confetti;
  for (let i = 0; i < rocketsToFire; i += 1) {
    window.setTimeout(() => launchRocket(), i * 240);
  }
  burstConfetti(confetti);
}

function drawFx() {
  const w = fx.clientWidth;
  const h = fx.clientHeight;
  ctxFx.clearRect(0, 0, w, h);

  for (let i = rockets.length - 1; i >= 0; i -= 1) {
    const rocket = rockets[i];
    rocket.y += rocket.vy;
    rocket.tick += 1;
    if (rocket.tick % 2 === 0) {
      pushParticle({
        kind: "spark",
        x: rocket.x,
        y: rocket.y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 1.1,
        life: 0.45,
        decay: 0.03,
        color: rocket.color,
        size: 2,
        gravity: 0
      });
    }
    ctxFx.globalAlpha = 1;
    ctxFx.fillStyle = "#fff4d2";
    ctxFx.beginPath();
    ctxFx.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
    ctxFx.fill();
    if (rocket.y <= rocket.target) {
      explode(rocket.x, rocket.y, rocket.color);
      rockets.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const bit = particles[i];
    bit.x += bit.vx;
    bit.y += bit.vy;
    bit.vy += bit.gravity || 0;
    bit.life -= bit.decay;
    if (bit.kind === "confetti") bit.rot += bit.vr;
    if (bit.life <= 0 || bit.y > h + 40) {
      particles.splice(i, 1);
      continue;
    }
    ctxFx.globalAlpha = Math.max(bit.life, 0);
    ctxFx.fillStyle = bit.color;
    if (bit.kind === "confetti") {
      ctxFx.save();
      ctxFx.translate(bit.x, bit.y);
      ctxFx.rotate(bit.rot);
      ctxFx.fillRect(-bit.w / 2, -bit.h / 2, bit.w, bit.h);
      ctxFx.restore();
    } else {
      ctxFx.beginPath();
      ctxFx.arc(bit.x, bit.y, bit.size, 0, Math.PI * 2);
      ctxFx.fill();
    }
  }
  ctxFx.globalAlpha = 1;
}

function frame(now) {
  drawSky(now);
  drawFx();
  window.requestAnimationFrame(frame);
}

function setHint(message) {
  setText("track-hint", message);
}

function syncPlayer() {
  const playing = !audio.paused;
  $("player").classList.toggle("is-playing", playing && !audio.muted && !musicBroken);
  const playIcon = $("play-toggle").querySelector(".icon-play");
  const pauseIcon = $("play-toggle").querySelector(".icon-pause");
  const volIcon = $("mute-toggle").querySelector(".icon-vol");
  const muteIcon = $("mute-toggle").querySelector(".icon-mute");
  playIcon.hidden = playing;
  pauseIcon.hidden = !playing;
  volIcon.hidden = audio.muted;
  muteIcon.hidden = !audio.muted;
  $("play-toggle").setAttribute("aria-label", playing ? "Pause music" : "Play music");
  $("mute-toggle").setAttribute("aria-label", audio.muted ? "Unmute music" : "Mute music");
  if (!musicBroken) setHint(playing ? (audio.muted ? "Muted" : "Playing") : "Paused");
}

function markMusicMissing() {
  musicBroken = true;
  $("player").classList.add("is-missing");
  $("play-toggle").disabled = true;
  $("mute-toggle").disabled = true;
  setHint("Add birthday-song.mp3 to assets/music");
}

function startMusic() {
  if (musicBroken) return;
  const pending = audio.play();
  if (pending && typeof pending.then === "function") {
    pending.then(syncPlayer).catch(() => {
      setHint("Tap play to start the music");
      syncPlayer();
    });
  } else {
    syncPlayer();
  }
}

function setupMusic() {
  audio.loop = true;
  audio.volume = 0.82;
  audio.src = CONFIG.music;
  audio.addEventListener("error", markMusicMissing);
  audio.addEventListener("play", syncPlayer);
  audio.addEventListener("pause", syncPlayer);
  audio.addEventListener("volumechange", syncPlayer);
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });

  $("play-toggle").addEventListener("click", () => {
    if (musicBroken) return;
    if (audio.paused) {
      audio.play().catch(() => setHint("Tap play to start the music"));
    } else {
      audio.pause();
    }
  });

  $("mute-toggle").addEventListener("click", () => {
    if (musicBroken) return;
    audio.muted = !audio.muted;
    syncPlayer();
  });
}

function revealSite() {
  document.body.classList.add("is-open");
  document.body.classList.remove("no-scroll");
  setInert($("welcome"), true);
  $("welcome").setAttribute("aria-hidden", "true");
  setInert($("site"), false);
  setInert($("nav"), false);
  setInert($("player"), false);
  celebrate({ rockets: reducedMotion ? 2 : 4, confetti: reducedMotion ? 20 : 64 });
  const title = $("hero-title");
  if (title) title.focus({ preventScroll: true });
}

function openSurprise() {
  if (opened) return;
  opened = true;
  startMusic();
  $("welcome").classList.add("is-opening");
  burstHearts(document.querySelector(".welcome-inner"));
  window.setTimeout(() => burstHearts(document.querySelector(".welcome-inner")), reducedMotion ? 0 : 680);
  window.setTimeout(revealSite, reducedMotion ? 180 : 1750);
}

function makeWish() {
  if (wishing) return;
  wishing = true;
  document.querySelectorAll(".cake").forEach((cake) => cake.classList.add("is-out"));
  const note = $("wish-note");
  note.textContent = CONFIG.celebration.wishNote;
  note.classList.add("is-on");
  celebrate({ rockets: reducedMotion ? 3 : 7, confetti: reducedMotion ? 24 : 110 });
  window.setTimeout(() => {
    document.querySelectorAll(".cake").forEach((cake) => cake.classList.remove("is-out"));
    note.classList.remove("is-on");
    wishing = false;
  }, 2800);
}

function playLetter() {
  const envelope = $("envelope");
  const paper = $("letter-paper");
  envelope.classList.remove("is-open");
  void envelope.offsetWidth;
  envelope.classList.add("is-open");
  paper.hidden = false;
  void paper.offsetWidth;
  paper.querySelectorAll("p").forEach((paragraph, index) => {
    paragraph.classList.remove("is-writing");
    void paragraph.offsetWidth;
    paragraph.style.animationDelay = `${0.18 + index * 0.28}s`;
    paragraph.classList.add("is-writing");
  });
  burstHearts($("letter-stage"));
  window.setTimeout(() => {
    paper.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  }, reducedMotion ? 0 : 460);
}

function fitLightbox() {
  const img = $("lb-img");
  const naturalWidth = img.naturalWidth || 480;
  const naturalHeight = img.naturalHeight || 640;
  const maxWidth = Math.min(window.innerWidth * 0.86, naturalWidth * 1.7, 980);
  const maxHeight = window.innerHeight * 0.72;
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
  img.style.width = `${Math.max(120, Math.round(naturalWidth * scale))}px`;
  img.style.height = "auto";
}

function showLightboxImage() {
  const photos = CONFIG.gallery.photos;
  const photo = photos[lbIndex];
  const img = $("lb-img");
  img.alt = photo.caption || "Photo";
  setText("lb-cap", photo.caption || "");
  setText("lb-count", `${lbIndex + 1} / ${photos.length}`);
  img.onload = fitLightbox;
  img.src = photo.src;
  if (img.complete) fitLightbox();
  const total = photos.length;
  [-1, 1].forEach((dir) => {
    const neighbor = photos[(lbIndex + dir + total) % total];
    if (neighbor && !neighbor.missing) {
      const preload = new Image();
      preload.src = neighbor.src;
    }
  });
}

function lockScroll() {
  lockScroll.y = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockScroll.y}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
}

function unlockScroll() {
  const y = lockScroll.y || 0;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  window.scrollTo(0, y);
}

function openLightbox(index) {
  if (CONFIG.gallery.photos[index] && CONFIG.gallery.photos[index].missing) return;
  lastFocus = document.activeElement;
  lbIndex = index;
  showLightboxImage();
  $("lightbox").hidden = false;
  lockScroll();
  $("lb-close").focus();
}

function closeLightbox() {
  $("lightbox").hidden = true;
  unlockScroll();
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

function stepLightbox(direction) {
  const photos = CONFIG.gallery.photos;
  const total = photos.length;
  if (!total) return;
  let next = lbIndex;
  for (let i = 0; i < total; i += 1) {
    next = (next + direction + total) % total;
    if (!photos[next].missing) break;
  }
  lbIndex = next;
  showLightboxImage();
}

function setupLightbox() {
  $("lb-prev").addEventListener("click", () => stepLightbox(-1));
  $("lb-next").addEventListener("click", () => stepLightbox(1));
  $("lb-close").addEventListener("click", closeLightbox);
  $("lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") closeLightbox();
  });
  let touchStartX = 0;
  $("lightbox").addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  $("lightbox").addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 48) stepLightbox(delta < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener("keydown", (event) => {
    if ($("lightbox").hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") stepLightbox(1);
    if (event.key === "ArrowLeft") stepLightbox(-1);
  });
  window.addEventListener("resize", () => {
    if (!$("lightbox").hidden) fitLightbox();
  });
}

function setupScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -48% 0px", threshold: 0.01 });
  sections.forEach((section) => spy.observe(section));
}

function setupReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  nodes.forEach((node) => observer.observe(node));
}

function setupParallax() {
  if (reducedMotion) return;
  const wash = $("hero-wash");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      wash.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      ticking = false;
    });
  }, { passive: true });
}

function init() {
  applyCopy();
  mountCake("hero-cake", false);
  mountCake("finale-cake", true);
  renderHeroPhoto();
  renderGallery();
  renderTimeline();
  renderLetter();
  renderFinale();
  setupMusic();
  spawnDrift($("drift"), reducedMotion ? 0 : (narrowScreen ? 8 : 16));
  spawnDrift($("welcome-drift"), reducedMotion ? 0 : (narrowScreen ? 8 : 14));
  sizeCanvases();
  window.addEventListener("resize", sizeCanvases);
  window.requestAnimationFrame(frame);

  $("open-surprise").addEventListener("click", openSurprise);
  $("wish-btn").addEventListener("click", makeWish);
  $("open-letter").addEventListener("click", playLetter);
  $("again-btn").addEventListener("click", () => {
    makeWish();
    window.setTimeout(() => {
      $("celebration").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, reducedMotion ? 0 : 650);
  });

  setupLightbox();
  setupScrollSpy();
  setupReveals();
  setupParallax();
}

init();
