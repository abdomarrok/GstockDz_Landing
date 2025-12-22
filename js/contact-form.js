// ==========================================
// CONTACT FORM WITH EMAILJS
// ==========================================

// Initialize EmailJS
// IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'tSSVhRceq1cjEuYwS',  // ✅ EmailJS public key
    SERVICE_ID: 'service_b9lhkfm',        // ✅ Gmail service ID
    TEMPLATE_ID: 'template_6cyafwl'       // ✅ Contact Us template
};

// Initialize EmailJS when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if credentials are set
    if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
});

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');
        const formMessage = document.getElementById('form-message');

        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
            showFormMessage('error', '⚠️ يرجى تكوين EmailJS أولاً. راجع js/contact-form.js');
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitText.textContent = 'جاري الإرسال...';
        submitSpinner.classList.remove('hidden');
        formMessage.classList.add('hidden');

        try {
            // Send email using EmailJS
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                this
            );

            console.log('SUCCESS!', response.status, response.text);

            // Show success message
            showFormMessage('success', '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');

            // Show success toast
            if (typeof showToast === 'function') {
                showToast('تم إرسال الرسالة بنجاح!', 'success');
            }

            // Reset form
            this.reset();

        } catch (error) {
            console.error('FAILED...', error);

            // Show error message
            showFormMessage('error', '❌ فشل إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر البريد الإلكتروني مباشرة.');

            // Show error toast
            if (typeof showToast === 'function') {
                showToast('فشل في إرسال الرسالة', 'error');
            }

        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitText.textContent = 'إرسال';
            submitSpinner.classList.add('hidden');
        }
    });
}

// Helper function to show form messages
function showFormMessage(type, message) {
    const formMessage = document.getElementById('form-message');

    formMessage.textContent = message;
    formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');

    if (type === 'success') {
        formMessage.classList.add('bg-green-100', 'text-green-800');
    } else {
        formMessage.classList.add('bg-red-100', 'text-red-800');
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}
