//INTRO ANIMATION
window.onload = function visitors(){
  if ( ! sessionStorage.getItem( 'doNotShow' ) ) {
    sessionStorage.setItem( 'doNotShow', true );
    introAnimation();
    }
    else{
      document.querySelector('.intro').style.display = "none";
    }
}
let introContainer = document.querySelector('.intro');
function introAnimation(){
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
  let i = 0;
  while (i<1){
    tl.to(".intro__title", { opacity: 0, duration: 1.3, stagger: 1, delay: 1 });
    tl.to(".intro", { opacity: 0, duration: 0.6, delay: 0.1 });
    tl.to(".intro", { display: "none", duration: 0.6, delay: 0 });
    i++
  }
}
