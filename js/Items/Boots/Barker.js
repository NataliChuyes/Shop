'use strict';
$(document).ready(function(){
    $("#slider").owlCarousel();
  });

$(document).ready(function(){
    const slider = $("#slider").owlCarousel({
        items:4,
        loop:true,
        margin:1,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
});
var xhr = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr.open('GET', '/data/boots.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr.send(); // отправка

if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
} else {
    let DATA = JSON.parse(xhr.responseText); //obj   

    function outputGoods(DATA) {
        console.log(DATA)

        document.getElementById('barker').innerHTML = DATA.map(n => `        
        <div class="col-sm-4">
            <img src="${n.ImageSourceBig}" alt="No fragments" class="picture">
        </div>
        <div class="col-sm-6 characteristics">
            <p class="name">${n.name} </p>
            <p class="">Date: <i>${n.date}</i></p>
            <p class="">Price: <b>${n.cost}$</b></i></p>
            <p class="">Country: ${n.country}</i></p>
            <p class="">Sizes: ${n.sizeB}</i></p>
            <p class="">In stock: ${n.check}</i></p>
            <p class="">Colors: ${n.color}</i></p><br>
            <div class="description">
                <p >Description: ${n.description}</i></p>
            </div>
        </div>`).join('');

    }

    function filterGoods() {
        outputGoods(DATA.filter(n =>
            (n.id == "12")
        ));

    }
    filterGoods(DATA);


}
