const calculatorEl = $('.calculator__elements-list').on('click', createOperation)

const operation = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    equal: '=',
    result: ''
}
const validOperands = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const validOperators = ['+', '-', '*', '/']
    

function createOperation(e) {
    $('.calculator__input').removeClass('error')
    if (validOperands.includes(Number(e.target.textContent))) {
        if (operation.firstOperand !== '') {
            operation.secondOperand = e.target.textContent
        } else {
            operation.firstOperand = e.target.textContent
        }
    }
    if (validOperators.includes(e.target.textContent)) {
       operation.operator = e.target.textContent 
    }
    if (e.target.textContent === operation.equal) {
        makeOperation(operation.operator)
        return
    }
    $('.calculator__input').attr('value', `${operation.firstOperand}${operation.operator}${operation.secondOperand}`)
    if (e.target.textContent === 'C') {
        getDefaultValue()
        $('.calculator__input').attr('value', 0)
    }
}

function makeOperation(value) {
    const { firstOperand, secondOperand } = operation
    switch (value) {
        case validOperators[0]:
            operation.result = Number(firstOperand) + Number(secondOperand)
            break;
        case validOperators[1]:
            operation.result = Number(firstOperand) - Number(secondOperand)
            break;
        case validOperators[2]:
            operation.result = Number(firstOperand) * Number(secondOperand)
            break;
        case validOperators[3]:
            if (Number(secondOperand) !== 0) {
              operation.result = Number(firstOperand) / Number(secondOperand)  
            } else {
                operation.result = 'ERROR'
               $('.calculator__input').addClass('error')
            }
            break;
        default:
            break;
    }
    $('.calculator__input').attr('value', operation.result)
    getDefaultValue()
}

function getDefaultValue() {
    operation.firstOperand = ''
    operation.secondOperand = ''
    operation.operator = ''
}
