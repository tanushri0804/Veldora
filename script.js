// script.js
function toggleForm(formType) {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.remove('active');
    document.querySelectorAll('.form-toggle button').forEach(btn => btn.classList.remove('active'));

    if (formType === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.querySelector('.form-toggle button:nth-child(1)').classList.add('active');
    } else {
        document.getElementById('signup-form').classList.add('active');
        document.querySelector('.form-toggle button:nth-child(2)').classList.add('active');
    }
}

function validateSignup() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    if (password !== confirmPassword) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        alert('Signup successful!');
    }
}

particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: '#ffffff',
        },
        shape: {
            type: 'circle',
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: 3,
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
        },
    },
});
