// Class

class Calculator {
    constructor (previousOperatorTextElement, currentOperatorTextElement) {
        this.previousOperatorTextElement = previousOperatorTextElement;
        this.currentOperatorTextElement = currentOperatorTextElement;
        this.clear()
    }

    // Clears all the numbers and operations
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Deletes a single element
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Merge the numbers instead of add them up
    appendNumber (number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Selects the type of the operation, including addition, subtraction, division and multiplication 
    chooseOperation (operation) {
        if(this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    // Basically does all the math under the hood
    compute () {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ''
    }

    // Fixes the problem with decimal and integer values when using the dot
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    // Dinamically updates the display based on the numbers and operations typed
    updateDisplay () {
        this.currentOperatorTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperatorTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperatorTextElement.innerText = ''
        }

    } 
}


// Elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const deleteAllButton = document.querySelector('[data-all-clear]');
const previousOperatorTextElement = document.querySelector('[data-saved-operator]');
const currentOperatorTextElement = document.querySelector('[data-current-operator]');



// Instantiate new calculator
const calculator = new Calculator(previousOperatorTextElement, currentOperatorTextElement);

// Get all the numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// Get all the operations
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// Get the equal sign
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// Allows the clear function
deleteAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// Get the element that only deletes a single value
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})