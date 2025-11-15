// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
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

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        }
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Get error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        const formSuccess = document.getElementById('formSuccess');
        
        // Reset previous errors
        let isValid = true;
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        formSuccess.style.display = 'none';
        
        // Validate name
        if (!name.value.trim()) {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (name.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        } else if (subject.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = nameError.textContent ? name :
                             emailError.textContent ? email :
                             subjectError.textContent ? subject :
                             messageError.textContent ? message : null;
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Real-time validation feedback
    const formFields = ['name', 'email', 'subject', 'message'];
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field && errorElement) {
            field.addEventListener('blur', function() {
                validateField(field, errorElement);
            });
            
            field.addEventListener('input', function() {
                if (errorElement.textContent) {
                    validateField(field, errorElement);
                }
            });
        }
    });
}

// Individual field validation
function validateField(field, errorElement) {
    const value = field.value.trim();
    errorElement.textContent = '';
    
    if (field.id === 'name') {
        if (!value) {
            errorElement.textContent = 'Name is required';
        } else if (value.length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
        }
    } else if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            errorElement.textContent = 'Email is required';
        } else if (!emailRegex.test(value)) {
            errorElement.textContent = 'Please enter a valid email address';
        }
    } else if (field.id === 'subject') {
        if (!value) {
            errorElement.textContent = 'Subject is required';
        } else if (value.length < 3) {
            errorElement.textContent = 'Subject must be at least 3 characters';
        }
    } else if (field.id === 'message') {
        if (!value) {
            errorElement.textContent = 'Message is required';
        } else if (value.length < 10) {
            errorElement.textContent = 'Message must be at least 10 characters';
        }
    }
}

// Add smooth scroll behavior for better UX and update active nav link
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const floatingCta = document.getElementById('floatingCta');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show floating CTA when user scrolls down
    if (floatingCta) {
        if (window.scrollY > 300) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll (simple fade-in effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, portfolio cards, and other animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .value-card, .team-card, .service-detail-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

