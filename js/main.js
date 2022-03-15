"use strict";

//Sticky Navbar on scroll
const navbar = document.querySelector("#navbar");
const navbarTop = navbar.offsetTop;

function fixedNavbar() {
  if (window.scrollY >= navbarTop) {
    navbar.classList.add("fixed-navbar");
  } else {
    navbar.classList.remove("fixed-navbar");
  }
}

window.addEventListener("scroll", fixedNavbar);

//handle click on "contact" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menulist");
navbarMenu.addEventListener("click", event => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

//show "arrow up" button
const arrowUp = document.querySelector(".arrow-up");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

//handle "arrow up" button
arrowUp.addEventListener("click", () => {
  navbarMenu.classList.remove("open");
  scrollIntoView("#home");
});

//projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach(project => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// Projects -- Modal
const readmoreBtn = document.querySelectorAll('.readmore__btn');
const modalContents = document.querySelectorAll('#modal--projects');
const closeBtn = document.querySelectorAll('.closeBtn');
let currentIdx = 0;

// Read more Button 
readmoreBtn.forEach((btn) => {
  btn.addEventListener('click', (event)=>{
    const btnTarget = event.target.getAttribute('data-key');
    // modal
    for(let i = 0; i < modalContents.length; i++) {
      const modalTarget = modalContents[i].getAttribute('data-value');
      if(btnTarget == modalTarget) {
        modalContents[i].classList.add('openModal');
      } else {
        modalContents[i].classList.remove('openModal');
      }
    }
  });
});


closeBtn.forEach((cBtn)=> {
  cBtn.addEventListener('click', ()=>{
    for(let a = 0; a < modalContents.length; a++){
      modalContents[a].classList.remove('openModal');
    }
  });
});


//intersectionObserver
const sectionIds = ["#home", "#about", "#skills", "#works", "#contact"];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});


// About icon scroll event
function isElUnderBottom(element, triggerDiff) {
  const { top } = element.getBoundingClientRect();
  const { innerHeight } = window;
  return top > innerHeight + (triggerDiff || 0);
}

function handleScroll() {
  const elems = document.querySelectorAll('.up-scroll');
  elems.forEach(element => {
    if (isElUnderBottom(element, -250)) {
      element.style.opacity = "0";
      element.style.trasform = 'translateY(100px)';
    } else {
      element.style.opacity = "1";
      element.style.trasform = 'translateY(0px)';
    }
  });
}

window.addEventListener('scroll', handleScroll);

