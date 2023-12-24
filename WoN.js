function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[currentIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function spin() {
  wheel.play();
  const box = document.getElementById("box");
  const element = document.getElementById("mainbox");
  let SelectedItem = "";

  let start = shuffle([1890, 2250, 2610]); // -130
  let eighty = shuffle([1760, 2120, 2480]); // 80
  let tryAgain = shuffle([1770, 2130, 2490]); // 40
  let fifty = shuffle([1810, 2170, 2530]); // -65
  let sixty = shuffle([1745, 2105, 2465]); // 120
  let ninety = shuffle([1630, 1990, 2350]); // -260
  let twenty = shuffle([1370, 1730, 2090]); // 100
  let oneHundred = shuffle([1470, 1830, 2190]);

  let results = shuffle([
    start[0],
    eighty[0],
    tryAgain[0],
    fifty[0],
    sixty[0],
    ninety[0],
    twenty[0],
    oneHundred[0],
  ]);

  if (eighty.includes(results[0])) SelectedItem = "50.00";
  if (fifty.includes(results[0])) SelectedItem = "100.00";
  if (sixty.includes(results[0])) SelectedItem = "50.00";
  if (ninety.includes(results[0])) SelectedItem = "MANO KAY NINONG";
  if (twenty.includes(results[0])) SelectedItem = "100.00";
  if (oneHundred.includes(results[0])) SelectedItem = "100.00";

  box.style.setProperty("transition", "all ease 5s");
  box.style.transform = "rotate(" + results[0] + "deg)";
  element.classList.remove("animate");

  setTimeout(function () {
    element.classList.add("animate");
  }, 5000);

  // if (oneHundred.includes(results[0])) {
  //   SelectedItem = "100.00";
  // }

  // setTimeout(function () {
  //   applause.play();
  //   Swal.fire({
  //     title: SelectedItem,
  //     width: 350,
  //     padding: "2em",
  //     color: "white",
  //     background: "#fff url(nyanCat2.gif)",
  //     backdrop: `
  //             rgba(0,0,123,0.4)
  //             url()
  //             left top
  //             no-repeat
  //           `,
  //   });
  // }, 5500);

  setTimeout(function () {
    if (start.includes(results[0])) {
      SelectedItem = "SPIN AGAIN!";
      fail.play();
    } else if (tryAgain.includes(results[0])) {
      SelectedItem = "TRY AGAIN!";
      fail.play();
    } else {
      applause.play();
    }

    Swal.fire({
      title: SelectedItem,
      width: 350,
      padding: "2em",
      color: "white",
      background: "#fff url(nyanCat2.gif)",
      backdrop: `
          rgba(0,0,123,0.4)
          url()
          left top
          no-repeat
        `,
    });
  }, 5500);

  setTimeout(function () {
    box.style.setProperty("transition", "initial");
    box.style.transform = "rotate(90deg)";
  }, 6000);
}

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = [
  "If you",
  // "You",
  "Like it",
  // "It",
  "Please give",
  // "Give",
  "a Thumbs Up!",
  // ":)",
  "Created by:",

  "@ JphOrq | WhiteUmbrella",
];

const morphTime = 1;
const cooldownTime = 0.8;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();

function buttonWon() {
  location.replace("index.html");
}

function buttonNow() {
  location.replace("index2.html");
}
