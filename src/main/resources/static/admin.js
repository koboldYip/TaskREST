fetch('/current_user')
    .then(res => res.json())
    .then(json => {
        document.getElementById('currentUserEmail').textContent = json["email"]
        let roles = []
        for (let i = 0; i < json["roles"].length; i++) {
            roles.push(json["roles"][i]["role"])
        }
        document.getElementById('currentUserRoles').textContent = roles.join(" ")
    })

fetch("/api/users").then(res => res.json()).then(json => {
    json.forEach(addTableUser)
})

fetch("/api/roles")
    .then(res => res.json())
    .then(json => {
        const selectNew = document.getElementById('newRoles')
        const selectEdited = document.getElementById('editRoles')
        json.forEach(role => {
            const optionNew = document.createElement('option')
            optionNew.value = role["id"]
            optionNew.text = role["role"]
            selectNew.appendChild(optionNew)
            const optionEdited = document.createElement('option')
            optionEdited.value = role["id"]
            optionEdited.text = role["role"]
            selectEdited.appendChild(optionEdited)
        })
    })

window.addEventListener("DOMContentLoaded", (event) => {
    const newUserButton = document.getElementById('newUser');
    if (newUserButton) {
        newUserButton.addEventListener('click', createNewUser);
    }
});

function createNewUser() {
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    let newRoles = []
    const options = document.getElementById('newRoles').options
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            newRoles.push({
                id: options[i].value,
                role: options[i].text
            })
        }
    }
    fetch('/api/users', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({firstName, lastName, age, email, password, roles: newRoles})
    }).then(r => r.json())
        .then(json => {
            addTableUser({id: json, firstName, lastName, age, email, password, roles: newRoles})
            document.getElementById('tabTable').click()
            document.getElementById('firstName').value = ""
            document.getElementById('lastName').value = ""
            document.getElementById('age').value = ""
            document.getElementById('email').value = ""
            document.getElementById('password').value = ""
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    options[i].selected = false
                }
            }
        })
}

function deleteUser(user) {
    document.getElementById("deletedId").value = user["id"]
    document.getElementById("deletedFirstName").value = user["firstName"]
    document.getElementById("deletedLastName").value = user["lastName"]
    document.getElementById("deletedAge").value = user["age"]
    document.getElementById("deletedEmail").value = user["email"]
    const selectDeleted = document.getElementById('deletedRoles')
    while (selectDeleted.options.length > 0) {
        selectDeleted.options.remove(0);
    }
    for (let i = 0; i < user["roles"].length; i++) {
        const optionDeleted = document.createElement('option')
        optionDeleted.text = user["roles"][i]["role"]
        selectDeleted.appendChild(optionDeleted)
    }
    document.getElementById(`deleteButton`).onclick = function () {
        fetch(`/api/users/${user["id"]}`, {
            method: "DELETE"
        }).then(r => r)
        document.getElementById(`user${user["id"]}`).remove()
    }
}

function editUser(user) {
    document.getElementById("patchId").value = user["id"]
    document.getElementById("patchFirstName").value = user["firstName"]
    document.getElementById("patchLastName").value = user["lastName"]
    document.getElementById("patchAge").value = user["age"]
    document.getElementById("patchEmail").value = user["email"]
    const roles = []
    const options = document.getElementById("editRoles").options

    document.getElementById(`editButton`).onclick = function () {
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                roles.push({
                    id: options[i].value,
                    role: options[i].text
                })
            }
        }
        fetch(`/api/users/${user["id"]}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: document.getElementById("patchId").value,
                firstName: document.getElementById("patchFirstName").value,
                lastName: document.getElementById("patchLastName").value,
                age: document.getElementById("patchAge").value,
                email: document.getElementById("patchEmail").value,
                password: document.getElementById("patchPassword").value,
                roles: roles
            })
        }).then(r => r.json())
            .then(json => {
                document.getElementById(`user${user["id"]}`).remove()
                addTableUser(json)
            })
    }
}

function addTableUser(user) {
    const tableBody = document.querySelector("tbody")
    let rolesArray = []
    for (let i = 0; i < user["roles"].length; i++) {
        rolesArray.push(user["roles"][i]["role"])
    }
    const tr = document.createElement("tr")
    const id = document.createElement("td")
    id.textContent = user["id"]
    const firstName = document.createElement("td")
    firstName.textContent = user["firstName"]
    const lastName = document.createElement("td")
    lastName.textContent = user["lastName"]
    const age = document.createElement("td")
    age.textContent = user["age"]
    const email = document.createElement("td")
    email.textContent = user["email"]
    const roles = document.createElement("td")
    roles.textContent = rolesArray.join(" ")
    const editTd = document.createElement("td")
    const editButton = document.createElement("button")
    editButton.setAttribute("type", "button")
    editButton.setAttribute("class", "btn btn-info")
    editButton.setAttribute("name", "edit")
    editButton.setAttribute("id", `editUser${user["id"]}`)
    editButton.setAttribute("data-toggle", "modal")
    editButton.setAttribute("data-target", "#editModal")
    editButton.textContent = "Edit"
    editButton.onclick = function () {
        editUser(user)
    }
    editTd.appendChild(editButton)
    const removeTd = document.createElement("td")
    const removeButton = document.createElement("button")
    removeButton.setAttribute('type', "button")
    removeButton.setAttribute('class', "btn btn-danger")
    removeButton.setAttribute('id', `deleteUser${user["id"]}`)
    removeButton.setAttribute('data-target', "#deleteModal")
    removeButton.setAttribute('data-toggle', "modal")
    removeButton.textContent = "Delete"
    removeButton.onclick = function () {
        deleteUser(user)
    }
    removeTd.appendChild(removeButton)
    tr.appendChild(id)
    tr.setAttribute("id", `user${user["id"]}`)
    tr.appendChild(firstName)
    tr.appendChild(lastName)
    tr.appendChild(age)
    tr.appendChild(email)
    tr.appendChild(roles)
    tr.appendChild(editTd)
    tr.appendChild(removeTd)
    tableBody.appendChild(tr)
}