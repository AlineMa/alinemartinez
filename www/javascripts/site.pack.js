// This is a main JavaScript file that will ll be compiled into /javascripts/site.js
//
// Any JavaScript file in your site folder can be referenced here by using import or require statements.
// Additionally, you can import modules installed via your package.json file.
//
// For example:
// import './fileName'
//
// To learn more, visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

import 'alpinejs'
console.log("Design by Aline Martinez")
console.log("Development with ❤ by walidvb.com")
console.log("Built on vapid")

document.addEventListener('DOMContentLoaded', () => {
  const contact = document.querySelector('a.contact')
  const colors = ['#FB1130', '#8EFB03', '#328EFB', '#ff00c8', '#F9E20E']
  contact.addEventListener('mouseenter', (evt) => {
    const { x, y } = evt;
    confetti({
      angle: r(20, 50),
      spread: r(30, 60),
      particleCount: r(50, 100),
      startVelocity: 40,
      ticks: 100,
      origin: {
        x: x/window.innerWidth,
        y: y/window.innerHeight,
      },
      colors
    })
    console.log('🎉 by https://www.kirilv.com/canvas-confetti')
  })
  function r(min, max) {
    return Math.random() * (max - min) + min;
  }
  

  document.querySelectorAll('.animate-letters').forEach( elem => {
    if ('ontouchstart' in window){
      // elem.classList.add('animated')
    }
    else{
      elem.addEventListener('mouseenter', () => elem.classList.add('animated') && setTimeout(elem.click, 1300)) 
      elem.addEventListener('mouseleave', () => elem.classList.remove('animated'))
    }
  })

  document.querySelector('.aline').addEventListener('mousemove', (evt) => {
    const { target, clientX, clientY} = evt;
    const pseudoRect = window.getComputedStyle(target, ':after');
    const width = parseInt(pseudoRect.width);
    const height = parseInt(pseudoRect.height);
    const rect = target.getBoundingClientRect();
    let left = clientX - rect.left,
      top = clientY - rect.top;
    left = Math.min(Math.max(width / 2, left), rect.width - width/2);
    top = Math.min(Math.max(height / 2, top), rect.height - height / 2);

    target.style.setProperty('--top', `${top}px`);
    target.style.setProperty('--left', `${left}px`);
  });
});

[...document.querySelectorAll('[data-toggle-class]')].map(elem => {
  const target = elem.attributes['data-target'].value;
  const className = elem.attributes['data-toggle-class'].value;
  elem.addEventListener('click', evt => {
    elem.classList.toggle('open');
    document.querySelectorAll(target).forEach( el => el.classList.toggle(className));
  })
});

(() => {
  const curr = document.querySelectorAll(`a[href='${window.location.pathname}']`)
  if (!curr[0]){ return }
  curr[0].classList.add('active')
})();

(() => {
  window.onpopstate = function (event) {
    load(document.location, '#right')
  };
  [...document.querySelectorAll('#left a[href^="/"]')].forEach((elem) => {
    const handleClick = (evt) => {
      evt.preventDefault();
      [...document.querySelectorAll('#left .active')].forEach(e => e.classList.remove('active'))
      load(elem.href, '#right')
      history.pushState(null, null, elem.href);
      elem.classList.add('active')

    }
    elem.addEventListener('click', handleClick)
    return true
  });
})()


function load(url, from, to) {
  // var cached = sessionStorage[url];
  if (!from) { from = "body"; } // default to grabbing body tag
  if (to && to.split) { to = document.querySelector(to); } // a string TO turns into an element
  if (!to) { to = document.querySelector(from); } // default re-using the source elm as the target elm
  // if (cached) { return to.innerHTML = cached; } // cache responses for instant re-use re-use

  var XHRt = new XMLHttpRequest; // new ajax
  XHRt.responseType = 'document';  // ajax2 context and onload() event
  XHRt.onload = function () { 
    sessionStorage[url] = to.outerHTML = XHRt.response.querySelector(from).outerHTML;
  };
  XHRt.open("GET", url, true);
  XHRt.send();
  return XHRt;
}