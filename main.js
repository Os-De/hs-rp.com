// DOM elements
const tabBtns = document.querySelectorAll('.tab-btn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', handleTabSwitch);
    });

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    // Real-time validation
    setupRealTimeValidation();
}

// Tab Switching
function handleTabSwitch(e) {
    const targetTab = e.target.dataset.tab;
    
    // Update tab buttons
    tabBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update form containers
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    
    if (targetTab === 'login') {
        loginFormContainer.classList.add('active');
        registerFormContainer.classList.remove('active');
        clearFormErrors(loginForm);
    } else {
        registerFormContainer.classList.add('active');
        loginFormContainer.classList.remove('active');
        clearFormErrors(registerForm);
    }
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    
    // Clear previous errors
    clearFormErrors(loginForm);
    
    let isValid = true;
    
    // Validate email/username
    if (!email.value.trim()) {
        showError('login-email', 'Email or username is required');
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        showError('login-password', 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        showError('login-password', 'Password must be at least 8 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Placeholder functionality
        showSuccessMessage('Login functionality will be implemented with backend');
        
        // Log for demonstration
        console.log('Login attempt:', {
            email: email.value,
            password: '***hidden***'
        });
        
        // Reset form
        loginForm.reset();
    }
}

// Register Handler
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('register-username');
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password');
    const confirmPassword = document.getElementById('register-confirm-password');
    
    // Clear previous errors
    clearFormErrors(registerForm);
    
    let isValid = true;
    
    // Validate username
    if (!username.value.trim()) {
        showError('register-username', 'Username is required');
        isValid = false;
    } else if (username.value.length < 3) {
        showError('register-username', 'Username must be at least 3 characters');
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        showError('register-username', 'Username can only contain letters, numbers, and underscores');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError('register-email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('register-email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        showError('register-password', 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        showError('register-password', 'Password must be at least 8 characters');
        isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
        showError('register-password', 'Password must contain uppercase, lowercase, and number');
        isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword.value.trim()) {
        showError('register-confirm-password', 'Please confirm your password');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError('register-confirm-password', 'Passwords do not match');
        isValid = false;
    }
    
    if (isValid) {
        // Placeholder functionality
        showSuccessMessage('Register functionality will be implemented with backend');
        
        // Log for demonstration
        console.log('Registration attempt:', {
            username: username.value,
            email: email.value,
            password: '***hidden***'
        });
        
        // Reset form
        registerForm.reset();
    }
}

// Setup Real-time Validation
function setupRealTimeValidation() {
    // Email validation on blur
    const loginEmail = document.getElementById('login-email');
    const registerEmail = document.getElementById('register-email');
    
    loginEmail.addEventListener('blur', () => {
        if (!loginEmail.value.trim()) {
            showError('login-email', 'Email or username is required');
        } else {
            clearError('login-email');
        }
    });
    
    registerEmail.addEventListener('blur', () => {
        if (registerEmail.value && !isValidEmail(registerEmail.value)) {
            showError('register-email', 'Please enter a valid email address');
        } else {
            clearError('register-email');
        }
    });
    
    // Password match validation
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirm-password');
    
    registerConfirmPassword.addEventListener('input', () => {
        if (registerConfirmPassword.value && registerPassword.value !== registerConfirmPassword.value) {
            showError('register-confirm-password', 'Passwords do not match');
        } else {
            clearError('register-confirm-password');
        }
    });
}

// Validation Helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
        inputElement.classList.add('error');
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('error');
    }
}

function clearFormErrors(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    const errors = form.querySelectorAll('.form-error');
    errors.forEach(error => {
        error.textContent = '';
    });
}

function showSuccessMessage(message) {
    alert(message);
}
