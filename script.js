const passwordElement = document.querySelector('#password');
const copiedText = document.querySelector('.copied-text');
const copyIcon = document.querySelector('.copy-icon');
const sliderBottom = document.querySelector('#slider-bottom');
const sliderTop = document.querySelector('#slider-top');
const uppercaseCheckbox = document.querySelector('#uppercase-checkbox');
const lowercaseCheckbox = document.querySelector('#lowercase-checkbox');
const numbersCheckbox = document.querySelector('#numbers-checkbox');
const symbolsCheckbox = document.querySelector('#symbols-checkbox');
const allCheckboxes = document.querySelectorAll('.checkbox');
const strengthText = document.querySelector('#strength-text');
const allStrengthBoxes = document.querySelectorAll('.strength-box');

const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
};
let allowedChars = '';
let strength = 0;
let password = '';


passwordElement.classList.add('null-password');

sliderTop.addEventListener('input', () => {
    sliderBottom.value = sliderTop.value;
    updateStrengthMeter();
});

uppercaseCheckbox.addEventListener('change', updateStrengthMeter);
lowercaseCheckbox.addEventListener('change', updateStrengthMeter);
numbersCheckbox.addEventListener('change', updateStrengthMeter);
symbolsCheckbox.addEventListener('change', updateStrengthMeter);

function updateStrengthMeter() {
    const charLength = parseInt(document.querySelector('#charLength').textContent);
    determineAllowedChars();

    allStrengthBoxes.forEach((box) => {
        box.classList.remove('strong');
        box.classList.remove('medium');
        box.classList.remove('weak');
        box.classList.remove('very-weak');
    });

    // Calculates password entropy
    strength = (Math.log(allowedChars.length ** charLength) / Math.log(2));

    if (strength >= 60) {
        strengthText.textContent = 'STRONG';
        allStrengthBoxes.forEach((box) => {
            box.classList.add('strong');
        });
    }
    if (strength < 60 && strength > 40) {
        strengthText.textContent = 'MEDIUM';
        allStrengthBoxes[0].classList.add('medium');
        allStrengthBoxes[1].classList.add('medium');
        allStrengthBoxes[2].classList.add('medium');
    }
    if (strength <= 40 && strength > 20) {
        strengthText.textContent = 'WEAK';
        allStrengthBoxes[0].classList.add('weak');
        allStrengthBoxes[1].classList.add('weak');
    }
    if (strength <= 20) {
        strengthText.textContent = 'VERY WEAK';
        allStrengthBoxes[0].classList.add('very-weak');
    }
    if (strength <= 0) {
        strengthText.textContent = '';
        allStrengthBoxes.forEach((box) => {
            box.classList.remove('strong');
            box.classList.remove('medium');
            box.classList.remove('weak');
            box.classList.remove('very-weak');
        });
    }
}

function generatePassword() {
    const charLength = parseInt(document.querySelector('#charLength').textContent);
    password = '';
    determineAllowedChars();

    if (charLength === 0 || allowedChars.length === 0) {
        password = 'P4$5W0rD!';
        passwordElement.classList.add('null-password');
    }
    else {
        for (i = 0; i < charLength; i++) {
            let randomNum = Math.floor(Math.random() * allowedChars.length);
            let randomChar = allowedChars[randomNum];
            password += randomChar;
        }
        passwordElement.classList.remove('null-password');
    }

    passwordElement.textContent = password;
}

function determineAllowedChars() {
    allowedChars = '';

    if (uppercaseCheckbox.checked === true) {
        allowedChars += chars.uppercase;
    }
    if (lowercaseCheckbox.checked === true) {
        allowedChars += chars.lowercase;
    }
    if (numbersCheckbox.checked === true) {
        allowedChars += chars.numbers;
    }
    if (symbolsCheckbox.checked === true) {
        allowedChars += chars.symbols;
    }
}

function copyPassword() {
    navigator.clipboard.writeText(password);

    copiedText.classList.remove('hidden');
    copyIcon.classList.add('alert');

    setTimeout(() => {
        copiedText.classList.add('hidden');
        copyIcon.classList.remove('alert');
    }, 2000);
}