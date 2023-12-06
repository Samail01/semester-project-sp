//Login Form
const form = document.querySelector("#login-form");
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorEl = document.getElementById('error');
console.log(form, email, password);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue && passwordValue) {
        try {
            await login(emailValue, passwordValue);
            email.value = "";
            password.value = "";
        } catch (error) {
            errorEl.textContent = error.message;
        }
    } else {
        errorEl.textContent = "Please enter a valid email and password";
    }
});

async function login(email, password) {
console.log(email, password);
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/auction/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid username or password");
        }

        const data = await response.json();
        localStorage.setItem("user-token", data.accessToken);
        localStorage.setItem("user-data", JSON.stringify(data));

        console.log(data);

    } catch (error) {
        throw error;
    }
}
