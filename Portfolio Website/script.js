const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const themeButton = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function updateThemeButton(theme) {
  const isDark = theme === "dark";
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeButton.querySelector(".theme-icon").textContent = isDark ? "☼" : "◐";
  themeButton.querySelector(".theme-label").textContent = isDark ? "Light mode" : "Dark mode";
  themeMeta.content = isDark ? "#101613" : "#f6f7f3";
}

updateThemeButton(document.documentElement.dataset.theme || "light");
themeButton.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem("portfolio-theme", nextTheme); } catch { /* Keep the selected theme for this page view. */ }
  updateThemeButton(nextTheme);
});

const projectCards = [...document.querySelectorAll(".project-grid .project-card")];
const viewAllProjectsButton = document.querySelector("#view-all-projects");
const projectOverflow = projectCards.slice(6);
const projectsExpandedText = `View all ${projectCards.length} projects`;

if (projectOverflow.length > 0) {
  viewAllProjectsButton.hidden = false;
  viewAllProjectsButton.textContent = `${projectsExpandedText} ↓`;
  projectOverflow.forEach((card) => card.classList.add("project-overflow"));
  viewAllProjectsButton.addEventListener("click", () => {
    const expanded = viewAllProjectsButton.getAttribute("aria-expanded") === "true";
    viewAllProjectsButton.setAttribute("aria-expanded", String(!expanded));
    projectOverflow.forEach((card) => card.classList.toggle("is-visible", !expanded));
    viewAllProjectsButton.textContent = expanded ? `${projectsExpandedText} ↓` : "Show fewer projects ↑";
  });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.innerHTML = "Sending…";
  formStatus.textContent = "";
  formStatus.classList.remove("is-error");

  try {
    if (!window.emailjs) throw new Error("The message service is unavailable.");
    await window.emailjs.sendForm("service_hno02jo", "template_fm1oiza", contactForm, "N81FOQih4FIfB5U5l");
    contactForm.reset();
    formStatus.textContent = "Thanks for your message. I’ll be in touch soon.";
  } catch (error) {
    formStatus.textContent = "Your message could not be sent. Please email onyenikefavour8@gmail.com directly.";
    formStatus.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "Send message <span>↗</span>";
  }
});
