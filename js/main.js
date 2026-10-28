const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation
const setNav = (open) => {
  if (!navToggle || !nav) return;
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
};

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNav(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      navToggle.focus();
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) setNav(false);
  });
}

// Contact form: posts to Google Forms in the background, so replies land in
// the linked Google Sheet without showing an email address on the site.
document.querySelectorAll("[data-gform]").forEach((form) => {
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    status.textContent = "Sending…";

    try {
      await fetch(form.action, { method: "POST", mode: "no-cors", body: new FormData(form) });
      form.reset();
      status.textContent = "Thanks! Your message is on its way. I'll reply within one business day.";
    } catch {
      status.textContent = "Something went wrong. Please try again in a moment.";
    } finally {
      button.disabled = false;
    }
  });
});
