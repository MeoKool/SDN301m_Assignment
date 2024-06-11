// getAllMember.js
let accessToken = sessionStorage.getItem("accessToken");
let headers = new Headers();
headers.append("token", `Bearer ${accessToken}`);

window.onload = function () {
  fetch("http://localhost:5000/v1/auth/getAllmembers", {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && Array.isArray(data)) {
        displayMembers(data);
      } else {
        console.error("Error: data is not an array");
      }
    })
    .catch((error) => console.error("Error:", error));
};

function displayMembers(members) {
  const tableBody = document.querySelector("tbody");
  let count = 1;
  members.forEach((member) => {
    const row = document.createElement("tr");
    const memberNameCell = document.createElement("td");
    const countCell = document.createElement("td");
    countCell.textContent = count++;
    memberNameCell.textContent = member.memberName;
    const nameCell = document.createElement("td");
    nameCell.textContent = member.name;
    const yobCell = document.createElement("td");
    const date = new Date(member.yob);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    yobCell.textContent = formattedDate;

    // Create a new cell for the dropdown menu
    const actionCell = document.createElement("td");
    // Create the dropdown menu
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown is-hoverable";
    dropdown.innerHTML = `
        <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
            <span>Action</span>
      </button>
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
      <div class="dropdown-content">
      <div class="dropdown-item">
        <button class="button is-info" onclick="editMember('${member._id}')">Edit</button>
        <button class="button is-danger" onclick="deleteMember('${member._id}')">Delete</button>
        </div>
        </div>
      </div>
    `;
    actionCell.appendChild(dropdown);

    row.appendChild(countCell);
    row.appendChild(memberNameCell);
    row.appendChild(nameCell);
    row.appendChild(yobCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
}
