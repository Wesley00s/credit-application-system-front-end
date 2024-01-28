const form = document.querySelector('form');
const inputs = [...document.querySelectorAll('.inpt')];
const btn = document.querySelector('.btn');
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const cpf = document.querySelector(".CPF");
const income = document.querySelector(".income");
const email = document.querySelector(".email");
const EMAIL = document.querySelector(".EMAIL");
const password = document.querySelector(".password");
const zipCode = document.querySelector(".zipCode");
const street = document.querySelector(".street");


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


const displayCustomerData = (customerData) => {

    console.log("Customer Data:", customerData);

    firstName.textContent = customerData.firstName
    lastName.textContent = customerData.lastName
    cpf.textContent = customerData.cpf
    income.textContent = customerData.income
    EMAIL.textContent = customerData.email
    zipCode.textContent = customerData.zipCode
    street.textContent = customerData.street
};

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
            return res.json();
        } else {
            alert("Fail to retrieve data!");
        }
    })
    .then((customerDetails) => {
        displayCustomerData(customerDetails);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
