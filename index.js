const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
let prevValue = "";
const operators = ["%", "/", "*", "-", "+"];
const specialSymbols = ["c", "=", "⌫", ".", "+/-"];

// Event delegation (through bubbling) is used here
// to avoid attaching event to each buttons
buttonContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName !== "BUTTON") {
    return;
  }

  const value = evt.target.textContent.trim();
  console.log(value);

  switch (value) {
    case "=":
      // avoid evaluation if last character is operator
      // Like 7/=
      if ([...operators, ...specialSymbols].includes(prevValue)) {
        return;
      }

      // evaluate the mathematical expression
      try {
        let expression = display.textContent;

        // handle %
        expression = expression.replace(/%/g, "/100*");

        display.textContent = eval(expression);
      } catch (err) {
        display.textContent = "Error";
      }
      break;
    case "⌫":
      display.textContent = display.textContent.slice(0, -1);
      break;
    case "+/-":
      // Toggle +/- in the starting number
      const currentText = display.textContent;
      if (currentText.charAt(0) === "-") {
        display.textContent = currentText.slice(1);
      } else {
        display.textContent = "-" + currentText;
      }
      break;

    case "c":
      // clear the text
      display.textContent = "";
      break;

    case "<":

    default:
      // Avoid adding operator twice
      if (operators.includes(value) && operators.includes(prevValue)) {
        return;
      }

      display.textContent += value;
      prevValue = value;
      break;
  }
});
