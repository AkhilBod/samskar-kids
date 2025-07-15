// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.program-card, .activity-card, .gallery-item, .contact-item, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Logo letters interactive animation
document.querySelectorAll('.logo-text .letter').forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.animation = 'none';
        letter.style.transform = `scale(1.3) rotate(${Math.random() * 20 - 10}deg)`;
    });
    
    letter.addEventListener('mouseleave', () => {
        letter.style.animation = `bounce 2s ease-in-out infinite`;
        letter.style.animationDelay = `${index * 0.1}s`;
        letter.style.transform = '';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const program = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !phone) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We will contact you soon.', 'success');
        contactForm.reset();
    });
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const successMessage = formStatus.querySelector('.success-message');
    const errorMessage = formStatus.querySelector('.error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Submit the form using Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Show success message
                    formStatus.style.display = 'block';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // Show error message
                formStatus.style.display = 'block';
                successMessage.style.display = 'none';
                errorMessage.style.display = 'block';
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add floating animation to shapes
document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add program card hover effects
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add gallery lightbox effect (simplified)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(1.1)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
});

// Lazy loading for better performance
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add star rating animation
function animateStars() {
    const stars = document.querySelectorAll('.rating-badge .stars i');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.2)';
            star.style.color = '#FFD700';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Animate stars when rating badge is visible
const ratingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStars();
            ratingObserver.unobserve(entry.target);
        }
    });
});

const ratingBadge = document.querySelector('.rating-badge');
if (ratingBadge) {
    ratingObserver.observe(ratingBadge);
}

// Gallery toggle function
function toggleGallery(button) {
    const hiddenItems = document.querySelectorAll('.hidden-gallery');
    button.classList.toggle('expanded');
    
    hiddenItems.forEach(item => {
        item.classList.toggle('show');
    });
    
    if (button.classList.contains('expanded')) {
        button.querySelector('span').textContent = 'Show Less';
        button.querySelector('i').classList.remove('fa-images');
        button.querySelector('i').classList.add('fa-chevron-up');
    } else {
        button.querySelector('span').textContent = 'View More Photos';
        button.querySelector('i').classList.remove('fa-chevron-up');
        button.querySelector('i').classList.add('fa-images');
        // Smooth scroll to the last visible image
        const lastVisible = document.querySelector('.gallery-item:not(.hidden-gallery):last-child');
        if (lastVisible) {
            lastVisible.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// LKG Section Scroll
const programsContainer = document.querySelector('.programs-grid');
const scrollArrow = document.querySelector('.programs .container::before');

// Add click event on the programs container's parent
document.querySelector('.programs .container').addEventListener('click', (e) => {
    // Check if the click was near the right edge (where the arrow is)
    const containerRect = e.currentTarget.getBoundingClientRect();
    const clickPositionFromRight = containerRect.right - e.clientX;
    
    if (clickPositionFromRight <= 100) { // Arrow area width
        const scrollAmount = programsContainer.offsetWidth * 0.8; // Scroll 80% of container width
        programsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // If we're at the end, scroll back to start
        if (programsContainer.scrollLeft + programsContainer.offsetWidth >= programsContainer.scrollWidth - 50) {
            programsContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }
});

// Handle program section scrolling
document.addEventListener('DOMContentLoaded', () => {
    const programsSection = document.querySelector('.programs .container');
    let scrollAmount = 0;
    const scrollStep = 300; // Adjust this value to control scroll distance

    programsSection.addEventListener('click', (e) => {
        // Check if click was in the right 100px of the container (where arrow is)
        const rect = programsSection.getBoundingClientRect();
        if (e.clientX > rect.right - 100) {
            // Calculate maximum scroll
            const maxScroll = programsContainer.scrollWidth - programsContainer.clientWidth;
            
            // If we're at the end, go back to start
            if (scrollAmount >= maxScroll) {
                scrollAmount = 0;
            } else {
                // Otherwise, scroll right
                scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
            }

            // Smooth scroll to new position
            programsContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
});
