// Configuration object for easy customization
const settings = {
    socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>' },
        { platform: 'Instagram', url: 'https://instagram.com', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>' },
        { platform: 'Twitter', url: 'https://twitter.com', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>' }
        // Replace these URLs with your own social media links
    ]
};

// Populate social links
const socialLinksContainer = document.getElementById('socialLinks');
settings.socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.innerHTML = link.icon;
    a.setAttribute('aria-label', `Follow us on ${link.platform}`);
    socialLinksContainer.appendChild(a);
});

// Navigation scroll effect
const navContainer = document.querySelector('.nav-container');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }
});

menuToggle.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
});

// Keyboard support for menu toggle
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    }
});

// Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');

        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const animateElements = () => {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .campaign-post, .contact-form, .about-img');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => observer.observe(element));
};

window.addEventListener('load', animateElements);

// Portfolio lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioModal = document.querySelector('.portfolio-modal');
const modalImg = document.querySelector('.modal-img');
const focusableElements = 'img[tabindex="0"]';
const modalFocusable = portfolioModal.querySelectorAll(focusableElements);
const firstFocusable = modalFocusable[0];
const lastFocusable = modalFocusable[modalFocusable.length - 1];

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('.portfolio-img').src;
        const imgAlt = item.querySelector('.portfolio-img').alt;
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        portfolioModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        modalImg.focus();
    });

    // Keyboard support
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const imgSrc = item.querySelector('.portfolio-img').src;
            const imgAlt = item.querySelector('.portfolio-img').alt;
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            portfolioModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            modalImg.focus();
        }
    });
});

portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        portfolioModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal.classList.contains('open')) {
        portfolioModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Focus trapping for portfolio modal
portfolioModal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// Contact form validation and demo submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const projectTypeInput = document.getElementById('projectType');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const projectTypeError = document.getElementById('projectTypeError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Real-time validation
[nameInput, emailInput, projectTypeInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (input.id === 'email') {
            errorElement.style.display = validateEmail(input.value) || input.value === '' ? 'none' : 'block';
        } else {
            errorElement.style.display = input.value.trim() === '' ? 'block' : 'none';
        }
    });
});

const showFormMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.opacity = '1';
    setTimeout(() => {
        formMessage.style.opacity = '0';
    }, 5000);
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    projectTypeError.style.display = 'none';
    messageError.style.display = 'none';
    formMessage.style.opacity = '0';

    // Validate inputs
    if (nameInput.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
        emailError.style.display = 'block';
        isValid = false;
    }

    if (projectTypeInput.value.trim() === '') {
        projectTypeError.style.display = 'block';
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        messageError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Simulate successful submission for demo
        showFormMessage('Thank you for your inquiry! This is a demo submission.', 'success');
        contactForm.reset();
        // For production, replace with Formspree or backend submission:
        /*
        fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showFormMessage('Thank you for your inquiry! We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('There was an error submitting your form. Please try again.', 'error');
            }
        })
        .catch(() => {
            showFormMessage('There was an error submitting your form. Please try again.', 'error');
        });
        */
    }
});