// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navigation = document.querySelector('nav');

    if (mobileMenuButton) {
        let isMenuOpen = false;
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden';
        mobileMenu.innerHTML = `
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/" class="nav-link block px-3 py-2">Home</a>
                <a href="about.html" class="nav-link block px-3 py-2">About Us</a>
                <a href="services.html" class="nav-link block px-3 py-2">Services</a>
                <a href="contact.html" class="nav-link block px-3 py-2">Contact</a>
                <a href="booking.html" class="btn-primary block text-center mt-4">Book Appointment</a>
            </div>
        `;
        mobileMenu.style.display = 'none';
        navigation.appendChild(mobileMenu);

        mobileMenuButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.style.display = isMenuOpen ? 'block' : 'none';
        });
    }
});

// Form validation for booking and contact forms
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
            
            // Create or update error message
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
            errorMsg.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
        } else {
            input.classList.remove('border-red-500');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });

    return isValid;
}

// Handle booking form submission
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(bookingForm)) return;

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
                window.location.href = 'confirmation.html';
            } else {
                alert('Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(contactForm)) return;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}