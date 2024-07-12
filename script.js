let storage = []
function addEmployee(event){
    event.preventDefault()
    let table = document.querySelector(`#tableBody`)
    let fName = document.querySelector('#fName').value
    let lName = document.querySelector('#lName').value
    let idNum = document.querySelector('#idNum').value
    let jTitle = document.querySelector('#jTitle').value
    let salary = document.querySelector('#salary').value
    for(let i = 0; i < storage.length; i++){
        if(storage[i].idNum === idNum){
            window.alert(`Employee ID already exists!`)
            return
        }
    }
    table.innerHTML += `
    <tr>
        <td>${fName}</td>
        <td>${lName}</td>
        <td>${idNum}</td>
        <td>${jTitle}</td>
        <td>${salary}</td>
        <td><button onClick="deleteEmployee(event, ${idNum})">X</button>
    </tr>
    `
    storage.push({
        name: fName + lName,
        idNum: idNum,
        jTitle: jTitle,
        salary: salary
    })
    console.log(storage)
    calculateMonthly(salary)
    clearFields()
}
let monthlySalary = 0
function calculateMonthly(num){
    let footer = document.querySelector(`footer`)
    console.log(`num is:`,num)
    monthlySalary += (num/12)
    footer.innerHTML = `
    <p>Total Monthly Salary: $${monthlySalary}</p>`
    if(monthlySalary>20000){
        footer.classList.remove(`under-budget`)
        footer.classList.add(`over-budget`)
    }
}

function deleteEmployee(event, inputNum){
    for(let i = 0; i < storage.length; i++){
        console.log(storage[i])
        if(Number(storage[i].idNum) === inputNum){
            subtractMonthly(Number(storage[i].salary))
            storage.splice(i, 1)
        }
    }
    event.target.parentElement.parentElement.remove()
}

function subtractMonthly(num){
    let footer = document.querySelector(`footer`)
    monthlySalary -= (num/12)
    footer.innerHTML = `
    <p>Total Monthly Salary: $${monthlySalary}</p>`
    if(footer.classList.contains(`over-budget`)){
        console.log(`checking budget!`)
        if(monthlySalary < 20000){
            footer.classList.remove(`over-budget`)
            footer.classList.add(`under-budget`)
        }
    }
}


function clearFields(){
    fName.value = ``
    lName.value = ``
    idNum.value = ``
    jTitle.value = ``
    salary.value = ``
}