document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  var form = document.getElementById("registerForm");

  var data = {
    memberName: form.memberName.value,
    password: form.password.value,
    name: form.name.value,
    yob: form.yob.value,
  };

  fetch(form.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Registration successful!",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Registration successful!",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
