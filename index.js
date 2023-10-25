let clickCount = 0; 
document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(document.getElementById('sign-in-template').content);
});

function User(email, userName, password) {
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.conected = false;
}

document.getElementById('sign-up-btn').addEventListener('click', saveUser)

function saveUser() {
    const email = document.getElementById('email').value;
    const userName = document.getElementById('uname').value;
    const password = document.getElementById('pass').value;
    localStorage.setItem(userName, JSON.stringify(new User(email, userName, password)))
}

const checkValidation = (elementId, regex, messageId) => {
    const message = document.getElementById(messageId);
    const inputElement = document.getElementById(elementId);

    if (!regex.test(inputElement.value)) {
        message.classList.add("show");
    } else {
        if (message.classList.contains('show')) {
            message.classList.remove('show');
        }
    }
}

const comfirmPass = () => {
    const message = document.getElementById("confirm-pass-error-check");
    if(document.getElementById('pass').value !== 
    document.getElementById('confirm-pass').value) {
        message.classList.add("show");
    } else {
        if (message.classList.contains('show')) {
            message.classList.remove('show');
        }
    }
}

document.getElementById("email").addEventListener('input', () => {
    checkValidation("email", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "email-error-check");
});

document.getElementById("uname").addEventListener('input', () => {
    checkValidation("uname", /^[A-Za-z0-9]{4,}$/, "uname-error-check");
});

document.getElementById("pass").addEventListener('input', () => {
    checkValidation("pass", /^(?=.*[A-Z])(?=.*\d).{8,}$/, "pass-error-check");
});

document.getElementById("confirm-pass").addEventListener('input', comfirmPass);


document.getElementById('sign-in-btn').addEventListener('click', accessAccount)




//! i would like to go throgh this function with you
function accessAccount() {
    const userNameInput = document.getElementById('uname').value;
    const passwordInput = document.getElementById('pass').value;
    if (userNameInput === '' || passwordInput === '') {
        showMistakeMessage('Please put in the required fields', 3000);
    }
    else if (localStorage.getItem(userNameInput) === null) {
        showMistakeMessage('Your username or password is incorrect or you dont have have an account, creat one down below', 5000);
    }
    else {
        let user = JSON.parse(localStorage.getItem(userNameInput));
        console.log(user)
        if (user.userName === userNameInput && user.password === passwordInput) {
            user.conected = true;
            localStorage.setItem(user.userName , JSON.stringify(user));
            window.location.assign("gamePage.html");
        }
        else {
        showMistakeMessage('Your username or password is incorrect or you dont have have an account, creat one down below', 5000);
        }
    }
}

function deleteMassage() {
    document.getElementById('mistake-alert').classList.add('hidden');
}

const showMistakeMessage = (message, time) => {
    const messageElement = document.getElementById('mistake-alert');
    messageElement.textContent = message;
    messageElement.classList.remove('hidden');
    setTimeout(deleteMassage, time);
}




document.getElementById("counter").addEventListener("click", () =>{
    clickCount++;
    localStorage.setItem("counter",JSON.stringify(clickCount))
    document.getElementById("count-display").textContent = `score: ${clickCount}`;
});