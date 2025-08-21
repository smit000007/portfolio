// Typing effect + theme toggle + mobile menu + year + GitHub link helper
const text = "Hi, I'm Smit Malaviya — Cybersecurity Student";
const typingEl = document.getElementById("typing");
let idx = 0;
(function type() {
  if (idx <= text.length) {
    typingEl.textContent = text.slice(0, idx);
    idx++;
    setTimeout(type, 60);
  }
})();

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Theme toggle
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
});

// Optional: light theme vars
const style = document.createElement('style');
style.textContent = `
  .light {
    --bg: #f7fbf9;
    --panel: #ffffff;
    --text: #0b0f10;
    --muted: #576b66;
    --accent: #0abf53;
    --accent-2: #0b84ff;
    --ring: rgba(11,132,255,0.25);
    background: radial-gradient(1200px 600px at 20% -10%, rgba(11,132,255,0.08), transparent),
                radial-gradient(1000px 500px at 100% 10%, rgba(10,191,83,0.12), transparent),
                #f7fbf9;
  }
`;
document.head.appendChild(style);

// Helper: set GitHub links once user edits username in one place
const GH_USERNAME = "your-github-username"; // <-- change this
const ghLink = document.getElementById('githubLink');
const ghLink2 = document.getElementById('githubLink2');
if (GH_USERNAME && GH_USERNAME !== "your-github-username") {
  ghLink.href = `https://github.com/${GH_USERNAME}`;
  ghLink2.href = `https://github.com/${GH_USERNAME}`;
  ghLink.textContent = "GitHub";
  ghLink2.textContent = `${GH_USERNAME}`;
}
