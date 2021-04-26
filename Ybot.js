// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @icon
// @grant        none
// ==/UserScript==

let keywords = ["Обучение","Здесь учатся, получают навыки и опыт","Яндекс практикум "];

let btn = document.getElementsByClassName('button mini-suggest__button button_theme_search button_size_search i-bem')[0];
let links = document.links;
let keyword = keywords[getRandom(0,keywords.length)];

if(btn !== undefined){
    document.getElementById ("text").value = keyword;
    document.getElementsByClassName('button mini-suggest__button button_theme_search button_size_search i-bem')[0].click();
}else{
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf('praktikum.yandex.ru')!=-1){
            let link=links[i];
            console.log("Нашел фразу" + link);
            link.click();
            break;
        }
    }
}


function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)*min);
}
