const calculatorEl = $('.calculator__elements-list').click(createOperation)
const inputEl = $('.calculator__input')
const listEl = $('.operations')

const operation = {
    firstOperand: [],
    secondOperand: [],
    operator: '',
    equal: '=',
    result: ''
}
const validOperands = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const validOperators = ['+', '-', '*', '/']

function createOperation(e) {
    inputEl.css('color', 'rgb(255, 255, 255')
    if (validOperands.includes(Number(e.target.textContent))) {
        if (operation.operator !== '') {
            operation.secondOperand.push(e.target.textContent)
        } else {
            operation.firstOperand.push(e.target.textContent)
        }
    }
    if (validOperators.includes(e.target.textContent)) {
       operation.operator = e.target.textContent 
    }
    if (e.target.textContent === operation.equal) {
        executeOperation(operation.operator)
        return
    }
    const inputElValue = `${operation.firstOperand.join('')}${operation.operator}${operation.secondOperand.join('')}`
    inputEl.attr('value', inputElValue)
    if (e.target.textContent === 'C') {
        getDefaultValue()
        inputEl.attr('value', 0)
    }
}

function executeOperation(value) {
    const firstOperandValue = Number(operation.firstOperand.join(''))
    const secondOperandValue = Number(operation.secondOperand.join(''))
    switch (value) {
        case validOperators[0]:
            operation.result = firstOperandValue + secondOperandValue
            break;
        case validOperators[1]:
            operation.result = firstOperandValue - secondOperandValue
            break;
        case validOperators[2]:
            operation.result = firstOperandValue * secondOperandValue
            break;
        case validOperators[3]:
            if (secondOperandValue !== 0) {
              operation.result = (firstOperandValue / secondOperandValue).toFixed(2)  
            } else {
                operation.result = 'ERROR'
                inputEl.css('color', 'rgb(255, 0, 0')
            }
            break;
        default:
            break;
    }
    inputEl.attr('value', operation.result)
    if (operation.result !== 'ERROR') {
        addEquation()
    }
    getDefaultValue()
}

function addEquation() {
    listEl.prepend(getEquation(operation))
    $('.operations__item-circle')
        .hover(
            function () {
                $(this).addClass('redBorder')
            },
            function () {
                $(this).removeClass('redBorder')
            }
    )
        .click(
            function () {  
                $(this).toggleClass('redCircle')
            }
    )
    $('.operations__item-cross')
        .hover(
            function () {
                $(this).addClass('redCross')
            },
            function () {
                $(this).removeClass('redCross')
            }
    )
        .click(function () {
            $(this).parent().remove()
        }
    )
    $('.operations__item-text')
        .filter(
            function () {
                return $(this).text().includes('48')
            }
    )
        .css('text-decoration', 'underline')
}
        
function getEquation(equation) {
    const { firstOperand, secondOperand, operator, equal, result } = equation
    const firstOperandValue = firstOperand.join('')
    const secondOperandValue = secondOperand.join('') 
    const operationView = `${firstOperandValue}${operator}${secondOperandValue}${equal}${result}`
    const operationItem = `<li class="operations__item">
                                <div class="operations__item-circle"></div>
                                <p class="operations__item-text">${operationView}</p>
                                <div class="operations__item-cross"></div>
                           </li>`
    return operationItem
}

function getDefaultValue() {
    operation.firstOperand = []
    operation.secondOperand = []
    operation.operator = ''
}
