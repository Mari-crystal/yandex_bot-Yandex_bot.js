// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://ivm-clinic.ru/*
// @icon
// @grant        none
// ==/UserScript==

let keywords = ["Ветеринарный центр","Институт вет медицины","квалифицированная ветеринарная помощь"];

let btn = document.getElementsByClassName('button mini-suggest__button ')[0];
let links = document.links;
let keyword = keywords[getRandom(0,keywords.length)];
let yandexInput = document.getElementById ("text");
let i = 0;
let next = document.querySelector('.pager__item_current_yes');
let pages = document.querySelector('.pager__item_kind_next');

if(btn !== undefined){
    let timerId = setInterval (()=> {
        yandexInput.value += keyword[i];
        i++;
        if(i==keyword.length) {
            clearInterval(timerId);
            btn.click();
        }
    },1000);

}else if(location.hostname == "ivm-clinic.ru" ) {
    console.log("Мы на ivm-clinic.ru");
    setTimeout(()=>{
        let index = getRandom(0,links.length);

        if(getRandom(0,101)>=70) {
            location.href = "https://yandex.ru/";
        }
        if(links[index].href.indexOf('ivm-clinic.ru')!=-1)
            links[index].click();
    },getRandom(2000,3500));

}else{
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf('ivm-clinic.ru')!=-1) {
            let link=links[i];
            nextYandexPage = false;
            console.log("Нашел фразу" + link);
            link.removeAttribute("target");
            setTimeout(()=>{
                link.click();},getRandom(1000,4500));
            break;
        }
    }

    if(next.innerText == "5") {
        nextYandexPage = false;
        location.href = "https://yandex.ru/";
    }

    if(next.innerText !== "5") {
        setTimeout(()=>{
            pages.click();},getRandom(3000,5000));

    }
}


function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}
