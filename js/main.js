const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const header = document.querySelector(".site-header");

// Show a divider under the sticky header once the page has scrolled.
if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

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
// The endpoint lives here rather than in the HTML so bots that scrape form
// actions can't find it, and two quiet checks drop automated submissions.
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSewdlSXfePcTXCyvjo8lmxLjloxr3YUCMmWLy6CTl_O12pB1w/formResponse";
const MIN_FILL_MS = 3000;
const THANKS = "Thanks! Your message is on its way. I'll reply within one business day.";

document.querySelectorAll("[data-gform]").forEach((form) => {
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type='submit']");
  const trap = form.querySelector(".form-trap input");
  const openedAt = Date.now();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // A filled-in hidden field or an instant submit means a bot: pretend it
    // worked so it doesn't retry, but send nothing.
    if ((trap && trap.value) || Date.now() - openedAt < MIN_FILL_MS) {
      form.reset();
      status.textContent = THANKS;
      return;
    }

    const data = new FormData(form);
    data.delete("website");

    button.disabled = true;
    status.textContent = "Sending…";

    try {
      await fetch(GOOGLE_FORM_URL, { method: "POST", mode: "no-cors", body: data });
      form.reset();
      status.textContent = THANKS;
    } catch {
      status.textContent = "Something went wrong. Please try again in a moment.";
    } finally {
      button.disabled = false;
    }
  });
});
