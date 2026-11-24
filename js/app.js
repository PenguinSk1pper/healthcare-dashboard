//Pages navigation
let nav = document.querySelector("#navigation").querySelectorAll("img");
let sections = document.querySelectorAll("section");

nav.forEach(element => {
    element.addEventListener("click", function() {
        sections.forEach(sec => {
            sec.style.display = "none";
        });

        let index = element.id.indexOf("-");
        let getSection = document.querySelector(`#${element.id.slice(0, index)}`);

        getSection.style.display = "flex";
    });
});

//Forms validation
function showError(field, message) {
    let errorMessage = document.createElement("span");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message");
    field.insertAdjacentElement("afterend", errorMessage);
}

function checkValidityOfBirthDate(field) {
    let birthDate = new Date(field.value);
    let currentDate = new Date();

    let errorMessage = field.parentElement.querySelector(".error-message");
    if (!(birthDate.getDate() >= 1 && birthDate.getDate() <= 31 && birthDate.getMonth() >= 0 && birthDate.getMonth() <= 11 && birthDate.getFullYear() >= 1936 && birthDate.getFullYear() <= currentDate.getFullYear())) {
        if (!errorMessage)
            showError(field, "Data introdusa trebuie sa fie valida!");
        return false;
    }
    
    if (errorMessage) {
        errorMessage.remove();
        errorMessage = null;
    }

    let varsta = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()))
        varsta--;

    if (varsta < 18) {
        showError(field, "Tebuie sa ai cel putin 18 ani!");
        return false;
    }

    return true;
}

function checkValidity(formular) {
    let fields = formular.elements;
    for (let field of fields) {
        if (field.required && field.value.trim() === "")
            return false;

        if (field.type === "number" && field.value !== "") {
            let valoare = Number(field.value);

            if (field.min !== "" && valoare < Number(field.min))
                return false;

            if (field.max !== "" && valoare > Number(field.max))
                return false;
        }
    };

    let radioRows = formular.querySelectorAll(".radio-row");
    for (let radioRow of radioRows) {
        let radioOptions = radioRow.querySelectorAll('input[type="radio"]');
        let isChecked = false;
        for (let radioOption of radioOptions)
            if (radioOption.checked) {
                isChecked = true;
                break;
            }

        if (!isChecked) {
            return false;
        }
    };

    return true;
}

function calculateBMI(weight, height) {
    return (weight/(Math.pow(Number(height)/100, 2))).toFixed(1);
}

//Forms results
const evaluationFormular = document.getElementById("evaluation-formular");
evaluationFormular.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!checkValidity(evaluationFormular))
        return;

    let dob = evaluationFormular.querySelector("#dob");
    if (!checkValidityOfBirthDate(dob))
        return;
    
    //Add BMI in form
    let weight = evaluationFormular.querySelector("#weight").value;
    let height = evaluationFormular.querySelector("#height").value;

    let imc = calculateBMI(weight, height);

    let imcResult = evaluationFormular.querySelector("#imc-result");
    imcResult.textContent = imc;

    
});