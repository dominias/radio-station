window.addEventListener("load", (event) => {
    submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", (e) => {
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const radios = document.querySelectorAll("input[name=job]");        

        var radioUsed = false;
        
        for (let radio of radios) {
            if (radio.checked) radioUsed = true;    
        }

        if (name == null || name == "") {
            e.preventDefault();

            alert("The name has not been entered.");
        }

        else if (email == null || email == "") {
            e.preventDefault();

            alert("The email has not been entered.");
        }

        else if (!radioUsed) {
            e.preventDefault();

            alert("The user's status as full-time, part-time, or hobbyist has not been established.")
        }

        else alert("Form has been successfully completed.");
    });
});