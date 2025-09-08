const btns = document.querySelectorAll(".buttons button");
const display = document.querySelector("form input");

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

btns.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        //get all values on the buttons//
        const val = button.textContent;


        if (button.classList.contains("number") || button.classList.contains("bracket")) {
            //show on the screen while clicking on it//
            display.value += val;
        }


        else if (button.classList.contains("clear")) {
            display.value = display.value.slice(0, -1);
        }



        else if (button.classList.contains("allclear")) {
            display.value = "";
        }


        else if (button.classList.contains("operator")) {

            //display the operators on the display screen//

            //these operators not understand directly by the JS//
            //so we replace them with their actuall symbols//
            //which JS understand we replace them later while eval/
            if (val === "x") {
                display.value += "x";
            }
            else if (val === "^") {
                display.value += "^";
            }
            else if (val === "%") {
                display.value += "%";
            }

            //these  operators understand JS automatically//
            else if (val === "+") {
                display.value += "+";
            }
            else if (val === "-") {
                display.value += "-";
            }
            else if (val === "/") {
                display.value += "/";
            }


        }

        else if (button.classList.contains("Equal")) {
            try {

                let operators = display.value;

                // Convert symbols for JS before evaluation//
                operators = operators.replace(/x/g, "*");
                operators = operators.replace(/\^/g, "**");
                operators = operators.replace(/%/g, "/100");


                display.value = eval(operators);
            } catch {
                display.value = "Error";
            }
        }


        else if (button.classList.contains("operation")) {
            //validations//


            if (display.value === "") {
                return;
            }
            const num = parseFloat(display.value);
            //if not a number do nothing//
            if (isNaN(num)) {
                return;
            }

            if (val === "Sin") {
                display.value = Math.sin(degToRad(num)).toFixed(4);
            }
            if (val === "Cos") {
                display.value = Math.cos(degToRad(num)).toFixed(4);
            }
            if (val === "Tan") {
                display.value = Math.tan(degToRad(num)).toFixed(4);
            }
        }
    });
});
