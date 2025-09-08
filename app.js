const btns = document.querySelectorAll(".buttons button");
const display = document.querySelector("form input");

// convert degree to radian
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

// always show 0 and cursor when page loads
window.onload = () => {
    display.value = "0";   // show 0 initially
    display.focus();       // keep cursor active
};

btns.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const val = button.textContent;

        // numbers or brackets
        if (button.classList.contains("number") || button.classList.contains("bracket")) {
            if (display.value === "0") {
                display.value = val; // replace initial 0
            } else {
                display.value += val; // append normally
            }
        }

        // clear last character
        else if (button.classList.contains("clear")) {
            display.value = display.value.slice(0, -1);
            if (display.value === "") display.value = "0"; // never empty
        }

        // clear all
        else if (button.classList.contains("allclear")) {
            display.value = "0";
        }

        // operators
        else if (button.classList.contains("operator")) {
            if (display.value === "0") return; // don't start with operator

            if (val === "x") {
                display.value += "x";
            } else if (val === "^") {
                display.value += "^";
            } else if (val === "%") {
                display.value += "%";
            } else if (["+", "-", "/"].includes(val)) {
                display.value += val;
            }
        }

        // equal
        else if (button.classList.contains("Equal")) {
            try {
                let operators = display.value;

                operators = operators.replace(/x/g, "*");
                operators = operators.replace(/\^/g, "**");
                operators = operators.replace(/%/g, "/100");

                display.value = eval(operators);
            } catch {
                display.value = "Error";
            }
        }

        // trig operations
        else if (button.classList.contains("operation")) {
            if (display.value === "" || display.value === "0") {
                return;
            }
            const num = parseFloat(display.value);
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

        // keep cursor at the end always
        display.focus();
        display.setSelectionRange(display.value.length, display.value.length);
    });
});
