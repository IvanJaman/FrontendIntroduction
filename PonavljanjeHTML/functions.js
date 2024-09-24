function SaveToLocalStorage() {
	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;

	if (firstName === "" || lastName === "") {
		alert("Please fill in name fields");
		return false; 
	}
	
	let userId = Date.now();
	
	let users = JSON.parse(localStorage.getItem("Users")) || [];
	
	users.push({
        id: userId,
        firstName: firstName,
        lastName: lastName
    });
	
	localStorage.setItem("Users", JSON.stringify(users));
	
	alert("Data saved successfully!");
	GetFromLocalStorage();
	return false; 
}

function addToTable(user) {
    let tableBody = document.querySelector("#userTable tbody");

    if (!tableBody) {
        tableBody = document.createElement("tbody");
        document.getElementById("userTable").appendChild(tableBody);
    }

    let existingRow = tableBody.querySelector(`tr[data-id='${user.id}']`);
    if (!existingRow) {
        let row = document.createElement("tr");
        row.setAttribute("data-id", user.id);

        let cellId = document.createElement("td");
        cellId.textContent = user.id;

        let cellFirstName = document.createElement("td");
        cellFirstName.textContent = user.firstName;

        let cellLastName = document.createElement("td");
        cellLastName.textContent = user.lastName;

        row.appendChild(cellId);
        row.appendChild(cellFirstName);
        row.appendChild(cellLastName);

        tableBody.appendChild(row);
    }
}

function GetFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let tableBody = document.querySelector("#userTable tbody");

    if (!tableBody) {
        tableBody = document.createElement("tbody");
        document.getElementById("userTable").appendChild(tableBody);
    }

    tableBody.innerHTML = "";

    users.forEach(user => {
        addToTable(user);
    });
}


window.onload = GetFromLocalStorage;

function ClearLocalStorage() {
    if (confirm("Are you sure you want to clear all data?")) {
        localStorage.removeItem("Users"); 
        GetFromLocalStorage();
    }
}

function UpdateLocalStorage() {
  let id = document.getElementById("id").value;
  let firstName = document.getElementById("firstNameUpdate").value;
  let lastName = document.getElementById("lastNameUpdate").value;

  if (id === "") {
    alert("Please enter an Id.");
    return false;
  }
  
  let users = JSON.parse(localStorage.getItem("Users")) || [];
  
  let user = users.find(user => user.id == id);

  if (user) {
	  
    if (firstName !== "") {
      user.firstName = firstName;
    }
    if (lastName !== "") {
      user.lastName = lastName;
    }

    localStorage.setItem("Users", JSON.stringify(users));
	GetFromLocalStorage();
	
    alert("Data updated successfully!");
  } 
  else {
    alert("User with the given Id does not exist.");
	}

  return false; 
}

function DeleteUserFromLocalStorage() {
    let id = document.getElementById("deleteId").value;

    if (id === "") {
        alert("Please enter an Id.");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let index = users.findIndex(user => user.id == id);

    if (index !== -1) {
        users.splice(index, 1); 
        localStorage.setItem("Users", JSON.stringify(users));
        GetFromLocalStorage();
        alert("User deleted successfully!");
    } else {
        alert("User with the given Id does not exist.");
    }

    return false;
}