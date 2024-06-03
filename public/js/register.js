document
  .getElementById("registerButton")
  .addEventListener("click", function (event) {
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
          alert("Registration successful");
          window.location.href = "/login";
        } else {
          alert("Error registering");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
