document
  .getElementById("createWatchButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.getElementById("createWatchForm");
    var formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
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
