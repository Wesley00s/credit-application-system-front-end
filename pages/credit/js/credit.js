const form = document.querySelector('form');
const inputs = [...document.querySelectorAll('.inpt')];
const btn = document.querySelector('.btn');
const creditValue = document.querySelector(".creditValue");
const dayFirstInstallment = document.querySelector(".dayFirstInstallment");
const numberOfInstallments = document.querySelector(".numberOfInstallments");
const costumerId = document.querySelector(".costumerId");
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


divMenuBtn.addEventListener('click', () => {
    credits.classList.toggle("active");
    content1.classList.toggle("hidden");
    content1.classList.toggle("activeContent");
    if (credits.classList.contains("active")) {
        menuBtn.textContent = "";
        menuBtn.style.padding = "1vh";
    } else {
        menuBtn.style.padding = "7vh";
        menuBtn.textContent = "Request Credits"
    }
});

divMenuBtn2.addEventListener('click', () => {
    credits2.classList.toggle("active");
    content2.classList.toggle("hidden");
    content2.classList.toggle("activeContent");
    if (credits2.classList.contains("active")) {
        menuBtn2.textContent = "";
        menuBtn2.style.padding = "1vh";
    } else {
        menuBtn2.style.padding = "7vh";
        menuBtn2.textContent = "Request Credits"
    }
});

divMenuBtn3.addEventListener('click', () => {
    credits3.classList.toggle("active");
    content3.classList.toggle("hidden");
    content3.classList.toggle("activeContent");
    if (credits3.classList.contains("active")) {
        menuBtn3.textContent = "";
        menuBtn3.style.padding = "1vh";
    } else {
        menuBtn3.style.padding = "7vh";
        menuBtn3.textContent = "Request Credits"
    }
});

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

// const displayCreditData = (creditData) => {
//     console.log("Cresit Data:", creditData);

//     creditValue.textContent = creditData.creditValue
//     dayFirstInstallment.textContent = creditData.dayFirstInstallment
//     numberOfInstallments.textContent = creditData.numberOfInstallments
//     costumerId.textContent = creditData.costumerId
// };

const register = () => {
    fetch("http://localhost:8080/api/credits",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                creditValue: creditValue.value,
                dayFirstInstallment: dayFirstInstallment.value,
                numberOfInstallments: numberOfInstallments.value,
                costumerId: costumerId.value
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
