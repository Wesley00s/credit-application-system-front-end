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
            

            login.addEventListener('click', () => {

                if (login.textContent == "Logout") {
                    if (confirm('Are you sure you want to logout?')) {
                        localStorage.removeItem("password");
                        localStorage.removeItem("email");
                        localStorage.removeItem("customerId");
                    } else {
                        login.href = '.';
                    }
                } 
            });
            
        } else {
            console.log("Fail to retrieve data!");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

if (password && email) get();