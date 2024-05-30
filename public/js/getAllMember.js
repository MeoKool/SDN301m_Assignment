// getAllMember.js
window.onload = function () {
  fetch("http://localhost:5000/v1/auth/getAllmembers")
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
    row.appendChild(countCell);
    row.appendChild(memberNameCell);
    row.appendChild(nameCell);
    row.appendChild(yobCell);
    tableBody.appendChild(row);
  });
}
