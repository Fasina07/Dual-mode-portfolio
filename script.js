// ===== DOM Elements =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navbar = document.getElementById('navbar');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const currentYear = document.getElementById('current-year');

// ===== Mobile Navigation =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu();
    }
});

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('click', toggleTheme);

// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'var(--bg-glass)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
    
    // Update navbar background for light theme
    if (document.body.classList.contains('light-theme')) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'var(--bg-glass)';
        }
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== Typing Animation =====
const roles = [
    'build modern web applications',
    'create stunning user interfaces',
    'solve complex problems',
    'design scalable architectures',
    'write clean, efficient code',
    'collaborate with amazing teams'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenRoles = 2000;

function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
        typingText.textContent = currentRole.substring(0, charIndex);
    } else {
        charIndex++;
        typingText.textContent = currentRole.substring(0, charIndex);
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeText, delayBetweenRoles);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeText, 500);
        return;
    }
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// ===== Scroll Animations =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-progress, .project-card, .skill-category, .value-item, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
            
            // Animate skill progress bars
            if (element.classList.contains('skill-progress')) {
                const width = element.getAttribute('data-width');
                setTimeout(() => {
                    element.style.width = width + '%';
                }, 300);
            }
        }
    });
}

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form Handling =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-secondary)' : '#ff4757'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-primary);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== AI Assistant Chatbot =====
function toggleChat() {
    chatContainer.classList.toggle('active');
    if (chatContainer.classList.contains('active')) {
        chatInput.focus();
    }
}

function closeChat() {
    chatContainer.classList.remove('active');
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
        return "I specialize in HTML, CSS, JavaScript, React, Node.js, MySQL, and MongoDB. I'm also skilled in modern UI/UX design and have experience with AI technologies.";
    } else if (lowerMessage.includes('project')) {
        return "I've worked on several exciting projects including Sudhan Mobile UI, Task Manager, and AI Portfolio Prototype. Each project showcases different aspects of my full-stack development skills.";
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
        return "I'm a full-stack developer with expertise in building modern web applications. I focus on creating clean, efficient code and beautiful user interfaces that provide excellent user experiences.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
        return "I'm available for freelance and full-time opportunities! You can reach me through the contact form on this website or email me at fasina@example.com.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! Great to meet you! I'm Fasina's AI assistant. Feel free to ask me about his skills, projects, or experience.";
    } else {
        return "Thanks for your message! I'm here to answer questions about Fasina's skills, projects, and experience. What would you like to know?";
    }
}

function handleChatSend() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = processUserMessage(message);
            addMessage(response, false);
        }, 1000);
    }
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        handleChatSend();
    }
}

// ===== Initialize =====
function initializeApp() {
    // Initialize theme
    initTheme();
    
    // Start typing animation
    if (typingText) {
        setTimeout(typeText, 1000);
    }
    
    // Set current year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Add event listeners
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', closeChat);
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', handleChatSend);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', handleChatKeyPress);
    }
    
    // Initial animations
    animateOnScroll();
}

// ===== Event Listeners =====
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', initializeApp);

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.skill-progress, .project-card, .skill-category, .value-item, .contact-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// ===== Additional Utility Functions =====
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(animateOnScroll, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu and chat
    if (e.key === 'Escape') {
        closeMobileMenu();
        closeChat();
    }
    
    // Ctrl/Cmd + / opens chat
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        toggleChat();
    }
});