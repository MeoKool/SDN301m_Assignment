var memberName = sessionStorage.getItem("memberName");
var loginButton = document.querySelector('a[href="/login"]');
var registerButton = document.querySelector('a[href="/register"]');
var memberContainer = document.getElementById("memberContainer");
var logoutButton = document.getElementById("logoutButton");
var userProfile = document.getElementById("userProfile");
if (memberName) {
  loginButton.style.display = "none";
  registerButton.style.display = "none";
  logoutButton.style.display = "inline-block";
  memberContainer.innerHTML = `Welcome, ${memberName}`;
  memberContainer.style.display = "inline-block";
  userProfile.style.display = "inline-block";
} else {
  logoutButton.style.display = "none";
  memberContainer.style.display = "none";
}
logoutButton.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://localhost:5000/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Logout failed");
        })
        .then(() => {
          Swal.fire({
            title: "Logged out!",
            icon: "success",
          }).then(() => {
            sessionStorage.clear();
            window.location.href = "/";
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Logout failed. Please try again.",
            icon: "error",
          });
        });
    }
  });
});
