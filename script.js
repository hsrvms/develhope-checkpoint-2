const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const locationInput = document.getElementById("locationInput");
const addButton = document.getElementById("addButton");

const locationSearchInput = document.getElementById("locationSearchInput");
const displayButton = document.getElementById("displayButton");
const usersContainer = document.getElementById("usersContainer");

addButton.addEventListener("click", handleAdd);
displayButton.addEventListener("click", handleDisplay);

function handleAdd(e) {
	e.preventDefault();

	const newUser = getUserInput();

	const existingUser = JSON.parse(localStorage.getItem(newUser.id));

	if (existingUser) return;

	const userList = JSON.parse(localStorage.getItem("users")) || [];
	userList.push(newUser);

	localStorage.setItem("users", JSON.stringify(userList));
	localStorage.setItem(newUser.id, JSON.stringify(newUser));
}

function handleDisplay() {
	const userList = JSON.parse(localStorage.getItem("users"));

	if (!userList) return;

	if (!locationSearchInput.value) {
		displayList(userList);
		return;
	}

	const location = locationSearchInput.value;
	const filteredList = userList.filter(
		(user) => user.location.toLowerCase() === location.toLowerCase()
	);
	console.log("clicked");
	displayList(filteredList);
}

function displayList(users) {
	usersContainer.innerHTML = `
    <ul>
      ${users
			.map(
				(user) =>
					`
        <li>
          <p>id: ${user.id}</p>
          <p>name: ${user.name}</p>
          <p>age: ${user.age}</p>
          <p>location: ${user.location}</p>
        </li>
        `
			)
			.join("")}
    </ul>
  `;
}

function getUserInput() {
	const name = nameInput.value;
	const age = ageInput.value;
	const location = locationInput.value;

	return {
		id: Date.now(),
		name: name,
		age: age,
		location: location,
	};
}

// localStorage.clear();
