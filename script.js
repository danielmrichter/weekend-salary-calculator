let storage = []
let table = document.querySelector(`#tableBody`)
let footer = document.querySelector(`footer`)
let monthlySalary = 0
function addEmployee(event){
    event.preventDefault()
    let fName = document.querySelector('#fName').value
    let lName = document.querySelector('#lName').value
    let idNum = document.querySelector('#idNum').value
    let jTitle = document.querySelector('#jTitle').value
    let salary = document.querySelector('#salary').value
    if(safetyCheck()=== false){
        return
    }
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
function calculateMonthly(num){
    monthlySalary += Math.round((num/12))
    footer.innerHTML = `
    <p>Total Monthly Salary: $${monthlySalary}</p>`
    monthlyPercent(monthlySalary)
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
    monthlySalary -= Math.round((num/12))
    footer.innerHTML = `
    <p>Total Monthly Salary: $${monthlySalary}</p>`
    monthlyPercent(monthlySalary)
}
function clearFields(){
    fName.value = ``
    lName.value = ``
    idNum.value = ``
    jTitle.value = ``
    salary.value = ``
    document.querySelector(`#search`).value = ``
}
function populateTable(popEvent){
    table.innerHTML = ``
    let searchQuery = document.querySelector(`#search`).value.toString()
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
            for(let entry of Object.values(employee))
                if(entry.indexOf(searchQuery) > -1){
                returnArray.push(employee)
                break}
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
function monthlyPercent(num){
    let percentNum = num/20000
    footer.className = ``
    if(percentNum === 0){
        footer.classList.add(`zero-budget`)
    } else if(percentNum < .05){
        footer.classList.add(`five-budget`)
    } else if(percentNum <.10){
        footer.classList.add(`ten-budget`)
    } else if(percentNum <.2){
        footer.classList.add(`twenty-budget`)
    } else if(percentNum <.3){
        footer.classList.add(`thirty-budget`)
    } else if(percentNum <.4){
        footer.classList.add(`forty-budget`)
    } else if(percentNum <.5){
        footer.classList.add(`fifty-budget`)
    } else if(percentNum <.6){
        footer.classList.add(`sixty-budget`)
    } else if(percentNum <.7){
        footer.classList.add(`seventy-budget`)
    } else if(percentNum <.8){
        footer.classList.add(`eighty-budget`)
    } else if(percentNum <.9){
        footer.classList.add(`ninety-budget`)
    } else if(percentNum <.95){
        footer.classList.add(`ninefive-budget`)
    }else if(percentNum <= 1){
        footer.classList.add(`over-budget`)
    }
}
function safetyCheck(){
    let fName = document.querySelector('#fName').value
    let lName = document.querySelector('#lName').value
    let idNum = document.querySelector('#idNum').value
    let jTitle = document.querySelector('#jTitle').value
    let salary = document.querySelector('#salary').value
    document.querySelector(`#required-field`).innerHTML = ``
    document.querySelector('#fName').classList = ``
    document.querySelector('#lName').classList = ``
    document.querySelector('#idNum').classList = ``
    document.querySelector('#jTitle').classList = ``
    document.querySelector('#salary').classList = ``
    if(fName === ``){
        document.querySelector('#fName').classList.add(`required-box`)
        document.querySelector(`#required-field`).innerHTML = `*required`
        return false
    }
    if(lName === ``){
        document.querySelector('#lName').classList.add(`required-box`)
        document.querySelector(`#required-field`).innerHTML = `*required`
        return false
    }
    if(idNum === ``){
        document.querySelector('#idNum').classList.add(`required-box`)
        document.querySelector(`#required-field`).innerHTML = `*required`
        return false
    }
    if(jTitle === ``){
        document.querySelector('#jTitle').classList.add(`required-box`)
        document.querySelector(`#required-field`).innerHTML = `*required`
        return false
    }
    if(salary === ``){
        document.querySelector(`#salary`).classList.add(`required-box`)
        document.querySelector(`#required-field`).innerHTML = `*required`
        return false
    }
    if(Number.isInteger(Number(idNum)) === false){
        document.querySelector(`#idNum`).classList.add(`required-box`)
        return false
    }
    if(Number.isInteger(Number(salary)) === false){
        document.querySelector(`#salary`).classList.add(`required-box`)
        return false
    }
    return true
}