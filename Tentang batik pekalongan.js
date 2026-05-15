const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const leftTap = document.getElementById("leftTap");
const rightTap = document.getElementById("rightTap");

let currentSlide = 0;

/* SHOW SLIDE */

function showSlide(index){

  slides.forEach((slide)=>{
    slide.classList.remove("active");
  });

  dots.forEach((dot)=>{
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

/* NEXT */

function nextSlide(){

  currentSlide++;

  if(currentSlide >= slides.length){
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

/* PREVIOUS */

function prevSlide(){

  currentSlide--;

  if(currentSlide < 0){
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

/* TAP AREA */

rightTap.addEventListener("click", nextSlide);

leftTap.addEventListener("click", prevSlide);

/* AUTO SLIDE */

setInterval(()=>{
  nextSlide();
}, 5000);

/* MOBILE MENU */

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", ()=>{

  mobileMenu.classList.toggle("active");

});