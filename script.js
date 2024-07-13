let storage = []
let table = document.querySelector(`#tableBody`)
function addEmployee(event){
    event.preventDefault()
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
    storage.push({
        fName: fName,
        lName: lName,
        idNum: idNum,
        jTitle: jTitle,
        salary: salary
    })
    // table.innerHTML += `
    // <tr>
    //     <td>${fName}</td>
    //     <td>${lName}</td>
    //     <td>${idNum}</td>
    //     <td>${jTitle}</td>
    //     <td>${salary}</td>
    //     <td><button onClick="deleteEmployee(event, ${idNum})">X</button>
    // </tr>
    // `
    calculateMonthly(salary)
    clearFields()
    populateTable()
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
    if(confirm(`Are you sure you'd like to delete this entry?`))
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

function populateTable(popEvent){
    table.innerHTML = ``
    let searchQuery = document.querySelector(`#search`).value
    console.log(searchQuery)
    if(popEvent === undefined){
        for(let employee of storage){
            table.innerHTML += `
                <tr>
                 <td>${employee.fName}</td>
                 <td>${employee.lName}</td>
                 <td>${employee.idNum}</td>
                 <td>${employee.jTitle}</td>
                 <td>${employee.salary}</td>
                <td><button onClick="deleteEmployee(event, ${employee.idNum})">X</button>
                </tr>
                `
        }
    }else if(popEvent){
        popEvent.preventDefault()
        let returnArray = []
        for(let employee of storage){
            if(searchQuery === employee.idNum|| searchQuery === employee.lName)
                returnArray.push(employee)
        }
        for(let match of returnArray){
            table.innerHTML +=`
            <tr>
            <td>${match.fName}</td>
            <td>${match.lName}</td>
            <td>${match.idNum}</td>
            <td>${match.jTitle}</td>
            <td>${match.salary}</td>
           <td><button onClick="deleteEmployee(event, ${match.idNum})">X</button>
           </tr>
           `
        } document.querySelector(`#search`).value = ``
    }else{
        window.alert(`Error!`)
    }
}
