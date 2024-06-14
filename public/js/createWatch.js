var select = document.getElementById("brand");
fetch("http://localhost:5000/v1/brand/getAllBrands")
  .then((response) => response.json())
  .then((data) => {
    // Loop through the data and create option elements
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement("option");
      option.value = data[i]._id;
      option.text = data[i].brandName;
      select.appendChild(option);
    }
  })
  .catch((error) => console.error("Error:", error));
document
  .getElementById("createWatchButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.getElementById("createWatchForm");
    var formData = new FormData(form);
    let accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken);
    fetch(form.action, {
      method: "POST",
      headers: {
        token: "Bearer " + accessToken,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Watch created successfully",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error creating watch",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Network error or server is not responding!",
        });
        console.error("Error:", error);
      });
  });
function goBack() {
  window.history.back();
}
function updateFileName() {
  var input = document.getElementById("image");
  var fileName = document.getElementById("fileName");
  fileName.textContent = input.files[0].name;
}
