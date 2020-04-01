// ==UserScript==
// @name         Linkedin 2nd and 3rd
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Carl Williams
// @match        https://www.linkedin.com/feed/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const alwaysClickLoadMore = true;
    const removeFromIndex=false;

    let joeDiv;
    if (!document.getElementById('joe-div')) {
        joeDiv = document.createElement("div");
        joeDiv.id = "joe-div";
        joeDiv.style.background = 'white';
        joeDiv.style.position = 'fixed';
        joeDiv.style.left = 0;
        joeDiv.style.maxHeight = "400px";
        joeDiv.style.maxWidth = "200px";
        joeDiv.style.overflow = "scroll";

        document.getElementById('extended-nav').appendChild(joeDiv);
        clearJoeDiv();


    }

    function clearJoeDiv() {
        joeDiv.innerHTML = "";
        let controls = document.createElement("BUTTON");

        var text = document.createTextNode("Clear");

        // appending text to button
        controls.appendChild(text);
        controls.onclick = clearJoeDiv;
        joeDiv.appendChild(controls);
    }
    function highlightItem(item) {
        item.style.borderColor = 'red';
        item.style.borderWidth = '1px';
        item.style.borderStyle = 'solid';
    }

    function alwaysLoadMore() {
        if (alwaysClickLoadMore) {
            document.querySelectorAll('button[data-control-name="more_comments"]').forEach(item => item.click());
        }
    }

    function identifyPeople() {
        document.querySelectorAll('.feed-shared-actor__title').forEach(item => {
            if (item.innerText.indexOf('2nd') != -1 || item.innerText.indexOf('3rd') != -1) {
                identifyPersonAndList(item)
            }
        });
        document.querySelectorAll('.comments-post-meta__name').forEach(item => {
            if (item.innerText.indexOf('2nd') != -1 || item.innerText.indexOf('3rd') != -1) {
                identifyPersonAndList(item);
            }
        });
    }

    function identifyPersonAndList(person) {
        highlightItem(person);
        if (joeDiv.innerText.indexOf(person.innerText) === -1) {
                person.onclick=()=>{person.remove();}
            if(removeFromIndex){
                person.hider= window.setTimeout(()=>{person.remove(); window.clearTimeout(person.hider);},40000);
            }
            joeDiv.appendChild(person);

        }
    }

    function onScroll() {
        identifyPeople();
        alwaysLoadMore();
    }

    window.onscroll = onScroll;
    onScroll();
})();