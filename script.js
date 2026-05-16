// =============================================
// script.js — Charan Reddy Portfolio
// Written by: Suggu V S S Charan Reddy
// College: LBRCE | Branch: CSE
// =============================================

// ---- 1. TYPING ANIMATION ----
// These are the roles that cycle in the hero section
const roles = [
  "Frontend Developer",
  "HTML/CSS Enthusiast",
  "JavaScript Learner",
  "Problem Solver",
  "Intern @ Tech"
];

let roleIndex  = 0;  // which role we are on
let charIndex  = 0;  // which character we are typing
let isDeleting = false; // are we currently deleting?

const typedEl = document.getElementById("typed-text");

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    // Remove one character
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add one character
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  // If finished typing the full word, pause then start deleting
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500); // wait 1.5s before deleting
    return;
  }

  // If fully deleted, move to next role
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  // Speed: deleting is faster than typing
  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// Start typing after a short delay
setTimeout(typeEffect, 600);


// ---- 2. NAVBAR: SHRINK ON SCROLL ----
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ---- 3. HAMBURGER MENU (Mobile) ----
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Close menu when a nav link is clicked (better UX on mobile)
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});


// ---- 4. SCROLL ANIMATIONS (Intersection Observer) ----
// We watch elements with class "fade-up"
// When they enter the viewport, we add class "visible"

const fadeEls = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop watching after animation runs once
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15 // trigger when 15% of element is visible
  }
);

fadeEls.forEach(function (el) {
  observer.observe(el);
});


// ---- 5. CONTACT FORM ----
// Simple client-side validation (no backend needed for demo)

function sendMessage() {
  const name     = document.getElementById("name").value.trim();
  const email    = document.getElementById("email").value.trim();
  const message  = document.getElementById("message").value.trim();
  const feedback = document.getElementById("form-feedback");

  // Basic validation
  if (!name || !email || !message) {
    feedback.textContent  = "⚠️ Please fill in all fields.";
    feedback.style.color  = "#ff6b6b";
    return;
  }

  // Check for valid email format (simple check)
  if (!email.includes("@") || !email.includes(".")) {
    feedback.textContent  = "⚠️ Please enter a valid email.";
    feedback.style.color  = "#ff6b6b";
    return;
  }

  // Success message
  feedback.textContent  = "✅ Message sent! I'll get back to you soon.";
  feedback.style.color  = "#00e5ff";

  // Clear fields after sending
  document.getElementById("name").value    = "";
  document.getElementById("email").value   = "";
  document.getElementById("message").value = "";

  // Clear feedback message after 4 seconds
  setTimeout(function () {
    feedback.textContent = "";
  }, 4000);
}


// ---- 6. ACTIVE NAV LINK ON SCROLL ----
// Highlights which section is currently in view

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(function (link) {
    link.style.color = "";  // reset all
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "var(--accent)"; // highlight current
    }
  });
});
