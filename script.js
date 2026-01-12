// ==========================================
// AHMED'S PORTFOLIO - MAIN JAVASCRIPT FILE
// ==========================================

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, danger, info, warning)
 */
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.custom-toast');
    existingToasts.forEach(toast => toast.remove());

    // Create new toast
    const toastDiv = document.createElement('div');
    toastDiv.className = `custom-toast custom-toast-${type}`;
    toastDiv.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle toast-icon"></i>
            <span class="toast-message">${message}</span>
        </div>
    `;

    document.body.appendChild(toastDiv);

    // Trigger fade-in animation
    setTimeout(() => {
        toastDiv.classList.add('show');
    }, 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toastDiv.classList.remove('show');
        setTimeout(() => {
            if (toastDiv.parentNode) {
                toastDiv.remove();
            }
        }, 300);
    }, 4000);
}

/**
 * Backward compatibility alias for showToast
 */
function showAlert(message, type) {
    showToast(message, type);
}

// ==========================================
// THEME MANAGEMENT (DARK/LIGHT MODE)
// ==========================================

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createToggleButton();
        this.bindEvents();
    }

    createToggleButton() {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'themeToggle';
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.innerHTML = `
            <i class="fas ${this.currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}"></i>
        `;
        toggleBtn.setAttribute('aria-label', 'Toggle theme');

        // Insert after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.appendChild(toggleBtn);
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#themeToggle')) {
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.updateToggleIcon();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#667eea');
        }
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    updateToggleIcon() {
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = `fas ${this.currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`;
        }
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showAlert('Please fill in all fields.', 'danger');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }

            // Simulate form submission (replace with actual backend call)
            showAlert('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            this.reset();
        });
    }
}

// ==========================================
// PROJECT CARD HOVER EFFECTS
// ==========================================

function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// TYPING ANIMATION FOR HERO SECTION
// ==========================================

function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }
}

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==========================================
// KEYBOARD NAVIGATION FOR ACCESSIBILITY
// ==========================================

function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Ctrl + Home
        if (e.ctrlKey && e.key === 'Home') {
            e.preventDefault();
            const mainContent = document.querySelector('#home');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

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

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// PLAN INTERACTIONS
// ==========================================

function initPlanInteractions() {
    const planCards = document.querySelectorAll('.plan-card');

    planCards.forEach(card => {
        const chooseBtn = card.querySelector('.btn');
        chooseBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all cards
            planCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked card
            card.classList.add('active');

            // Show confirmation
            const planName = card.querySelector('.card-header h4').textContent;
            showAlert(`You've selected the ${planName} plan!`, 'info');
        });
    });
}

// ==========================================
// PAYMENT MODAL FUNCTIONALITY
// ==========================================

