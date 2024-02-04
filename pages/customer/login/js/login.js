const form = document.querySelector('form');
const inputs = [...document.querySelectorAll('.inpt')];
const btn = document.querySelector('.btn');
const email = document.querySelector(".email");
const password = document.querySelector(".password");

const releaseSubmission = () => {
    let toAllow = true;

    inputs.forEach(input => { 
        if (input.value.trim().length === 0) {
            toAllow = false;
        }
    });

    if (toAllow) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', 'disabled');
    }
}

inputs.forEach(input => {
    input.addEventListener('input', releaseSubmission);
});

const get = () => {
    fetch(`http://localhost:8080/api/customers/${email.value}/${password.value}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
    .then((res) => {
        console.log(res);
        btn.setAttribute('disabled', 'disabled');
        if (res.status === 200) {
            
            window.location.href = '../../../../pages/profile/profile.html';

        } else
            alert("Fail to retrieve data!");
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    customerPassword = localStorage.setItem('password', password.value);
    customerEmail = localStorage.setItem('email', email.value);
};

const clear = () => {
    inputs.forEach((input) => { 
        input.value = '';
    });
}

form.addEventListener("submit", (e) => { 
    e.preventDefault();
    get();
    clear();
});

