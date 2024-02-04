const inputs = document.querySelectorAll('.inpt');
const inputsGet = document.querySelectorAll('.inptGet');
const btn = document.querySelector('.btn');
const btn2 = document.querySelector('.btn2');

const creditValue = document.querySelector(".creditValue");
const dayFirstInstallment = document.querySelector(".dayFirstInstallment");
const numberOfInstallments = document.querySelector(".numberOfInstallments");

const credits = document.querySelector(".credits");
const credits2 = document.querySelector(".credits2");
const credits3 = document.querySelector(".credits3");

const content1 = document.querySelector(".content1");
const content2 = document.querySelector(".content2");
const content3 = document.querySelector(".content3");

const menuBtn = document.querySelector(".menuBtn");
const menuBtn2 = document.querySelector(".menuBtn2");
const menuBtn3 = document.querySelector(".menuBtn3");

const divMenuBtn = document.querySelector(".divMenuBtn");
const divMenuBtn2 = document.querySelector(".divMenuBtn2");
const divMenuBtn3 = document.querySelector(".divMenuBtn3");

const creditCode = document.querySelector(".creditCode");
const getCreditCode = document.querySelector(".getCreditCode");

const form1 = document.querySelector(".form1");
const form2 = document.querySelector(".form2");

const customerPassword = localStorage.getItem('password');
const customerEmail = localStorage.getItem('email');

let getCustomerId;

const customerId = (customerData) => {
    console.log(customerData);
    const id = customerData.customerId;
    localStorage.setItem('customerId', id);
};

const getCustomer = () => {
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
        customerId(customerDetails);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    getCustomerId = localStorage.getItem('customerId');
};

if (customerPassword && customerEmail)
    getCustomer();

const toggleCredits = (creditsElement, contentElement, menuBtnElement) => {
    creditsElement.classList.toggle("active");
    contentElement.classList.toggle("hidden");
    contentElement.classList.toggle("activeContent");

    if (creditsElement.classList.contains("active")) {
        menuBtnElement.textContent = "";
        menuBtnElement.style.padding = "1vh";
    } else {
        menuBtnElement.style.padding = "7vh";
        menuBtnElement.textContent = "Request Credits";
    }
};

divMenuBtn.addEventListener('click', () => {
    toggleCredits(credits, content1, menuBtn);
});

divMenuBtn2.addEventListener('click', () => {
    toggleCredits(credits2, content2, menuBtn2);
});

divMenuBtn3.addEventListener('click', () => {
    toggleCredits(credits3, content3, menuBtn3);
});

const releaseSubmission = () => {
    const toAllow = [...inputs].every(input => input.value.trim().length !== 0);
    btn.disabled = !toAllow;
};

const releaseSubmissionGet = () => {
    const toAllow = [...inputsGet].every(input => input.value.trim().length !== 0);
    btn2.disabled = !toAllow;
};

inputs.forEach(input => {
    input.addEventListener('input', releaseSubmission);
});

inputsGet.forEach(input => {
    input.addEventListener('input', releaseSubmissionGet);
});

const register = () => {
    fetch("http://localhost:8080/api/credits", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            creditValue: creditValue.value,
            dayFirstInstallment: dayFirstInstallment.value,
            numberOfInstallments: numberOfInstallments.value,
            costumerId: getCustomerId
        })
    })
    .then((res) => {
        console.log(res);
        btn.disabled = true;
        if (res.status === 201) {
            alert("Success to register!");
        } else {
            alert("Fail to register!");
        }
    })
    .catch((res) => { console.log(res); });
};

const clearInputs = () => {
    inputs.forEach((input) => {
        input.value = '';
    });
};

const get = () => {
    fetch(`http://localhost:8080/api/credits/${getCreditCode.value}?customerId=${getCustomerId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
    .then((res) => {
        console.log(res);
        btn2.disabled = true;
        if (res.status === 200) {
            return res.json();
        } else {
            alert("Fail to retrieve data!");
        }
    })
    .then((creditDetails) => {
        displayCreditData(creditDetails);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const displayCreditData = (creditData) => {
    try {
        console.log("Credit Data:", creditData);

        creditCode.textContent = creditData.creditCode;
        creditCodeValue.textContent = creditData.creditValue;
        numberOfInstallmentsContent.textContent = creditData.numberOfInstallments;
        statusContent.textContent = creditData.status;
        emailCustomerContent.textContent = creditData.emailCustomer;
        incomeContent.textContent = creditData.income;

    } catch (error) {
        console.log("Cannot read data:", error);
    }
};

form1.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
    clearInputs();
});

form2.addEventListener("submit", (e) => {
    e.preventDefault();
    get();
    clearInputs();
});
