const images = ["img01.jpg", "img02.jpg", "img03.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;
bgImage.className = "background";

document.body.appendChild(bgImage);
