let customerId2 = localStorage.getItem('customerId');

const content = document.querySelector('.content3');
const createElement = (list = [creditCode, creditValue, numberOfInstallments]) => {
    const ul = document.createElement('ul');
    const pMsg = document.querySelector('.pMsg');
    pMsg.style.display = 'none';
    ul.className = 'listCredits';

    const info = [
        { label: 'Credit Code:', class: 'creditCode' },
        { label: 'Credit Value: USD', class: 'creditCodeValue' },
        { label: 'Number Of Installments:', class: 'numberOfInstallments' }
    ]

    info.forEach((e, i) => {

        const li = document.createElement('li');
        li.textContent = e.label;

        const p = document.createElement('p');
        p.className = `creditContent ${info.class}`;
        p.textContent = list[i]

        li.appendChild(p);
        ul.appendChild(li);
        content.appendChild(ul);
    });
}


let creditList = []
const credit = (creditList) => {
    creditList.forEach((credit) => {
        const list = [credit.creditCode, credit.creditValue, credit.numberOfInstallment]
        createElement(list)
    });
}

const getCredits = () => {
    fetch(`http://localhost:8080/api/credits?customerId=${customerId2}`, {
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
        } else
        alert("Fail to retrieve data!");
    })
    .then((creditDetails) => {
        credit(creditDetails);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

if (customerId2 != undefined) {
    getCredits()
}