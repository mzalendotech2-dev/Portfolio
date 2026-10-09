
"use strict";

// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// =========================================
// ACTIVE NAVIGATION LINK
// =========================================

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// =========================================
// AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// =========================================
// CONTACT FORM
// =========================================

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

const recipientEmail = "mzalendotech2@gmail.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);

  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please complete all fields.";
    return;
  }

  const subject = `Portfolio enquiry from ${name}`;

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message
  ].join("\n");

  const mailtoURL =
    `mailto:${recipientEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  formNote.textContent =
    "Opening your email application. Please review and send your message there.";

  window.location.href = mailtoURL;
});