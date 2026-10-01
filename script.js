/**
 * SMIT MALAVIYA — EXECUTIVE PORTFOLIO
 * Business Development & Technical Cybersecurity
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroNetworkCanvas();
    initNavbarScroll();
    initMobileNavigation();
    initSmoothScrolling();
    initTypingAnimation();
    initCounterAnimation();
    initScrollAnimations();
    initProjectFilters();
    initTerminalConsole();
    initFormHandling();
});

/* --------------------------------------------------------------------------
   1. Subtle Enterprise Constellation Network Background (Canvas)
   -------------------------------------------------------------------------- */
function initHeroNetworkCanvas() {
    const canvas = document.getElementById('cyberpunk-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', debounce(onResize, 200));

    // Interactive mouse position for subtle parallax
    const mouse = { x: null, y: null, radius: 140 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle nodes definition
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles = [];

    class NetworkNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 1.8 + 1.2;
            // Alternating corporate cobalt & emerald hues
            this.isBlue = Math.random() > 0.4;
            this.baseColor = this.isBlue ? 'rgba(59, 130, 246,' : 'rgba(16, 185, 129,';
            this.baseAlpha = Math.random() * 0.4 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Soft push when hovering near mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 1.5;
                    this.y += Math.sin(angle) * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${this.baseColor} ${this.baseAlpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new NetworkNode());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw nodes
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        // Draw connections between nearby nodes
        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animate();
        }
    });
}

/* --------------------------------------------------------------------------
   2. Navbar Scroll Behavior & Active States
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Navbar blur enhancement on scroll
        if (scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link indicator
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
    const hamburger = document.getElementById('mobile-menu-toggle') || document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* --------------------------------------------------------------------------
   4. Smooth Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const offset = targetSection.offsetTop - 75;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. Dynamic Typing Animation
   -------------------------------------------------------------------------- */
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-animation');
    if (!typingElement) return;

    const words = [
        'B2B Business Development',
        'Technical Cybersecurity Sales',
        'Vulnerability Assessment (VAPT)',
        'Strategic Client Relationships (CRM)',
        'Technical Proposals & Deal Scoping',
        'Ethical Hacking & Penetration Testing'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing new word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   6. Key Metrics Counter Animation
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const duration = 1600;
                const increment = Math.ceil(target / (duration / 25));

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = `${target}${suffix}`;
                        clearInterval(timer);
                    } else {
                        counter.textContent = `${current}${suffix}`;
                    }
                }, 25);

                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach((c) => observer.observe(c));
}

/* --------------------------------------------------------------------------
   7. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    const animatedElements = document.querySelectorAll(
        '.pillar-card, .timeline-card, .skill-card, .project-card, .certification-card, .badge-card, .stat-card, .connect-category'
    );
    animatedElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. Project Category Filters & Subject Chips
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-filter');

            filterButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach((card) => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    card.classList.remove('fade-in-up');
                    void card.offsetWidth;
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Subject Chips in Contact Form
    const subjectChips = document.querySelectorAll('.subject-chip');
    const subjectInput = document.getElementById('subject');
    if (subjectChips.length && subjectInput) {
        subjectChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                subjectInput.value = chip.getAttribute('data-subject') || '';
                subjectInput.dispatchEvent(new Event('input'));
                subjectInput.focus();
            });
        });
    }
}

/* --------------------------------------------------------------------------
   9. Executive Terminal Console
   -------------------------------------------------------------------------- */
