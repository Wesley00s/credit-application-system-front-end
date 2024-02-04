const form = document.querySelector('form');
const btn = document.querySelector('.btn');
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const cpf = document.querySelector(".CPF");
const income = document.querySelector(".income");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const zipCode = document.querySelector(".zipCode");
const street = document.querySelector(".street");

const customerEmail = localStorage.getItem('email');
const customerPassword = localStorage.getItem('password');


const customerData = (customerData) => {

    firstName.textContent = customerData.firstName
    lastName.textContent = customerData.lastName
    cpf.textContent = customerData.cpf
    income.textContent = customerData.income
    email.textContent = customerData.email
    zipCode.textContent = customerData.zipCode
    street.textContent = customerData.street
};

const get = () => {
    fetch(`http://localhost:8080/api/customers/${customerEmail}/${customerPassword}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
    .then((res) => {
        console.log(res);
        if (res.status === 200) {
            return res.json();
        } else {
            alert("Fail to retrieve data!");
        }
    })
    .then((customerDetails) => {
        customerData(customerDetails);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

if (customerEmail && customerPassword) {
    get();
}
