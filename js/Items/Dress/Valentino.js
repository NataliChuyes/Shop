'use strict';

var xhr = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr.open('GET', '/data/dress.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr.send(); // отправка

if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
} else {
    let DATA = JSON.parse(xhr.responseText); //obj    


    function outputGoods(DATA) {
        console.log(DATA)

        document.getElementById('clarks').innerHTML = DATA.map(n => `
        <div class="col-sm-1">
        </div>
            <div class="col-sm-4 picture">
                <p class=""><img src="${n.ImageSource}" alt="No fragments" width="100%"></p>
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
            </div>
            
            <div class="col-sm-12 foot" style="background-color: #ccc ">
                <p class="">Slider </p>
            </div>`).join('');

    }

    function filterGoods() {
        outputGoods(DATA.filter(n =>
            (n.id == "7")
        ));

    }
    filterGoods(DATA);


}
