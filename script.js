// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features with performance optimization
    initGlobalBackground();
    initCyberpunkBackground();
    initTypingAnimation();
    initCounterAnimation();
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initProjectFilters();
    initTerminalEffects();
    initPerformanceOptimizations();
});

// Global Background Animation (Optimized)
function initGlobalBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'global-bg';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -3;
        opacity: 0.1;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 250));
    
    // Simplified particle system for global background
    const particles = [];
    const maxParticles = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
    
    class GlobalParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 65, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new GlobalParticle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections (optimized)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(particles[i].x - particles[j].x, 2) + 
                    Math.pow(particles[i].y - particles[j].y, 2)
                );
                
                if (distance < 150) {
                    const opacity = (150 - distance) / 150 * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Cyberpunk Background Animation
function initCyberpunkBackground() {
    const canvas = document.getElementById('cyberpunk-bg');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.connections = [];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 65, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    
    // Hex grid
    class HexGrid {
        constructor() {
            this.hexSize = 40;
            this.hexes = [];
            this.createHexes();
        }
        
        createHexes() {
            const cols = Math.ceil(canvas.width / (this.hexSize * 1.5));
            const rows = Math.ceil(canvas.height / (this.hexSize * Math.sqrt(3)));
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * this.hexSize * 1.5;
                    const y = row * this.hexSize * Math.sqrt(3) + (col % 2) * this.hexSize * Math.sqrt(3) / 2;
                    this.hexes.push({ x, y, opacity: Math.random() * 0.1 + 0.05 });
                }
            }
        }
        
        draw() {
            this.hexes.forEach(hex => {
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = i * Math.PI / 3;
                    const x = hex.x + this.hexSize * Math.cos(angle);
                    const y = hex.y + this.hexSize * Math.sin(angle);
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${hex.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        }
    }
    
    const hexGrid = new HexGrid();
    
    // Floating code snippets
    class CodeSnippet {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.text = this.getRandomCode();
            this.opacity = Math.random() * 0.3 + 0.1;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
        }
        
        getRandomCode() {
            const codes = [
                '0x1F4A9', '0xDEAD', '0xBEEF', '0xCAFE',
                'sudo rm -rf /', 'git commit -m "fix"',
                'SELECT * FROM users', 'npm install',
                'docker run', 'kubectl apply',
                'ssh root@', 'ping 8.8.8.8'
            ];
            return codes[Math.floor(Math.random() * codes.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.font = '12px JetBrains Mono';
            ctx.fillStyle = `rgba(0, 255, 65, ${this.opacity})`;
            ctx.fillText(this.text, this.x, this.y);
        }
    }
    
    const codeSnippets = [];
    for (let i = 0; i < 8; i++) {
        codeSnippets.push(new CodeSnippet());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw hex grid
        hexGrid.draw();
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between nearby particles
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        // Update and draw code snippets
        codeSnippets.forEach(snippet => {
            snippet.update();
            snippet.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-animation');
    const words = ['Pentesting', 'AI Security', 'Blockchain', 'Threat Analysis', 'Smart Contracts', 'Adversarial ML'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar with extra padding
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .certification-card, .badge-card, .stat-card, .connect-category');
    animatedElements.forEach(el => observer.observe(el));
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    // Lazy load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Optimize scroll events
    let ticking = false;
    function updateScroll() {
        // Add any scroll-based animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Orbitron:wght@400;700;900&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// EmailJS Configuration and Form Handling
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN = 30000; // 30 seconds between submissions

function initFormHandling() {
    // Initialize EmailJS with enhanced error handling
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded');
            showNotification('Email service not available. Please check your internet connection.', 'error');
            return;
        }
        
        emailjs.init("dQmrhnlupg0TUCIgL");
        console.log('EmailJS initialized successfully with Public Key: dQmrhnlupg0TUCIgL');
        
        // Test EmailJS availability
        if (emailjs.send) {
            console.log('EmailJS send function is available');
        } else {
            console.error('EmailJS send function not available');
        }
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
        showNotification('Email service initialization failed. Please refresh the page.', 'error');
        return;
    }
    
    const contactForm = document.getElementById('contact-form');
    const testBtn = document.getElementById('test-btn');
    
    if (!contactForm) {
        console.error('Contact form not found');
        showNotification('Contact form not found. Please refresh the page.', 'error');
        return;
    }
    
    console.log('Contact form found and ready for handling');
    
    // Initialize form elements
    const formElements = {
        name: contactForm.querySelector('#name'),
        email: contactForm.querySelector('#email'),
        subject: contactForm.querySelector('#subject'),
        message: contactForm.querySelector('#message'),
        submitBtn: contactForm.querySelector('#submit-btn'),
        charCount: contactForm.querySelector('#char-count')
    };
    
    // Error message elements
    const errorElements = {
        name: contactForm.querySelector('#name-error'),
        email: contactForm.querySelector('#email-error'),
        subject: contactForm.querySelector('#subject-error'),
        message: contactForm.querySelector('#message-error')
    };
    
    // Add character counter functionality
    if (formElements.message && formElements.charCount) {
        formElements.message.addEventListener('input', () => {
            const length = formElements.message.value.length;
            formElements.charCount.textContent = length;
            
            // Change color based on length
            if (length > 900) {
                formElements.charCount.style.color = '#ff5f56';
            } else if (length > 800) {
                formElements.charCount.style.color = '#ffbd2e';
            } else {
                formElements.charCount.style.color = '#00d4ff';
            }
        });
    }
    
    // Real-time validation
    Object.keys(formElements).forEach(key => {
        if (formElements[key] && formElements[key].tagName === 'INPUT' || formElements[key].tagName === 'TEXTAREA') {
            formElements[key].addEventListener('blur', () => validateField(key, formElements[key].value));
            formElements[key].addEventListener('input', () => clearFieldError(key));
        }
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submission started');
        
        // Rate limiting check
        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
            const remainingTime = Math.ceil((SUBMISSION_COOLDOWN - (now - lastSubmissionTime)) / 1000);
            showNotification(`Please wait ${remainingTime} seconds before sending another message`, 'warning');
            return;
        }
        
        // Validate all fields
        const isValid = validateAllFields();
        if (!isValid) {
            showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        console.log('Form data collected:', { name, email, subject, message: message?.substring(0, 50) + '...' });
        
        // Trim whitespace
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();
        
        // Update button state
        setSubmitButtonLoading(true);
        
        // Prepare template parameters
        const templateParams = {
            from_name: trimmedName,
            from_email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
            to_name: 'Smit Malaviya',
            reply_to: trimmedEmail
        };
        
        console.log('Template parameters prepared:', templateParams);
        console.log('Using Service ID: service_e38iyv4');
        console.log('Using Template ID: template_3nyenng');
        
        // Send email using EmailJS with enhanced error handling
        try {
            emailjs.send(
                'service_e38iyv4',
                'template_3nyenng',
                templateParams
            )
            .then(function(response) {
                console.log('EmailJS SUCCESS!', response);
                console.log('Status:', response.status);
                console.log('Text:', response.text);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                resetCharCounter();
                setSubmitButtonLoading(false);
                lastSubmissionTime = Date.now();
            }, function(error) {
                console.error('EmailJS FAILED!', error);
                console.error('Error details:', {
                    status: error.status,
                    text: error.text,
                    message: error.message,
                    stack: error.stack
                });
                
                let errorMessage = 'Failed to send message. Please try again or email me directly.';
                
                // Provide more specific error messages
                if (error.status === 400) {
                    errorMessage = 'Invalid request. Please check your EmailJS configuration.';
                } else if (error.status === 401) {
                    errorMessage = 'Authentication failed. Please check your EmailJS Public Key.';
                } else if (error.status === 404) {
                    errorMessage = 'Service or template not found. Please check your EmailJS Service ID and Template ID.';
                } else if (error.status === 429) {
                    errorMessage = 'Too many requests. Please wait a moment and try again.';
                } else if (error.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
                
                showNotification(errorMessage, 'error');
                setSubmitButtonLoading(false);
            });
        } catch (sendError) {
            console.error('Exception during emailjs.send:', sendError);
            showNotification('Unexpected error occurred. Please try again.', 'error');
            setSubmitButtonLoading(false);
        }
    });
    
    // Test button handler
    if (testBtn) {
        testBtn.addEventListener('click', testEmailJSConnection);
    }
    
    // Helper functions
    function validateField(fieldName, value) {
        const trimmedValue = value.trim();
        
        switch (fieldName) {
            case 'name':
                if (!trimmedValue) {
                    showFieldError('name', 'Name is required');
                    return false;
                }
                if (trimmedValue.length < 2) {
                    showFieldError('name', 'Name must be at least 2 characters');
                    return false;
                }
                break;
                
            case 'email':
                if (!trimmedValue) {
                    showFieldError('email', 'Email is required');
                    return false;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(trimmedValue)) {
                    showFieldError('email', 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'subject':
                if (!trimmedValue) {
                    showFieldError('subject', 'Subject is required');
                    return false;
                }
                if (trimmedValue.length < 5) {
                    showFieldError('subject', 'Subject must be at least 5 characters');
                    return false;
                }
                break;
                
            case 'message':
                if (!trimmedValue) {
                    showFieldError('message', 'Message is required');
                    return false;
                }
                if (trimmedValue.length < 10) {
                    showFieldError('message', 'Message must be at least 10 characters');
                    return false;
                }
                if (trimmedValue.length > 1000) {
                    showFieldError('message', 'Message must be less than 1000 characters');
                    return false;
                }
                break;
        }
        
        clearFieldError(fieldName);
        return true;
    }
    
    function validateAllFields() {
        let isValid = true;
        
        Object.keys(formElements).forEach(key => {
            if (formElements[key] && (formElements[key].tagName === 'INPUT' || formElements[key].tagName === 'TEXTAREA')) {
                if (!validateField(key, formElements[key].value)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function showFieldError(fieldName, message) {
        if (errorElements[fieldName]) {
            errorElements[fieldName].textContent = message;
            errorElements[fieldName].classList.add('show');
        }
        
        if (formElements[fieldName]) {
            formElements[fieldName].style.borderColor = '#ff5f56';
        }
    }
    
    function clearFieldError(fieldName) {
        if (errorElements[fieldName]) {
            errorElements[fieldName].textContent = '';
            errorElements[fieldName].classList.remove('show');
        }
        
        if (formElements[fieldName]) {
            formElements[fieldName].style.borderColor = '';
        }
    }
    
    function setSubmitButtonLoading(loading) {
        if (formElements.submitBtn) {
            if (loading) {
                formElements.submitBtn.classList.add('loading');
                formElements.submitBtn.disabled = true;
            } else {
                formElements.submitBtn.classList.remove('loading');
                formElements.submitBtn.disabled = false;
            }
        }
    }
    
    function resetCharCounter() {
        if (formElements.charCount) {
            formElements.charCount.textContent = '0';
            formElements.charCount.style.color = '#00d4ff';
        }
    }
    
    // Enhanced test function for debugging
    function testEmailJSConnection() {
        console.log('=== EmailJS Connection Test ===');
        console.log('EmailJS object available:', typeof emailjs !== 'undefined');
        console.log('EmailJS send function available:', typeof emailjs.send === 'function');
        console.log('Public Key:', 'dQmrhnlupg0TUCIgL');
        console.log('Service ID:', 'service_e38iyv4');
        console.log('Template ID:', 'template_3nyenng');
        
        const testParams = {
            from_name: 'Test User',
            from_email: 'test@example.com',
            subject: 'Test Message',
            message: 'This is a test message to verify EmailJS is working.',
            to_name: 'Smit Malaviya',
            reply_to: 'test@example.com'
        };
        
        console.log('Sending test email with params:', testParams);
        
        // Show loading state on test button
        const originalText = testBtn.innerHTML;
        testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
        testBtn.disabled = true;
        
        emailjs.send('service_e38iyv4', 'template_3nyenng', testParams)
            .then(function(response) {
                console.log('✅ EmailJS test successful:', response);
                showNotification('EmailJS test successful! Check console for details.', 'success');
                testBtn.innerHTML = originalText;
                testBtn.disabled = false;
            }, function(error) {
                console.error('❌ EmailJS test failed:', error);
                showNotification('EmailJS test failed! Check console for details.', 'error');
                testBtn.innerHTML = originalText;
                testBtn.disabled = false;
            });
    }
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-category]');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Professional Terminal Functionality
function initTerminalEffects() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    
    if (!terminalOutput || !terminalInput) return;
    
    function addOutputLine(command, output) {
        const outputLine = document.createElement('div');
        outputLine.className = 'output-line';
        outputLine.innerHTML = `
            <span class="prompt">$</span>
            <span class="command">${command}</span>
        `;
        terminalOutput.appendChild(outputLine);
        
        if (output) {
            const outputContent = document.createElement('div');
            outputContent.className = 'output-content';
            outputContent.innerHTML = output;
            terminalOutput.appendChild(outputContent);
        }
        
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function processCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        switch(cmd) {
            case 'about':
                addOutputLine('about', `
                    <div class="profile-info">
                        <h3>Smit Malaviya</h3>
                        <p class="title">Cybersecurity Specialist & Ethical Hacker</p>
                        <p class="description">Passionate about protecting digital assets and securing systems. Specialized in penetration testing, vulnerability assessment, and security architecture. I focus on identifying and mitigating security risks while helping organizations build robust defense mechanisms.</p>
                    </div>
                `);
                break;
            case 'skills':
                addOutputLine('skills', `
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h4>🔒 Security Tools</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Nmap</span>
                                <span class="skill-tag">Wireshark</span>
                                <span class="skill-tag">Metasploit</span>
                                <span class="skill-tag">Burp Suite</span>
                                <span class="skill-tag">OWASP ZAP</span>
                                <span class="skill-tag">Kali Linux</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>🛡️ Security Domains</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Network Security</span>
                                <span class="skill-tag">Web App Security</span>
                                <span class="skill-tag">Mobile Security</span>
                                <span class="skill-tag">Cloud Security</span>
                                <span class="skill-tag">Incident Response</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>💻 Technical Skills</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Python</span>
                                <span class="skill-tag">Bash Scripting</span>
                                <span class="skill-tag">SQL Injection</span>
                                <span class="skill-tag">XSS</span>
                                <span class="skill-tag">Cryptography</span>
                                <span class="skill-tag">Forensics</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h4>📋 Certifications</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">CompTIA Security+</span>
                                <span class="skill-tag">CEH</span>
                                <span class="skill-tag">CISSP</span>
                                <span class="skill-tag">OSCP</span>
                                <span class="skill-tag">Bug Bounty</span>
                            </div>
                        </div>
                    </div>
                `);
                break;
            case 'experience':
                addOutputLine('experience', `
                    <div class="experience-list">
                        <div class="experience-item">
                            <div class="exp-header">
                                <span class="exp-title">Security Analyst</span>
                                <span class="exp-period">2023 - Present</span>
                            </div>
                            <p class="exp-company">CyberDefense Corp</p>
                            <p class="exp-description">Conducted vulnerability assessments on enterprise networks. Performed penetration testing on web applications. Developed security policies and procedures. Responded to security incidents and threats.</p>
                        </div>
                        <div class="experience-item">
                            <div class="exp-header">
                                <span class="exp-title">Junior Penetration Tester</span>
                                <span class="exp-period">2022 - 2023</span>
                            </div>
                            <p class="exp-company">SecureNet Solutions</p>
                            <p class="exp-description">Executed security audits for client systems. Identified and documented security vulnerabilities. Created detailed security assessment reports. Assisted in security awareness training.</p>
                        </div>
                        <div class="experience-item">
                            <div class="exp-header">
                                <span class="exp-title">Security Researcher</span>
                                <span class="exp-period">2021 - Present</span>
                            </div>
                            <p class="exp-company">Independent</p>
                            <p class="exp-description">Participated in bug bounty programs. Researched emerging security threats. Contributed to open-source security tools. Published security advisories and findings.</p>
                        </div>
                    </div>
                `);
                break;
            case 'contact':
                addOutputLine('contact', `
                    <div class="contact-info">
                        <p><strong>Email:</strong> smitmalaviya2006@gmail.com</p>
                        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/smit-malaviya-164185228/" target="_blank">/smitmalaviya</a></p>
                        <p><strong>GitHub:</strong> <a href="https://github.com/smitmalaviya" target="_blank">/smitmalaviya</a></p>
                        <p><strong>Location:</strong> India</p>
                        <p><strong>Availability:</strong> Open to new opportunities</p>
                    </div>
                `);
                break;
            case 'resume':
                addOutputLine('resume', `
                    <div class="resume-info">
                        <p>Opening resume in new tab...</p>
                        <p><a href="assets/resume/smit-malaviya-resume.pdf" target="_blank" class="resume-link">📄 Download Resume</a></p>
                    </div>
                `);
                setTimeout(() => {
                    window.open('assets/resume/smit-malaviya-resume.pdf', '_blank');
                }, 1000);
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            case 'help':
                addOutputLine('help', `
                    <div class="help-menu">
                        <h4>Available Commands:</h4>
                        <div class="command-list">
                            <div class="command-item">
                                <span class="cmd-name">about</span>
                                <span class="cmd-desc">- View detailed information about me</span>
                            </div>
                            <div class="command-item">
                                <span class="cmd-name">skills</span>
                                <span class="cmd-desc">- Display technical skills and expertise</span>
                            </div>
                            <div class="command-item">
                                <span class="cmd-name">experience</span>
                                <span class="cmd-desc">- Show work experience and projects</span>
                            </div>
                            <div class="command-item">
                                <span class="cmd-name">contact</span>
                                <span class="cmd-desc">- Get contact information</span>
                            </div>
                            <div class="command-item">
                                <span class="cmd-name">resume</span>
                                <span class="cmd-desc">- Download my resume</span>
                            </div>
                            <div class="command-item">
                                <span class="cmd-name">clear</span>
                                <span class="cmd-desc">- Clear terminal output</span>
                            </div>
                        </div>
                    </div>
                `);
                break;
            default:
                if (command.trim()) {
                    addOutputLine(command, `
                        <div class="error-message">
                            Command not found: ${command}<br>
                            Type 'help' for available commands.
                        </div>
                    `);
                }
        }
    }
    
    // Event listener for input
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value;
                processCommand(command);
                terminalInput.value = '';
            }
        });
        
        // Focus on input when terminal is clicked
        terminalOutput.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
    
    // Add dynamic CSS for additional styles
    const style = document.createElement('style');
    style.textContent = `
        .contact-info p {
            margin: 8px 0;
            color: #b0b0b0;
        }
        
        .contact-info a {
            color: #4CAF50;
            text-decoration: none;
        }
        
        .contact-info a:hover {
            text-decoration: underline;
        }
        
        .resume-info {
            color: #b0b0b0;
        }
        
        .resume-link {
            color: #4CAF50;
            text-decoration: none;
            font-weight: 600;
        }
        
        .resume-link:hover {
            text-decoration: underline;
        }
        
        .error-message {
            color: #ff5f56;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#00ff41';
            break;
        case 'error':
            backgroundColor = '#ff5f56';
            break;
        case 'warning':
            backgroundColor = '#ffbd2e';
            break;
        default:
            backgroundColor = '#00d4ff';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${backgroundColor};
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds for errors, 3 seconds for others
    const duration = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.matrix-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Glitch Effect
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.name, .section-title');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 2px #00ff00
            `;
            element.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.textShadow = '';
            element.style.animation = '';
        });
    });
}

// Add glitch animation to CSS
const glitchCSS = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

const style = document.createElement('style');
style.textContent = glitchCSS;
document.head.appendChild(style);

// Initialize additional effects
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initGlitchEffect();
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search functionality here
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate matrix rain effect
        const matrixRain = document.querySelector('.matrix-rain');
        if (matrixRain) {
            matrixRain.style.opacity = '0.3';
            setTimeout(() => {
                matrixRain.style.opacity = '0.1';
            }, 3000);
        }
        konamiCode = [];
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingCSS = `
body:not(.loaded) {
    overflow: hidden;
}

body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

body:not(.loaded)::after {
    content: 'Loading...';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--accent-green);
    font-family: 'Orbitron', monospace;
    font-size: 1.5rem;
    z-index: 10000;
    animation: blink 1s infinite;
}
`;

const loadingStyle = document.createElement('style');
loadingStyle.textContent = loadingCSS;
document.head.appendChild(loadingStyle);