function initTerminalConsole() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const quickCmdButtons = document.querySelectorAll('.quick-cmd-btn');

    if (!terminalOutput || !terminalInput) return;

    function addOutputLine(command, htmlOutput) {
        const cmdRow = document.createElement('div');
        cmdRow.className = 'output-line';
        cmdRow.innerHTML = `
            <span class="prompt">$</span>
            <span class="command">${escapeHtml(command)}</span>
        `;
        terminalOutput.appendChild(cmdRow);

        if (htmlOutput) {
            const contentRow = document.createElement('div');
            contentRow.className = 'output-content';
            contentRow.innerHTML = htmlOutput;
            terminalOutput.appendChild(contentRow);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(rawCommand) {
        const cmd = rawCommand.toLowerCase().trim();

        switch (cmd) {
            case 'about':
            case 'whoami':
                addOutputLine(cmd, `
                    <div class="profile-info">
                        <h3>Smit Malaviya</h3>
                        <p class="title">Business Development Specialist • Technical Sales • Cybersecurity (CEH)</p>
                        <p class="description">Bridging deep technical cybersecurity acumen (VAPT, network defense, OWASP Top 10) with B2B prospecting, client acquisition, and executive deal scoping. Currently driving client engagement and security research at CyberTech Shield LLC.</p>
                    </div>
                `);
                break;

            case 'bd':
            case 'bd-skills':
                addOutputLine(cmd, `
                    <div class="skills-grid" style="grid-template-columns: 1fr;">
                        <div class="skill-category">
                            <h4>📈 Business Development &amp; Technical Sales</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">B2B Prospecting</span>
                                <span class="skill-tag">CRM Pipeline Management</span>
                                <span class="skill-tag">Lead Qualification</span>
                                <span class="skill-tag">Proposal &amp; Pitch Support</span>
                                <span class="skill-tag">Account Management</span>
                                <span class="skill-tag">LinkedIn Outreach</span>
                                <span class="skill-tag">Market Research</span>
                            </div>
                        </div>
                    </div>
                `);
                break;

            case 'cyber':
            case 'cyber-skills':
                addOutputLine(cmd, `
                    <div class="skills-grid" style="grid-template-columns: 1fr 1fr;">
                        <div class="skill-category">
                            <h4>🛡️ Cybersecurity &amp; VAPT</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Vulnerability Assessment</span>
                                <span class="skill-tag">Penetration Testing</span>
                                <span class="skill-tag">OWASP Top 10</span>
                                <span class="skill-tag">Network Defense</span>
                                <span class="skill-tag">Malware Analysis</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>🧰 Security Toolkit</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Burp Suite</span>
                                <span class="skill-tag">Metasploit</span>
                                <span class="skill-tag">Nmap</span>
                                <span class="skill-tag">Wireshark</span>
                                <span class="skill-tag">Kali Linux</span>
                                <span class="skill-tag">Python</span>
                            </div>
                        </div>
                    </div>
                `);
                break;

            case 'experience':
                addOutputLine('experience', `
                    <div class="profile-info">
                        <p class="title" style="color:#60a5fa; font-weight:700;">Cyber Security (VAPT) Intern — CyberTech Shield LLC</p>
                        <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:8px;">Aug 2026 – Present | Vadodara, Gujarat (On-site)</p>
                        <p class="description">• Direct client-facing support on VAPT deliverables and cybersecurity solutions.<br>• Enterprise market research and target account qualification.<br>• Technical translation of complex vulnerability assessments into executive ROI narratives.</p>
                    </div>
                `);
                break;

            case 'education':
                addOutputLine('education', `
                    <div class="profile-info">
                        <p class="title" style="color:#34d399; font-weight:700;">B.Tech — Computer Science (Cybersecurity Specialization)</p>
                        <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:6px;">Parul University | 2023 – 2027</p>
                        <p style="font-size:0.85rem; color:#cbd5e1;">Languages: English (Proficient Business), Hindi (Fluent), Gujarati (Native)</p>
                    </div>
                `);
                break;

            case 'contact':
                addOutputLine('contact', `
                    <div style="font-size:0.88rem; line-height:1.7;">
                        <p><strong>Email:</strong> <a href="mailto:smitmalaviya30@gmail.com" style="color:#60a5fa;">smitmalaviya30@gmail.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:+919427974107" style="color:#34d399;">+91-9427974107</a></p>
                        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/smit-malaviya-164185228/" target="_blank" style="color:#60a5fa;">linkedin.com/in/smit-malaviya</a></p>
                        <p><strong>Location:</strong> Surat / Vadodara, Gujarat, India</p>
                    </div>
                `);
                break;

            case 'resume':
                addOutputLine('resume', `
                    <div>
                        <p style="color:#34d399; margin-bottom:6px;">Opening latest resume preview...</p>
                        <p><a href="assets/resume/smit-malaviya-resume.pdf" target="_blank" style="color:#60a5fa; font-weight:600;">📄 View / Download Smit Malaviya Resume (PDF)</a></p>
                    </div>
                `);
                setTimeout(() => {
                    window.open('assets/resume/smit-malaviya-resume.pdf', '_blank');
                }, 600);
                break;

            case 'clear':
                terminalOutput.innerHTML = '';
                break;

            case 'help':
                addOutputLine('help', `
                    <div class="help-menu">
                        <h4>Available Console Commands:</h4>
                        <div class="command-list">
                            <div class="command-item"><span class="cmd-name">about</span><span class="cmd-desc">Executive profile &amp; hybrid strategy</span></div>
                            <div class="command-item"><span class="cmd-name">bd</span><span class="cmd-desc">Business Development &amp; CRM competencies</span></div>
                            <div class="command-item"><span class="cmd-name">cyber</span><span class="cmd-desc">Cybersecurity, VAPT &amp; toolstack</span></div>
                            <div class="command-item"><span class="cmd-name">experience</span><span class="cmd-desc">Industry role at CyberTech Shield LLC</span></div>
                            <div class="command-item"><span class="cmd-name">education</span><span class="cmd-desc">B.Tech credentials &amp; languages</span></div>
                            <div class="command-item"><span class="cmd-name">contact</span><span class="cmd-desc">Direct email, phone &amp; LinkedIn</span></div>
                            <div class="command-item"><span class="cmd-name">resume</span><span class="cmd-desc">Preview or download CV (PDF)</span></div>
                            <div class="command-item"><span class="cmd-name">clear</span><span class="cmd-desc">Clear terminal screen</span></div>
                        </div>
                    </div>
                `);
                break;

            default:
                if (cmd) {
                    addOutputLine(cmd, `
                        <div style="color:#f87171; font-size:0.86rem;">
                            Command not recognized: <code>${escapeHtml(cmd)}</code>. Type <strong>help</strong> or use the quick chips above.
                        </div>
                    `);
                }
        }
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            processCommand(command);
            terminalInput.value = '';
        }
    });

    terminalOutput.addEventListener('click', () => {
        terminalInput.focus();
    });

    quickCmdButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                processCommand(cmd);
            }
        });
    });
}

