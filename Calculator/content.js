let result = document.querySelector('.result');
let expression = '';

// Ajout d'un écouteur d'événements pour les touches du clavier
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (!isNaN(key) || key === '.' || key === 'Backspace' || key === '=' || key === '+' || key === '-' || key === '*' || key === '/') {
    handleKeyPress(key);
  }
});

// Récupération de tous les éléments .item
const items = document.querySelectorAll('.item');

// Ajout d'un écouteur d'événements pour chaque élément .item
items.forEach(item => {
  item.addEventListener('click', function() {
    const content = item.innerText;
    handleKeyPress(content);
  });
});

function handleKeyPress(key) {
  if (key === '=') {
    evaluateExpression();
  } else if (key === 'Backspace') {
    clearLastEntry();
  } else if (key === 'C') {
    clearExpression();
  } else {
    appendToExpression(key);
  }
}

function evaluateExpression() {
  try {
    if (expression.trim() === '') {
      result.innerText = 'Error';
      return;
    }

    const resultValue = eval(expression);

    if (!isFinite(resultValue)) {
      result.innerText = 'Error';
      expression = '';
      return;
    }

    result.innerText = resultValue;
    expression = resultValue.toString();
  } catch (error) {
    console.error('Evaluation error:', error);
    result.innerText = 'Error';
    expression = '';
  }
}

function clearLastEntry() {
  expression = expression.slice(0, -1);
  result.innerText = expression;
}

function clearExpression() {
  expression = '';
  result.innerText = expression;
}

function appendToExpression(content) {
  expression += content;
  result.innerText = expression;
}
