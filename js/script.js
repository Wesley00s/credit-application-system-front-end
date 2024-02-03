const login = document.querySelector(".login");


const password = localStorage.getItem("password");
const email = localStorage.getItem('email');

const get = () => {
    fetch(`http://localhost:8080/api/customers/${email}/${password}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
    .then((res) => {
        console.log(res);
        if (res.status === 200) {
            login.textContent = "Logout";
            // login.style.display = "none";

            return res.json();

        } else {
            console.log("Fail to retrieve data!");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};


if (login.classList.contains('logout')) {
    
    login.addEventListener('click', alert('Logout?'));
    // login.classList.remove('logout');
    password.value = '';
    email.value = '';

} else {
    
    login.addEventListener('click', get());
    login.textContent = 'Login';

    console.log("Click login!!")
}
