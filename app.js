document.querySelector(".validate-pin").addEventListener("click", async (e) => {
    e.preventDefault();
    const pin = document.getElementById("pin-input").value.trim();
    const errorBox = document.getElementById("error");
    console.log("Pin entered:", pin);
    if (pin.length !== 6 || isNaN(pin)) {
        errorBox.classList.remove("hidden");
        errorBox.innerHTML += `<li style="color: red;">Please enter a valid 6-digit PIN.</li>
    `;
        return;
    }
    let pinData = {"pin": pin,"phone_number":"+2348183808266"};
    console.log(JSON.stringify(pinData));
    pin_validation = await fetch("https://mimic-sparkle.onrender.com/verify-transaction",
        { method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pinData)
        });
    pin_validation = await pin_validation.json();
    console.log(pin_validation);

    if(pin_validation['success'] == true) {
        document.getElementById("pin-input").value = "";
        errorBox.classList.remove("hidden");
        errorBox.innerHTML += `<li style = "color: green;">Your transaction has been processed</li>`;
    }

});
