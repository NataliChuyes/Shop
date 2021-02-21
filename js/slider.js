const imgLinks = [
    './images/home/2.jpg',
    './images/home/1.jpg',
    './images/home/girlBlack.jpg'
];
const delay = 5000;
let currentIndex = 0;

setInterval(function() {
    console.log(document.getElementById('image').src);
    document.getElementById('image').src = imgLinks[currentIndex];
    currentIndex++;
    if (currentIndex >= imgLinks.length) {
        currentIndex = 0;
    }
}, delay);