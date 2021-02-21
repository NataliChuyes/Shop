'use strict';

var xhr1 = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr1.open('GET', './data/boots.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr1.send(); // отправка



var xhr2 = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr2.open('GET', './data/dress.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr2.send(); // отправка



if (xhr1.status != 200 && xhr2.status != 200) {
    alert(xhr1.status + ': ' + xhr1.statusText);
    alert(xhr2.status + ': ' + xhr2.statusText);
} else {
    let DATA = JSON.parse(xhr1.responseText);
    let DATA2 = JSON.parse(xhr2.responseText);
    let concattedjson = DATA.concat(DATA2);

    const filters = document.getElementById('filters');
    filters.addEventListener('input', filterGoods);


    function filterGoods() {
        const
            country = document.getElementById('country').value,
            type = document.getElementById('type').value,
            check = document.getElementById('check').value,
            sizes = [...filters.querySelectorAll('#sizeDress input:checked')].map(n => n.value),
            sizesB = [...filters.querySelectorAll('#sizeBoot input:checked')].map(n => n.value),
            colors = [...filters.querySelectorAll('#color input:checked')].map(n => n.value),
            priceMin = document.getElementById('priceMin').value,
            priceMax = document.getElementById('priceMax').value;


        let sizesStr = sizes.toString();
        let sizesBStr = sizesB.toString();
        let colorsStr = colors.toString();

        outputGoods(concattedjson.filter(n => (
            (!check || n.check === check) &&
            (!type || n.type === type) &&
            (!country || n.country === country) &&
            (!sizes.length || n.sizeD.indexOf(sizesStr) != -1) &&
            (!sizesB.length || n.sizeB.indexOf(sizesBStr) != -1) &&
            (!colors.length || n.color.indexOf(colorsStr) != -1) &&
            (!priceMin || priceMin <= n.cost) &&
            (!priceMax || priceMax >= n.cost)
        )));

    }


    function outputGoods(concattedjson) {
        document.getElementById('shop').innerHTML = concattedjson.map(n => `
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
    let input = document.getElementById('mySearch');
    let filter = input.value.toUpperCase();
    let shop = document.getElementById("shop");
    let divGeneral = document.getElementsByClassName('divGeneral');

    for (let i = 0; i < divGeneral.length; i++) {
        let a = divGeneral[i];
        console.log(a);
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            divGeneral[i].style.display = "";
        } else {
            divGeneral[i].style.display = "none";
        }
    }

}

var visible = false;

function viewDivBoots() {
    if (visible) {
        document.getElementById('sizeBoot').style.display = 'none';
        visible = false;
    } else {
        document.getElementById('sizeBoot').style.display = 'block';
        visible = true;
    }
}

function viewDivDress() {
    if (visible) {
        document.getElementById('sizeDress').style.display = 'none';
        visible = false;
    } else {
        document.getElementById('sizeDress').style.display = 'block';
        visible = true;
    }
}