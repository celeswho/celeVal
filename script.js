import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm';
// import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import anime from 'https://cdn.skypack.dev/animejs';

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const imageDisplay = document.getElementById('imageDisplay');
const valentineQuestion = document.getElementById('valentineQuestion');
const responseButtons = document.getElementById('responseButtons');

// At the top with your other variables
const tsundereQuote = document.getElementById('tsundereQuote');

let noClickCount = 0;
let noScale = 1;
let yesButtonHeight = 56;
let yesButtonWidth = 130;
let yesFontSize = 24;

const imagePaths = [
    './images/image2.gif',
    './images/image3.webp',
    './images/image4.webp',
    './images/image5.gif',
    './images/image6.webp',
    './images/image7.webp',
    './images/cat.gif',
    './images/kity.gif',
    './images/cat2.gif',
    './images/sad.gif',
    './images/cat3.webp',
];

// 1. Define the Meow Music at the top
const meowMusic = new Audio('./sounds/meow.mp3');
meowMusic.loop = true;
meowMusic.volume = 0.5;
let isMeowPlaying = false;

// --- NO BUTTON LOGIC ---
noButton.addEventListener('click', () => {
    // Start the meow music only if it hasn't started yet
    if (!isMeowPlaying) {
        meowMusic
            .play()
            .catch((e) =>
                console.log('Audio play blocked until user interacts'),
            );
        isMeowPlaying = true;
    }

    // HIDE the baka text on the first click
    if (tsundereQuote) {
        tsundereQuote.style.display = 'none';
    }

    noClickCount++;

    // ... rest of your existing logic (image change, button jumping, etc.)
    imageDisplay.src = imagePaths[noClickCount % imagePaths.length];

    // 2. Make Yes button grow (Keep this going forever!)
    yesButtonHeight *= 1.2;
    yesButtonWidth *= 1.2;
    yesFontSize += 5;
    yesButton.style.height = `${yesButtonHeight}px`;
    yesButton.style.width = `${yesButtonWidth}px`;
    yesButton.style.fontSize = `${yesFontSize}px`;

    // 3. Logic: Shrink only until the 4th click
    if (noClickCount < 4) {
        noScale -= 0.1;
    }
    // After 4 clicks, noScale stays exactly where it is.

    // 4. Random Movement (Always happens)
    const maxWidth = window.innerWidth - noButton.offsetWidth - 50;
    const maxHeight = window.innerHeight - noButton.offsetHeight - 50;

    // Ensure the button stays within visible bounds
    const randomX = Math.max(20, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(20, Math.floor(Math.random() * maxHeight));

    noButton.style.position = 'fixed';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.transform = `scale(${noScale})`;

    // 5. Update text
    const messages = [
        'misclicked?',
        'Lag? You meant to click Yes, right?',
        'Try again!!',
        'Baka! (No)', // Click 1
        'Nani?! Are you sure?',
        "Don't be a Tsundere...", // Click 2
        'Ping is too high, try clicking the green one', // Click 8
        'Yamete Kudasai! :(', // Click 3
        'Muri muri muri!', // Click         // Click 7
        'My kokoro is breaking... T_T', // Click 4 (Scale stops here)
        'Top 10 Betrayals Moment!', // Click 5
        'You are so meanie!! 💢', // Click 9
        'Error 404: Heart not found', // Click 10+
    ];
    noButton.textContent = messages[noClickCount % messages.length];
});

const bgMusic = new Audio('./sounds/thoseEyes.mp3');
bgMusic.loop = true;

yesButton.addEventListener('click', () => {
    // STOP the meow music immediately
    meowMusic.pause();
    meowMusic.currentTime = 0;
    const happySound = new Audio('./sounds/happy.mp3');
    happySound.play();

    // Ensure this is in your yesButton click handler
    // Inside your yesButton.addEventListener success logic:
    happySound.onended = () => {
        bgMusic.play();
        bgMusic.volume = 0.5;
        const volumeContainer = document.getElementById('volumeContainer');

        volumeContainer.classList.remove('hidden');
        volumeContainer.classList.add('flex'); // Triggers the layout
    };

    if (tsundereQuote) {
        tsundereQuote.style.display = 'none';
    }

    imageDisplay.style.display = 'none';
    responseButtons.style.display = 'none';

    valentineQuestion.innerHTML = `
  <div class="flex flex-col items-center justify-center animate-fadeIn scale-90 md:scale-100">
    <img src="./images/happy.gif" 
         alt="Celebration Cat" 
         class="mx-auto w-[220px] h-[300px] mb-4 rounded-2xl border-4 border-white shadow-[0_0_15px_rgba(255,182,193,0.6)] object-cover"/>
    
    <div class="bg-black/40 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 max-w-[320px] text-center">
            
      <p class="text-xl font-medium text-pink-200">
        You said yes! (No take-backs) 😋🌸
      </p>
      
      <div class="h-[1px] w-20 bg-white/30 mx-auto my-3"></div>
      
      <p class="text-base text-white/90 font-light">
       You're my favorite arc! Thanks for not being a Baka!
      </p>
      
      <p class="text-2xl mt-4 animate-bounce">
        💖 Mwah Love you! 💖
      </p>
    </div>
  </div>
`;

    // Flower petals / Sakura confetti
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        // A mix of Sakura Pink, White, Lavender, and Hot Pink
        colors: ['#FFB7C5', '#FFD1DC', '#FFFFFF', '#E6E6FA', '#F49AC2'],
        ticks: 300, // Makes the confetti stay on screen longer
        gravity: 0.8, // Makes it fall a bit slower, like real petals
    });
});

function createPetals() {
    const container = document.body;
    // Array of all the flowers they love
    const flowers = ['🌸', '💮', '🌺'];

    for (let i = 0; i < 95; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        // Randomly pick a flower from the list
        const randomFlower =
            flowers[Math.floor(Math.random() * flowers.length)];
        petal.innerText = randomFlower;

        // Randomize position and timing
        petal.style.left = Math.random() * 100 + 'vw';

        // Slower fall for sunflowers/hibiscus makes them feel "heavier" and more realistic
        const fallDuration = Math.random() * 5 + 7 + 's';
        const swayDuration = Math.random() * 2 + 3 + 's';

        petal.style.animationDuration = `${fallDuration}, ${swayDuration}`;
        petal.style.animationDelay = Math.random() * 10 + 's'; // Staggered start

        // Randomize size so some look closer and some look further away
        petal.style.fontSize = Math.random() * 20 + 15 + 'px';

        // // Add a slight blur to some to create depth
        // if (Math.random() > 0.7) {
        //     petal.style.filter = 'blur(1.5px)';
        // }

        container.appendChild(petal);
    }
}

// Call the function to start the flower rain
createPetals();

const muteBtn = document.getElementById('muteBtn');
const volIcon = document.getElementById('volIcon');
const volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', (e) => {
    // Stop the event from "clicking" things behind the slider
    e.stopPropagation();

    const val = parseFloat(e.target.value);
    bgMusic.volume = val;

    // Update icons based on volume level
    if (val === 0) {
        volIcon.innerText = '🔇';
    } else if (val < 0.5) {
        volIcon.innerText = '🔉';
    } else {
        volIcon.innerText = '🔊';
    }

    // Unmute if they slide up from 0
    if (val > 0) bgMusic.muted = false;
});

// Separate Mute Button Logic
muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    bgMusic.muted = !bgMusic.muted;
    volIcon.innerText = bgMusic.muted ? '🔇' : '🔊';
    volumeSlider.style.opacity = bgMusic.muted ? '0.3' : '1';
});


