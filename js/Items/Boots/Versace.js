'use strict';

var xhr = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr.open('GET', '/data/boots.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr.send(); // отправка

if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
} else {
    let DATA = JSON.parse(xhr.responseText); //obj    

    function outputGoods(DATA) {
        document.getElementById('versace').innerHTML = DATA.map(n => `
        <div class="divGeneral col-sm-3">
        <div class="card-header bg-transparent border-danger imgproduct1"> <img src="${n.ImageSource}" alt="No fragments" width="100%"></div>       
        <div class="card-body text-dark">
            <h5 class="card-title"><i>${n.name}</i></h5>                    
            <d3 class="card-text">Date: <i>${n.date}</i> </d3>
            <d3 class="card-text"><b>${n.cost}$</b> </d3><br>
            <d3 class="card-title"> Country: ${n.country}</d3><br>
            <d3>Sizes: ${n.sizeB} </d3><br>
            <d3>In stock: ${n.check} </d3><br>
        </div>
        <div class="card-footer bg-transparent border-dark description">${n.description} </div>
        </div>`).join('');
    }

    function filterGoods() {
        outputGoods(DATA.filter(n =>
            (n.id == "2")
        ));

    }
    filterGoods(DATA);

}