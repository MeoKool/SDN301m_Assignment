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
  memberContainer.innerHTML = `<h2>Welcome ${memberName}</h2>`;
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
      Swal.fire({
        title: "Logged out!",
        icon: "success",
      }).then(() => {
        sessionStorage.clear();
        location.reload();
      });
    }
  });
});
