class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.updateDisplay();
        this.initThemeToggle();
    }

    initThemeToggle() {
        const themeBtn = document.querySelector('.theme-btn');
        const savedTheme = localStorage.getItem('calculatorTheme');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeBtn.textContent = '☀️';
        } else {
            themeBtn.textContent = '🌙';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            themeBtn.textContent = isLight ? '☀️' : '🌙';
            localStorage.setItem('calculatorTheme', isLight ? 'light' : 'dark');
        });
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    executeFunction(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) && !['random', 'pi', 'e'].includes(func)) return;

        switch (func) {
            case 'sin':
                this.currentOperand = Math.sin(current * Math.PI / 180).toString();
                break;
            case 'cos':
                this.currentOperand = Math.cos(current * Math.PI / 180).toString();
                break;
            case 'tan':
                this.currentOperand = Math.tan(current * Math.PI / 180).toString();
                break;
            case 'sinh':
                this.currentOperand = Math.sinh(current).toString();
                break;
            case 'cosh':
                this.currentOperand = Math.cosh(current).toString();
                break;
            case 'tanh':
                this.currentOperand = Math.tanh(current).toString();
                break;
            case 'sqrt':
                if (current < 0) {
                    alert('Cannot calculate square root of negative number');
                    return;
                }
                this.currentOperand = Math.sqrt(current).toString();
                break;
            case 'cbrt':
                this.currentOperand = Math.cbrt(current).toString();
                break;
            case 'power':
                this.currentOperand = Math.pow(current, 2).toString();
                break;
            case 'log':
                if (current <= 0) {
                    alert('Cannot calculate logarithm of zero or negative number');
                    return;
                }
                this.currentOperand = Math.log10(current).toString();
                break;
            case 'ln':
                if (current <= 0) {
                    alert('Cannot calculate natural logarithm of zero or negative number');
                    return;
                }
                this.currentOperand = Math.log(current).toString();
                break;
            case 'exp':
                this.currentOperand = Math.exp(current).toString();
                break;
            case 'pi':
                this.currentOperand = Math.PI.toString();
                break;
            case 'e':
                this.currentOperand = Math.E.toString();
                break;
            case 'abs':
                this.currentOperand = Math.abs(current).toString();
                break;
            case 'factorial':
                if (current < 0 || !Number.isInteger(current)) {
                    alert('Factorial is only defined for positive integers');
                    return;
                }
                this.currentOperand = this.factorial(current).toString();
                break;
            case 'random':
                this.currentOperand = Math.random().toString();
                break;
            case 'round':
                this.currentOperand = Math.round(current).toString();
                break;
        }
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = (prev * current) / 100;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = 
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            document.querySelector('.previous-operand').textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation} =`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}

const calculator = new Calculator();

// Event Listeners
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('.function').forEach(button => {
    button.addEventListener('click', () => {
        calculator.executeFunction(button.getAttribute('data-action'));
        calculator.updateDisplay();
    });
});

document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        let operation = e.key;
        if (operation === '*') operation = '×';
        if (operation === '/') operation = '÷';
        calculator.chooseOperation(operation);
        calculator.updateDisplay();
    }
    if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }
    if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    if (e.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});
