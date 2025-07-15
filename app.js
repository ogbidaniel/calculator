// DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');
const buttons = document.querySelectorAll('.btn, .btn-func');

// State
let currentInput = '';
let previousInput = '';
let operator = null;
let justEvaluated = false;

// Utilities
const isOperator = (val) => ['+', '-', '*', '/', '%', '^'].includes(val);

const updateDisplay = () => {
  display.innerText = currentInput || '0';
  history.innerText = previousInput && operator ? `${previousInput} ${operator}` : '';
};

const clearAll = () => {
  currentInput = '';
  previousInput = '';
  operator = null;
  justEvaluated = false;
  updateDisplay();
};

const evaluate = () => {
  if (!operator || !previousInput || !currentInput) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': result = num2 !== 0 ? num1 / num2 : 'Error'; break;
    case '%': result = num1 % num2; break;
    case '^': result = Math.pow(num1, num2); break;
  }

  currentInput = result.toString();
  previousInput = '';
  operator = null;
  justEvaluated = true;
  updateDisplay();
};

// Input Handling
const handleInput = (val) => {
  if (justEvaluated && !isOperator(val)) {
    currentInput = '';
    justEvaluated = false;
  }

  if (!isNaN(val)) {
    // Number
    currentInput += val;
  } else if (val === '.') {
    if (!currentInput.includes('.')) currentInput += '.';
  } else if (isOperator(val)) {
    if (currentInput) {
      if (previousInput && operator) evaluate();
      previousInput = currentInput;
      operator = val;
      currentInput = '';
    }
  } else if (val === '=') {
    evaluate();
  } else if (val === 'AC') {
    clearAll();
  }

  updateDisplay();
};

// Event Listeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.innerText;
    handleInput(val);
  });
});

// Initialize
updateDisplay();
