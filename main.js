// NAVIGATION
const navToggle = document.getElementById("navToggle"),
      navLinks = document.querySelector(".nav-links");

if(navToggle){
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    // fermer les autres
    document.querySelectorAll(".accordion-content").forEach(c => {
      if(c !== content) c.style.maxHeight = null;
    });
    // toggle le contenu actuel
    if(content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
// SCROLL
const lenis = new Lenis({
  duration: 1.2,
  easing: t => t,
  smooth: true
});

// boucle Lenis + ScrollTrigger
function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Lier ScrollTrigger à Lenis pour synchronisation
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value, {duration:0, immediate:true}) : lenis.scroll;
  },
  getBoundingClientRect() {
    return {top:0, left:0, width:window.innerWidth, height:window.innerHeight};
  }
});
lenis.on("scroll", ScrollTrigger.update);
// GSAP
// Sections fade-in
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      scroller: document.body
    }
  });
});

// Cards scale-in
gsap.utils.toArray(".card, .about-card, .habitat-card").forEach(card => {
  gsap.from(card, {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      scroller: document.body
    }
  });
});

// Footer fade-in
gsap.from(".footer", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    scroller: document.body
  }
});
const scrollTopBtn = document.getElementById("scrollTop");
if(scrollTopBtn){
  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    lenis.scrollTo(0, {duration: 1.2});
  });
}
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();