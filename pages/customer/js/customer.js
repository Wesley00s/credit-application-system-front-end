const form = document.querySelector('form');
const inputs = [...document.querySelectorAll('.inpt')];
const btn = document.querySelector('.btn');
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const cpf = document.querySelector(".cpf");
const income = document.querySelector(".income");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const zipCode = document.querySelector(".zipCode");
const street = document.querySelector(".street");

const releaseSubmission = () => {
    let toAllow = true;

    inputs.forEach(input => { 
        if (input.value.trim().length < 3) {
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


const register = () => {
    fetch("http://localhost:8080/api/customers",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                cpf: cpf.value,
                income: income.value,
                email: email.value,
                password: password.value,
                zipCode: zipCode.value,
                street: street.value
            })
        })
        .then((res) => {
            console.log(res);
            btn.setAttribute('disabled', 'disabled');
            if (res.status === 201)
                alert("Success to register!");
            else 
                alert("Fail to register!");
        })
        .catch((res) => { console.log(res) })
};

const clear = () => {
    inputs.forEach((input) => { 
        input.value = '';
    });
}

form.addEventListener("submit", (e) => { 
    e.preventDefault();
    register();
    clear();
});
