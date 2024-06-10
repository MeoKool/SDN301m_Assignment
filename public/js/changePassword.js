window.onload = function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please re-enter your new password.",
      });
      return;
    }

    fetch("http://localhost:5000/v1/auth/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: currentPassword,
        newPassword: newPassword,
        memberName: memberName,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Password changed successfully!",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/user";
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error changing password!",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Network error or server is not responding!",
        });
        console.error("Error:", error);
      });
  });
};

function goBack() {
  window.history.back();
}
