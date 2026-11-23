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
function showError(camp, message) {
    let errorMessage = document.createElement("span");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message");
    camp.insertAdjacentElement("afterend", errorMessage);
}

function checkValidity(formular) {
    let campuri = formular.elements;
    for (let camp of campuri) {
        if (camp.required && camp.value.trim() === "")
            return false;

        if (camp.type === "number" && camp.value !== "") {
            let valoare = Number(camp.value);

            if (camp.min !== "" && valoare < Number(camp.min))
                return false;

            if (camp.max !== "" && valoare > Number(camp.max))
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

        if (!isChecked)
                return false;
    };

    return true;
}

//Forms results
const evaluationFormular = document.getElementById("evaluation-formular");
evaluationFormular.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!checkValidity(evaluationFormular))
        return;
    
});