/* --------------------------------------------------------------------------
   10. Form Handling & EmailJS Service
   -------------------------------------------------------------------------- */
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN = 20000; // 20s

function initFormHandling() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('dQmrhnlupg0TUCIgL');
        }
    } catch (err) {
        console.warn('EmailJS initialization warning:', err);
    }

    const contactForm = document.getElementById('contact-form');
    const testBtn = document.getElementById('test-btn');
    const charCount = document.getElementById('char-count');
    const messageInput = document.getElementById('message');

    if (!contactForm) return;

    // Character counter
    if (messageInput && charCount) {
        messageInput.addEventListener('input', () => {
            charCount.textContent = messageInput.value.length;
        });
    }

    const fields = ['name', 'email', 'subject', 'message'];

    function validateField(fieldName, val) {
        const errorEl = document.getElementById(`${fieldName}-error`);
        let errorMsg = '';

        if (!val || !val.trim()) {
            errorMsg = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
        } else if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val.trim())) {
                errorMsg = 'Please enter a valid email address.';
            }
        } else if (fieldName === 'subject' && val.trim().length < 4) {
            errorMsg = 'Subject must be at least 4 characters.';
        } else if (fieldName === 'message' && val.trim().length < 10) {
            errorMsg = 'Message must be at least 10 characters.';
        }

        if (errorEl) {
            errorEl.textContent = errorMsg;
        }
        return !errorMsg;
    }

    fields.forEach((field) => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('blur', () => validateField(field, input.value));
            input.addEventListener('input', () => {
                const errorEl = document.getElementById(`${field}-error`);
                if (errorEl) errorEl.textContent = '';
            });
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
            const remaining = Math.ceil((SUBMISSION_COOLDOWN - (now - lastSubmissionTime)) / 1000);
            showNotification(`Please wait ${remaining}s before sending another message.`, 'warning');
            return;
        }

        let allValid = true;
        fields.forEach((f) => {
            const input = document.getElementById(f);
            if (!validateField(f, input ? input.value : '')) {
                allValid = false;
            }
        });

        if (!allValid) {
            showNotification('Please fill in all required fields accurately.', 'error');
            return;
        }

        const submitBtn = document.getElementById('submit-btn');
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

        const templateParams = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_name: 'Smit Malaviya',
            reply_to: document.getElementById('email').value.trim()
        };

        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_e38iyv4', 'template_3nyenng', templateParams)
                .then(() => {
                    showNotification('Message delivered successfully! I will respond within 24 hours.', 'success');
                    contactForm.reset();
                    if (charCount) charCount.textContent = '0';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                    lastSubmissionTime = Date.now();
                })
                .catch((err) => {
                    console.error('EmailJS error:', err);
                    showNotification('Unable to send via contact form right now. Please email directly at smitmalaviya30@gmail.com.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                });
        } else {
            showNotification('Email service is currently offline. Please email directly at smitmalaviya30@gmail.com.', 'warning');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    });

    if (testBtn) {
        testBtn.addEventListener('click', () => {
            if (typeof emailjs === 'undefined') {
                showNotification('EmailJS library is not available.', 'error');
                return;
            }
            const orig = testBtn.innerHTML;
            testBtn.disabled = true;
            testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';

            emailjs.send('service_e38iyv4', 'template_3nyenng', {
                from_name: 'Connection Test',
                from_email: 'test@example.com',
                subject: 'Email Service Health Check',
                message: 'Verifying portfolio contact relay operational status.',
                to_name: 'Smit Malaviya',
                reply_to: 'test@example.com'
            }).then(() => {
                showNotification('Email service connection verified successfully!', 'success');
                testBtn.disabled = false;
                testBtn.innerHTML = orig;
            }).catch((err) => {
                console.error('Test error:', err);
                showNotification('Connection check encountered an error. Check console.', 'error');
                testBtn.disabled = false;
                testBtn.innerHTML = orig;
            });
        });
    }
}

/* --------------------------------------------------------------------------
   11. Notification System
   -------------------------------------------------------------------------- */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;

    document.body.appendChild(notif);

    requestAnimationFrame(() => {
        notif.style.transform = 'translateX(0)';
    });

    const duration = type === 'error' ? 5000 : 3500;
    setTimeout(() => {
        notif.style.transform = 'translateX(130%)';
        setTimeout(() => notif.remove(), 400);
    }, duration);
}

/* --------------------------------------------------------------------------
   12. Utilities
   -------------------------------------------------------------------------- */
function debounce(fn, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
