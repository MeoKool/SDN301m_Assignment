function goBack() {
  window.location.href = "/";
}
// Fetch API to get user information
var dateData = "";
fetch(`http://localhost:5000/v1/auth/getByMemberName/${memberName}`)
  .then((response) => response.json())
  .then((data) => {
    let date = new Date(data.yob);
    let formattedDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    document.getElementById("name").textContent = data.name;
    document.getElementById("yob").textContent = formattedDate;
    dateData = formattedDate;
  })
  .catch((error) => console.log(error));

document.getElementById("editButton").addEventListener("click", () => {
  var name = document.getElementById("name");
  var yob = document.getElementById("yob");
  var nameInput = document.createElement("input");
  var yobText = yob.textContent;
  var parts = yobText.split("-");
  var yobDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
  if (!isNaN(yobDate.getTime())) {
    var yobInput = document.createElement("input");
    yobInput.id = "yobInput";
    yobInput.type = "date";
    yobInput.value = yobDate.toISOString().split("T")[0];
    yob.parentNode.replaceChild(yobInput, yob);
  }
  nameInput.id = "nameInput";
  nameInput.value = name.textContent;
  name.parentNode.replaceChild(nameInput, name);
  yobInput.classList.add("input");
  nameInput.classList.add("input");

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
      Swal.fire({
        icon: "success",
        title: "User information updated successfully!",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
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
  yob.textContent = dateData;
  yobInput.parentNode.replaceChild(yob, yobInput);
  document.getElementById("submitButton").style.display = "none";
  document.getElementById("cancelButton").style.display = "none";
  document.getElementById("editButton").style.display = "inline-block";
  document.getElementById("backButton").style.display = "inline-block";
  document.getElementById("changePasswordButton").style.display = "none";
});
