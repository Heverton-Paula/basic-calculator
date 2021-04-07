const display = document.querySelector('.display')
const button = document.querySelector('.keys')
const calculator = document.querySelector('.calculator')
const initialState = () => calculator.dataset.previousType  == undefined || display.textContent === "0"
const decimalAction = () => calculator.dataset.previousType == 'decimal'
const operatorAction = () => calculator.dataset.previousType == 'operator'
const numberAction = () => calculator.dataset.previousType == 'number'
const resultAction = () => calculator.dataset.previousType == 'result'
const setPreviousType = x => calculator.dataset.previousType = x
const setValueA = x => calculator.dataset.valueA = x							    

const calculate = {
    Sum: (a, b) => a + b,
    Minus: (a, b) =>  a - b,
    Multiply: (a, b) =>  a * b,
    Division: (a, b) =>  a / b,
}

const calc = operator => {
    valueA = parseFloat(calculator.dataset.valueA)
    valueB = parseFloat(display.textContent)
    newCalc = calculate[operator]
    console.log('valueA :', valueA, 'valueB :', valueB)
    calculator.dataset.result = newCalc(valueA, valueB)
    display.textContent = calculator.dataset.result
    setPreviousType('result')
}

const start = {
    number: key => {
	number = key.textContent
	console.log('is decimal? ', decimalAction())
	!numberAction() && !decimalAction() || initialState() ? display.textContent = number : display.textContent += number
	setPreviousType('number')
    },
    decimal: () => {
	if  (resultAction() || operatorAction())  {
	    display.textContent = '0.'
	    setPreviousType('decimal')
	}
	
	if (display.textContent.includes('.')) return	
	numberAction || decimalAction ? display.textContent += '.' : display.textContent = '0.'
	setPreviousType('decimal')
    },
    operators: key  => {
	if (operatorAction() || initialState()) return
	!calculator.dataset.valueA ? setValueA(display.textContent) : calc(operator)
	!calculator.dataset.result ? false : calculator.dataset.valueA = calculator.dataset.result
	operator = key.className
	setPreviousType('operator')
    },
    equal: () => {
	if (!calculator.dataset.valueA || !numberAction()) return
	calc(operator)
	delete calculator.dataset.valueA
	setPreviousType('result')
    },
    clear: () => {
	display.textContent = "0"
	operator = undefined
	delete calculator.dataset.valueA
	delete calculator.dataset.previousType
	delete calculator.dataset.result
    }
}

button.addEventListener('click', click => {
    const input = click.target.matches('button') ? click.target : false
    const startCalc  = start[input.dataset.type]
    startCalc(input)
})
