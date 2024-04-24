const passwordElement = document.querySelector('#password');
const sliderBottom = document.querySelector('#slider-bottom');
const sliderTop = document.querySelector('#slider-top');
const uppercaseCheckbox = document.querySelector('#uppercase-checkbox');
const lowercaseCheckbox = document.querySelector('#lowercase-checkbox');
const numbersCheckbox = document.querySelector('#numbers-checkbox');
const symbolsCheckbox = document.querySelector('#symbols-checkbox');
const allCheckboxes = document.querySelectorAll('.checkbox');
const strengthText = document.querySelector('#strength-text');

const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
};
let strength = 0;
let charLengthStrength = 10;
let charTypeStrength = 4;

passwordElement.classList.add('null-password');

sliderTop.addEventListener('input', () => {
    sliderBottom.value = sliderTop.value;
    updateStrengthMeter();
});

uppercaseCheckbox.addEventListener('change', updateCharTypeStrength);
lowercaseCheckbox.addEventListener('change', updateCharTypeStrength);
numbersCheckbox.addEventListener('change', updateCharTypeStrength);
symbolsCheckbox.addEventListener('change', updateCharTypeStrength);

function updateCharTypeStrength() {
    charTypeStrength = 0;

    allCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            charTypeStrength++;
        }
    });

    updateStrengthMeter();
}

function updateStrengthMeter() {
    charLengthStrength = parseInt(document.querySelector('#charLength').textContent);
    strength = charLengthStrength + charTypeStrength;
    console.log(strength);

    if (strength >= 16) {
        strengthText.textContent = 'HIGH';
    }
    if (strength <= 12) {
        strengthText.textContent = 'MEDIUM';
    }
    if (strength <= 8){
        strengthText.textContent = 'LOW';
    }
    
}

function generate() {
    const charLength = parseInt(document.querySelector('#charLength').textContent);
    let allowedChars = '';
    let password = '';

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