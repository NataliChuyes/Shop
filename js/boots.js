'use strict';
var xhr = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr.open('GET', './data/boots.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr.send(); // отправка

if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
} else {
    let DATA = JSON.parse(xhr.responseText);
    const filters = document.getElementById('filters');
    filters.addEventListener('input', filterGoods);


    function filterGoods() {
        const
            country = document.getElementById('country').value,
            check = document.getElementById('check').value,
            sizes = [...filters.querySelectorAll('#size input:checked')].map(n => n.value),
            colors = [...filters.querySelectorAll('#color input:checked')].map(n => n.value),
            priceMin = document.getElementById('priceMin').value,
            priceMax = document.getElementById('priceMax').value;

        let sizesStr = sizes.toString();
        let colorsStr = colors.toString();

        outputGoods(DATA.filter(n => (
            (!check || n.check === check) &&
            (!country || n.country === country) &&
            (!sizes.length || sizesStr.includes(n.sizeB)) &&
            (!colors.length || colorsStr.indexOf(n.color) != -1) &&
            (!priceMin || priceMin <= n.cost) &&
            (!priceMax || priceMax >= n.cost)
        )));
    }


  function outputGoods(concattedjson) {
        document.getElementById('bootses').innerHTML = concattedjson.map(n => `
        <div class="divGeneral col-sm-3">
        <div class="card-header bg-transparent border-danger imgproduct1"> <a href="${n.link}"><img src="${n.ImageSource}" alt="No fragments" width="100%"></a></div>       
        <div class="card-body text-dark">
            <h5 class="card-title"><i><b>${n.name}</b></i></h5>                    
            <d3 class="card-text">Date: ${n.date} &nbsp&nbsp </d3>
            <d3 class="card-text"><b>${n.cost}$</b> </d3><br>
            <d3 class="card-title"> Country: ${n.country}</d3><br>
            <d3>In stock: ${n.check} </d3>
        </div>
        <div class="card-footer bg-transparent border-dark description">${n.description} </div>
        </div> `).join('');
    }

    outputGoods(concattedjson);
}

function funcSearch() {
    var input = document.getElementById('mySearch');
    var search = input.value.toUpperCase();

    let divGeneral = document.getElementsByClassName('divGeneral');
    for (let i = 0; i < divGeneral.length; i++) {
        let a = divGeneral[i];
        console.log(a);
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(search) > -1) {
            divGeneral[i].style.display = "";
        } else {
            divGeneral[i].style.display = "none";
        }
    }

}

var visible = false;

function viewDiv() {
    if (visible) {
        document.getElementById('size').style.display = 'none';
        document.getElementById('inpSize').value = "+";
        visible = false;
    } else {
        document.getElementById('size').style.display = 'block';
        document.getElementById('inpSize').value = "-";
        visible = true;
    }
}