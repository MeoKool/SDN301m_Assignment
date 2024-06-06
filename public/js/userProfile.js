function goBack() {
  window.history.back();
}
// Fetch API to get user information
const memberName = sessionStorage.getItem("memberName");
fetch(`http://localhost:5000/v1/auth/getByMemberName/${memberName}`)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("name").textContent = data.name;
    document.getElementById("yob").textContent = data.yob;
  })
  .catch((error) => console.log(error));

document.getElementById("editButton").addEventListener("click", () => {
  var name = document.getElementById("name");
  var yob = document.getElementById("yob");
  var nameInput = document.createElement("input");
  nameInput.id = "nameInput"; // Add id to the input element
  nameInput.value = name.textContent;
  name.parentNode.replaceChild(nameInput, name);
  var yobInput = document.createElement("input");
  yobInput.id = "yobInput"; // Add id to the input element
  yobInput.type = "date";
  yobInput.value = new Date(yob.textContent).toISOString().split("T")[0];
  yob.parentNode.replaceChild(yobInput, yob);
  document.getElementById("submitButton").style.display = "inline-block";
  document.getElementById("editButton").style.display = "none";
  document.getElementById("backButton").style.display = "none";
  document.getElementById("cancelButton").style.display = "inline-block";
  document.getElementById("changePasswordButton").style.display =
    "inline-block";
});

document.getElementById("submitButton").addEventListener("click", () => {
  var name = document.getElementById("nameInput").value;
  var yob = document.getElementById("yobInput").value;

  fetch(`http://localhost:5000/v1/auth/updateMember/${memberName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      yob: yob,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("User information updated successfully");
      location.reload();
    });
});
document.getElementById("cancelButton").addEventListener("click", () => {
  // Restore the original state
  var nameInput = document.getElementById("nameInput");
  var yobInput = document.getElementById("yobInput");
  var name = document.createElement("span");
  name.id = "name";
  name.textContent = nameInput.value;
  nameInput.parentNode.replaceChild(name, nameInput);
  var yob = document.createElement("span");
  yob.id = "yob";
  yob.textContent = yobInput.value;
  yobInput.parentNode.replaceChild(yob, yobInput);
  document.getElementById("submitButton").style.display = "none";
  document.getElementById("cancelButton").style.display = "none";
  document.getElementById("editButton").style.display = "inline-block";
  document.getElementById("backButton").style.display = "inline-block";
  document.getElementById("changePasswordButton").style.display = "none";
});