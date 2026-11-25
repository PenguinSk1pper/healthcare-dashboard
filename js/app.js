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

//Form results
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

    let imcResult = evaluationFormular.querySelector("#imc-display");
    imcResult.textContent = imc;
});

//Gallery
let activeCategory = "all";
let galleryContainer = document.querySelector("#gallery-grid");
let filterButtons = document.querySelectorAll(".filter-btn");
displayImgByFilter("all"); //Afiseaza automat pentru categoria initiala toate

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(element => {
            element.classList.remove("active-btn");
        });

        button.classList.add("active-btn");
        activeCategory = button.id.slice(button.id.lastIndexOf("-") + 1, button.id.length);
        displayImgByFilter(activeCategory);
    });
});

function displayImgByFilter (category) {
    galleryContainer.innerHTML = "";

    if (category == "all") {
        galleryImages.forEach(image => {
            generateImg(image);
        });
    } else {
        galleryImages.forEach(image => {
            if (image.category == category) {
                generateImg(image);
            }
        });
    }
}

function generateImg(image) {
    let img = document.createElement("img");
    img.src = image.path;
    img.classList.add("gallery-img");
    img.alt = image.title;

    img.addEventListener("click", () => {
        openModal(galleryImages.indexOf(image));        
    });

    galleryContainer.append(img);
}

//Display modal of image
let currentImageIndex = 0;
function openModal(index) {
    currentImageIndex = index;
    //BLocking scroll
    document.querySelector("body").style.overflow = "hidden";

    document.querySelector("#gallery-modal").style.display = "flex";

    let img = galleryImages[index];
    document.querySelector("#modal-img").src = img.path;
    document.querySelector("#modal-img").alt = img.title;

    document.querySelector("#modal-title").textContent = img.title;
    document.querySelector("#modal-description").textContent = img.description;
    document.querySelector("#modal-position").textContent = `${index + 1}/${galleryImages.length}`;
}

//Close modal
document.querySelector("#modal-close").addEventListener("click", () => {
    document.querySelector("body").style.overflow = "";
    document.querySelector("#gallery-modal").style.display = "none";
    return;
});

//Next image
document.querySelector("#modal-next").addEventListener("click", () => {
    nextImage();
});

//Previous image
document.querySelector("#modal-prev").addEventListener("click", () => {
    prevImage();
});

function nextImage() {
    if (activeCategory == "all") {
        if (currentImageIndex + 1 < galleryImages.length)
            return openModal(currentImageIndex + 1);
        return openModal(0);
    }

    let index = currentImageIndex + 1;
    while (index < galleryImages.length) {
        if (galleryImages[index].category == activeCategory)
            return openModal(index);

        index++;
    }

    index = 0;
    while (galleryImages[index].category != activeCategory) {
        index++;
    }
    return openModal(index);
}

function prevImage() {
    if (activeCategory == "all") {
        if (currentImageIndex - 1 >= 0)
            return openModal(currentImageIndex - 1);
        return openModal(galleryImages.length - 1);
    }

    let index = currentImageIndex - 1;
    while (index >= 0) {
        if (galleryImages[index].category == activeCategory)
            return openModal(index);

        index--;
    }

    index = galleryImages.length - 1;
    while (galleryImages[index].category != activeCategory) {
        index--;
    }
    return openModal(index);
}