function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const detailsModal = document.getElementById('paymentDetailsModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const detailsModalCloseBtn = document.getElementById('detailsModalCloseBtn');
    const cancelPaymentBtn = document.getElementById('cancelPayment');
    const confirmPaymentBtn = document.getElementById('confirmPayment');
    const backToPaymentBtn = document.getElementById('backToPayment');
    const completePaymentBtn = document.getElementById('completePayment');
    const choosePlanBtns = document.querySelectorAll('.plan-card .btn');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentRadios = document.querySelectorAll('.payment-radio');

    let selectedPaymentMethod = '';

    // Open modal when "Choose Plan" buttons are clicked
    choosePlanBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling

        // Reset payment selection
        paymentOptions.forEach(option => option.classList.remove('selected'));
        paymentRadios.forEach(radio => radio.checked = false);
        confirmPaymentBtn.disabled = true;

        // Show "Plan removed" notification
        showToast('Plan removed', 'danger');
    }

    function closeDetailsModal() {
        detailsModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling

        // Reset forms
        resetPaymentForms();
    }

    // Close modal when clicking X button
    modalCloseBtn.addEventListener('click', closeModal);
    detailsModalCloseBtn.addEventListener('click', closeDetailsModal);

    // Close modal when clicking Cancel button
    cancelPaymentBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    detailsModal.addEventListener('click', function(e) {
        if (e.target === detailsModal) {
            closeDetailsModal();
        }
    });

    // Handle payment option selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            this.classList.add('selected');

            // Check the corresponding radio button
            const radio = this.querySelector('.payment-radio');
            radio.checked = true;

            // Store selected method
            selectedPaymentMethod = radio.value;

            // Enable confirm button
            confirmPaymentBtn.disabled = false;
        });
    });

    // Handle radio button changes
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Remove selected class from all options
                paymentOptions.forEach(opt => opt.classList.remove('selected'));

                // Add selected class to parent option
                this.closest('.payment-option').classList.add('selected');

                // Store selected method
                selectedPaymentMethod = this.value;

                // Enable confirm button
                confirmPaymentBtn.disabled = false;
            }
        });
    });

    // Handle payment confirmation - Open details modal
    confirmPaymentBtn.addEventListener('click', function() {
        // Close first modal
        modal.classList.remove('show');

        // Open details modal
        detailsModal.classList.add('show');

        // Show appropriate form based on selected method
        showPaymentForm(selectedPaymentMethod);
    });

    // Handle back to payment button
    backToPaymentBtn.addEventListener('click', function() {
        // Close details modal
        detailsModal.classList.remove('show');

        // Reopen first modal
        modal.classList.add('show');

        // Reset forms
        resetPaymentForms();
    });

    // Handle complete payment
    completePaymentBtn.addEventListener('click', function() {
        if (validatePaymentForm(selectedPaymentMethod)) {
            // Close modal
            detailsModal.classList.remove('show');
            document.body.style.overflow = '';

            // Show success notification
            showToast('Payment successful', 'success');

            // Reset everything
            resetPaymentForms();
            paymentOptions.forEach(option => option.classList.remove('selected'));
            paymentRadios.forEach(radio => radio.checked = false);
            confirmPaymentBtn.disabled = true;
            selectedPaymentMethod = '';
        }
    });

    // Helper functions
    function showPaymentForm(method) {
        // Hide all forms
        document.querySelectorAll('.payment-form').forEach(form => {
            form.style.display = 'none';
        });

        // Show selected form
        let formId = '';
        let title = '';

        switch(method) {
            case 'phone':
                formId = 'phoneWalletForm';
                title = 'Phone Wallet Payment';
                break;
            case 'bank':
                formId = 'bankAccountForm';
                title = 'Bank Account Payment';
                break;
            case 'card':
                formId = 'cardForm';
                title = 'Card Payment';
                break;
        }

        document.getElementById(formId).style.display = 'block';
        document.getElementById('paymentDetailsTitle').textContent = title;
    }

    function resetPaymentForms() {
        // Reset all form inputs
        document.querySelectorAll('.payment-form input').forEach(input => {
            input.value = '';
        });

        // Hide all forms
        document.querySelectorAll('.payment-form').forEach(form => {
            form.style.display = 'none';
        });
    }

    function validatePaymentForm(method) {
        let isValid = true;
        let formInputs = [];

        switch(method) {
            case 'phone':
                formInputs = ['walletName', 'walletNumber', 'walletPassword'];
                break;
            case 'bank':
                formInputs = ['bankName', 'accountNumber', 'bankNameField', 'bankPassword'];
                break;
            case 'card':
                formInputs = ['cardName', 'cardNumber', 'expiryDate', 'cvv', 'cardPassword'];
                break;
        }

        formInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (!input.value.trim()) {
                input.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                input.style.borderColor = '#ced4da';
            }
        });

        // Additional validation for card number
        if (method === 'card') {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                document.getElementById('cardNumber').style.borderColor = '#dc3545';
                isValid = false;
            }
        }

        // Additional validation for expiry date
        if (method === 'card') {
            const expiryDate = document.getElementById('expiryDate').value;
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(expiryDate)) {
                document.getElementById('expiryDate').style.borderColor = '#dc3545';
                isValid = false;
            }
        }

        // Additional validation for CVV
        if (method === 'card') {
            const cvv = document.getElementById('cvv').value;
            if (cvv.length < 3 || cvv.length > 4) {
                document.getElementById('cvv').style.borderColor = '#dc3545';
                isValid = false;
            }
        }

        if (!isValid) {
            showToast('Please fill in all required fields correctly.', 'danger');
        }

        return isValid;
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initContactForm();
    initProjectHoverEffects();
    initTypingAnimation();
    initScrollProgress();
    initKeyboardNavigation();
    initLazyLoading();
    initPlanInteractions();
    initPaymentModal();

    // Initialize theme manager
    new ThemeManager();

    // Add CSS for active plan
    const planStyle = document.createElement('style');
    planStyle.textContent = `
        .plan-card.active {
            border-color: #28a745 !important;
            box-shadow: 0 0 20px rgba(40, 167, 69, 0.3) !important;
        }
    `;
    document.head.appendChild(planStyle);
});
