//Page navigation
let nav = document.querySelector("#navigation").querySelectorAll("img");
let sections = document.querySelectorAll("section");

nav.forEach(element => {
    element.addEventListener("click", function() {
        sections.forEach(sec => {
            sec.style.display = "none";
        });

        let index = element.id.indexOf("-");
        let getSection = document.querySelector(`#${element.id.slice(0, index)}`);

        getSection.style.display = "block";
    });
});

