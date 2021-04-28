// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://ivm-clinic.ru/*
// @match        https://dobrovmeste.ru/*
// @icon
// @grant        none
// ==/UserScript==

let sites ={
    "ivm-clinic.ru":["Ветеринарный центр",
                     "Институт вет медицины",
                     "квалифицированная ветеринарная помощь"],
    "dobrovmeste.ru":["Благотворительный фонд помощи животным",
                  "Добро вместе"]
};

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];

let btn = document.getElementsByClassName('button mini-suggest__button ')[0];
let yandexInput = document.getElementById ("text");
let i = 0;
let links = document.links;
let next = document.querySelector('.pager__item_current_yes');
let pages = document.querySelector('.pager__item_kind_next');

if(btn !== undefined) {
    document.cookie = "site="+site;
}else if (location.hostname == "yandex.ru") {
    site = getCookie("site");
}else{
    site = location.hostname;
}

if(btn !== undefined){
    document.cookie = "site="+site;
    let timerId = setInterval(()=> {
        yandexInput.value += keyword[i];
        i++;
        if(i == keyword.length) {
            clearInterval(timerId);
            btn.click();
        }
    },1000);

}else if(location.hostname == site ) {
    console.log("Мы попали на сайт");
    setTimeout(()=>{
        let index = getRandom(0,links.length);

        if(getRandom(0,101)>=70) {
            location.href = "https://yandex.ru/";
        }

        if(links[index].href.indexOf(site)!=-1)
            links[index].click();
    },getRandom(4000,7000));
}
else{
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++)
    {
        if(links[i].href.indexOf(site)!=-1){
            let link=links[i];
            nextYandexPage = false;
            // console.log("Нашел фразу" + link);
            link.removeAttribute("target");
            setTimeout(()=>{
                link.click();},getRandom(3000,5000));
            break;
        }
    }

    if(next.innerText == "5") {
        nextYandexPage = false;
        location.href = "https://yandex.ru/";
    }
    if (nextYandexPage){
        setTimeout(()=>{
            pages.click();}
                   ,getRandom(3000,5000));
	}
}

function getRandom(min,max) {
	return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
