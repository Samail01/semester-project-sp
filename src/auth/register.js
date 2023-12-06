//Register Form
const form = document.querySelector("#register-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const avatarInput = document.querySelector("#avatar");
const errorEl = document.querySelector("#error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const avatarValue = avatarInput.value.trim();

    if (nameValue && emailValue && passwordValue) {
        try {
            await register(nameValue, emailValue, passwordValue, avatarValue);
            nameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
            avatarInput.value = "";
        } catch (error) {
            errorEl.textContent = error.message;
        }
    } else {
        errorEl.textContent = "Please fill out all required fields";
    }
});

async function register(name, email, password, avatar) {
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, avatar }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred during registration");
        }

        const data = await response.json();

        console.log(data);
  
        console.log("Registration successful", data);
    } catch (error) {
        throw error;
}
};