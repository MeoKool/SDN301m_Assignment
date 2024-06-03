function submitForm(event) {
  event.preventDefault();
  const memberName = document.getElementById("memberName").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/v1/auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ memberName, password }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in",
      }).then(() => {
        window.location.href = "/";
      });

      if (data.accessToken) {
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("memberName", memberName);
        sessionStorage.setItem("name", data.name);
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oh No!",
        text: "Wrong username or password",
      });
      console.error("Error:", error);
    });
}
