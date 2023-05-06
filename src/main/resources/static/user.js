fetch("/current_user").then(res => res.json())
    .then(json => {
        let rolesArray = []
        for (let i = 0; i < json["roles"].length; i++) {
            rolesArray.push(json["roles"][i]["role"])
        }
        document.getElementById('currentUserEmail').textContent = json["email"]
        document.getElementById('currentUserRoles').textContent = rolesArray.join(" ")
        const tr = document.createElement("tr")
        const id = document.createElement("td")
        id.textContent = json["id"]
        const firstName = document.createElement("td")
        firstName.textContent = json["firstName"]
        const lastName = document.createElement("td")
        lastName.textContent = json["lastName"]
        const age = document.createElement("td")
        age.textContent = json["age"]
        const email = document.createElement("td")
        email.textContent = json["email"]
        const roles = document.createElement("td")
        roles.textContent = rolesArray.join(" ")
        tr.appendChild(id)
        tr.appendChild(firstName)
        tr.appendChild(lastName)
        tr.appendChild(age)
        tr.appendChild(email)
        tr.appendChild(roles)
        document.querySelector("tbody").appendChild(tr)
    })