/**
 * Calculadora Simple
 * Este script maneja la funcionalidad de una calculadora básica con operaciones
 * aritméticas fundamentales (+, -, *, /).
 */

// Elementos del DOM
const screen = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-num]');
const operatorButtons = document.querySelectorAll('[data-op]');
const clearButton = document.getElementById('btn-clear');
const equalButton = document.getElementById('btn-equal');

/**
 * Inicialización de la calculadora
 */
function initCalculator() {
    // Event listeners para botones numéricos
    numberButtons.forEach(btn => {
        btn.addEventListener('click', appendNumber);
    });

    // Event listeners para botones de operadores
    operatorButtons.forEach(btn => {
        btn.addEventListener('click', appendOperator);
    });

    // Event listener para botón de limpiar
    clearButton.addEventListener('click', clearScreen);

    // Event listener para botón de igual
    equalButton.addEventListener('click', calculateResult);
}

/**
 * Añade un número al display
 */
function appendNumber() {
    screen.value += this.dataset.num;
}

/**
 * Añade un operador al display
 */
function appendOperator() {
    screen.value += this.dataset.op;
}

/**
 * Limpia el display de la calculadora
 */
function clearScreen() {
    screen.value = '';
}

/**
 * Calcula el resultado de la expresión en el display
 * Implementa una alternativa más segura que eval()
 */
function calculateResult() {
    try {
        // Obtener la expresión del display
        const expression = screen.value;
        
        // Validar que solo contenga números y operadores permitidos
        if (!isValidExpression(expression)) {
            throw new Error('Expresión no válida');
        }
        
        // Calcular el resultado usando Function constructor en lugar de eval
        // Esto es más seguro porque limita el contexto de ejecución
        const result = Function('"use strict"; return (' + expression + ')')();
        
        // Mostrar el resultado, formateado si es necesario
        screen.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch (error) {
        screen.value = 'Error';
        console.error('Error al calcular:', error);
    }
}

/**
 * Valida que la expresión solo contenga caracteres permitidos
 * @param {string} expr - La expresión a validar
 * @returns {boolean} - true si la expresión es válida
 */
function isValidExpression(expr) {
    // Permite números, operadores básicos y punto decimal
    return /^[0-9+\-*/.() ]+$/.test(expr);
}

// Iniciar la calculadora
initCalculator();