const expression = document.querySelector("#expression")
const result = document.querySelector("#result")

function keyboardClick(value) {
    const placeholder = document.querySelector('.placeholder')
    if (expression.contains(placeholder)) {
        expression.removeChild(placeholder)
    }
    
    const symbolsRegex = /[0-9\(\)\.+\-×÷]/
    if (value.match(symbolsRegex)) {
        expression.innerHTML += value
    }
    
    const specialKeysRegex = /(CLEAR)|(DEL)|(=)/
    if (value.match(specialKeysRegex)) {
        var expString = expression.innerHTML
        switch (value) {
            case 'CLEAR':
                expression.innerHTML = '<span class="placeholder">Calculator</span>'
                break
            case 'DEL':
                expString = expString.substring(0, expString.length - 1)
                if (expString.trim() === '') {
                    expString = '<span class="placeholder">Calculator</span>'
                }
                expression.innerHTML = expString
                break;
            case '=':
                try {
                    expString = eval(toJs(expString))
                    if (expString == null) throw new Error('Invalid input')
                    expression.innerHTML = expString
                } catch {
                    expression.innerHTML = 0
                }
                break;
        }
    }
    
    var cursor = document.querySelector('.cursor')
    if (expression.contains(cursor)) {
        expression.removeChild(cursor)
    }
    cursor = document.createElement('span')
    cursor.classList.add('cursor')
    expression.appendChild(cursor)
    cursor.scrollIntoView({
        behavior: "smooth"
    })
    
    calculateResult()
}

function calculateResult() {
    try {
        result.innerHTML = 'Result: ' + eval(toJs(expression.innerHTML))
    } catch {
        result.innerHTML = '<span class="error">Invalid input!</span>'
    }
}

//This function will convert human operators to js operators
function toJs(expString) {
    return expString.replaceAll('×', '*').replaceAll('÷', '/')
}