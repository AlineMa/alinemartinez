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
  const lines = document.querySelectorAll('line');
  function setLines(size){
    lines.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length + ' ' + length
      path.style.strokeDashoffset = length * size
    })
  }

  document.addEventListener('scroll', function(evt){
    var scrollY = window.scrollY;
    var scrollMax = window.innerHeight*.5;
    setLines(scrollY/scrollMax);
  })
  console.log(lines)
})