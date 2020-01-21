const grudgeUL = document.querySelector("#grudge-ul")
const grudgeForm = document.querySelector("#grudge-form")

fetch(`https://dwarven-grudges-submitted.herokuapp.com/grudges`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        fillGrudgeList(result)
    })
    .catch(error => console.log(error))

grudgeForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let grudgeFormData = new FormData(event.target)
    let offender = grudgeFormData.get("offender")
    let offense = grudgeFormData.get("offense")
    let description = grudgeFormData.get("description")
    
    fetch(`https://dwarven-grudges-submitted.herokuapp.com/grudges`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            grudge: {
                offender: offender,
                offense: offense,
                description: description
            }
        })
    })
        
    addGrudgeLI(offender, offense, description)
})

function fillGrudgeList(result) {
    result.map(grudge => {
        let { offender, offense, description } = grudge
        addGrudgeLI(offender, offense, description)
    })
}

function addGrudgeLI(offender, offense, description){
    let grudgeLI = document.createElement("li")
        let grudgeDiv = document.createElement("div")
        let offenderH3 = document.createElement("H3")
        let offenseH3 = document.createElement("H3")
        let descriptionH3 = document.createElement("H3")

        offenderH3.innerText = `Offender: ${offender}`
        offenseH3.innerText = `Offense: ${offense}`
        descriptionH3.innerText = `Description: ${description}`

        grudgeDiv.append(offenderH3, offenseH3, descriptionH3)
        grudgeLI.appendChild(grudgeDiv)
        grudgeUL.appendChild(grudgeLI)
}