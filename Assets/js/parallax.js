let img1 = document.querySelector('#floating-elt__img1');
let img2 = document.querySelector('#floating-elt__img2');
let img3 = document.querySelector('#floating-elt__img3');
let img4 = document.querySelector('#floating-elt__img4');
window.addEventListener("scroll", function () {

  parallax(img1, 0.008);
  parallax(img2, 0.008);
  parallax(img3, 0.01);
  parallax(img4, 0.007);

})

let parallax = function(elt, ratio) {
  let { scrollY } = window;
  elt.style.transform = "translateY("+ ratio * scrollY + "em)";
}

let isVisible = function(element){
  let inScreen = element.getBoundingClientRect();

  if(inScreen.top >= 0 &&
      inScreen.left >= 0 &&
      inScreen.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      inScreen.bottom <= (window.innerHeight || document.documentElement.clientHeight)){

      return true
  }
  else{
      return false
  }
}
