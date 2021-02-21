'use strict';

var xhr = new XMLHttpRequest(); //созд-е obj XMLHttpRequest
xhr.open('GET', './data/dress.json', false); //Инициализация запроса: GET - полуить данные, URL, синхронно
xhr.send(); // отправка

if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
} else {
    let DATA = JSON.parse(xhr.responseText);
    const filters = document.getElementById('filters');
    filters.addEventListener('input', filterGoods);


    const one = ['one', 'two', 'three', 'four', 'five']
    const two = ['a', 'b', 'five', 'c', 'one']
    let matched = one.filter(el => two.indexOf(el) > -1);

    console.log(matched)
    console.log(typeof one)

    function filterGoods() {

        const
            country = document.getElementById('country').value,
            check = document.getElementById('check').value,
            sizes = [...filters.querySelectorAll('#size input:checked')].map(n => n.value),
            colors = [...filters.querySelectorAll('#color input:checked')].map(n => n.value),
            priceMin = document.getElementById('priceMin').value,
            priceMax = document.getElementById('priceMax').value,
            sizes1 = Array.from(sizes);
        let sizesStr = sizes.toString();
        let colorsStr = colors.toString();

        outputGoods(DATA.filter(n => (
            (!check || n.check === check) &&
            (!country || n.country === country) &&
            (!sizes.length || sizes1.indexOf(n.sizeD) > -1) &&
            (!colors.length || colorsStr.includes(n.color)) &&
            (!priceMin || priceMin <= n.cost) &&
            (!priceMax || priceMax >= n.cost)
        )));
    }


    function outputGoods(DATA) {
        document.getElementById('dresses').innerHTML = DATA.map(n => `
        <div class="divGeneral col-sm-3">
        <div class="card-header bg-transparent border-danger imgproduct1"> <img src="${n.ImageSource}" alt="No fragments" width="100%"></div>       
        <div class="card-body text-dark">
            <h5 class="card-title"><b><i>${n.name}</i></b></h5>                    
            <d3 class="card-text">Date: ${n.date}  </d3> &nbsp
            <d3 class="card-text"><b>${n.cost}$</b> </d3><br>
            <d3 class="card-title"> Country: ${n.country}</d3><br>
            <d3>In stock: ${n.check} </d3><br>
            <d3>Sizes: ${n.sizeD} </d3><br>

        </div>
        <div class="card-footer bg-transparent border-dark description">${n.description} </div>
        </div> `).join('');
    }

    outputGoods(DATA);


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

function viewDivSize() {
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

function viewDivColor() {
    if (visible) {
        document.getElementById('color').style.display = 'none';
        document.getElementById('inpColor').value = "+";
        visible = false;
    } else {
        document.getElementById('color').style.display = 'block';
        document.getElementById('inpColor').value = "-";
        visible = true;
    }
}