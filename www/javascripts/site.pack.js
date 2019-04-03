// This is a main JavaScript file that will ll be compiled into /javascripts/site.js
//
// Any JavaScript file in your site folder can be referenced here by using import or require statements.
// Additionally, you can import modules installed via your package.json file.
//
// For example:
// import './fileName'
//
// To learn more, visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

document.addEventListener('DOMContentLoaded', () => {
  const contact = document.querySelector('.contact a')
  const colors = ['#FB1130', '#8EFB03', '#328EFB', '#ff00c8', '#F9E20E']
  contact.addEventListener('mouseenter', (evt) => {
    console.log(evt)
    const { x, y } = evt;
    confetti({
      angle: r(100, 120),
      spread: r(30, 60),
      particleCount: r(50, 100),
      startVelocity: 30,
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

  document.querySelectorAll('[data-image]').forEach( elem => {
    const imgSrc = elem.attributes['data-image'].value
    if(elem.attributes['data-prefetch']){
      const img = document.createElement('img')
      img.src = imgSrc
    }
    elem.addEventListener('mouseenter', () => setProfile(imgSrc))
    elem.addEventListener('mouseleave', removeProfile)
  })
  const profileWrapper = document.querySelector('.profile-pics')
  function removeProfile(){
    profileWrapper.innerHTML = ''
  }
  function setProfile(src){
    const img = document.createElement('img')
    img.src = src
    profileWrapper.innerHTML = img.outerHTML
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
})