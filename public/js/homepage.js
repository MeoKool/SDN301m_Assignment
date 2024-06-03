var memberName = sessionStorage.getItem("memberName");
var loginButton = document.querySelector('a[href="/login"]');
var registerButton = document.querySelector('a[href="/register"]');
var memberContainer = document.getElementById("memberContainer");
var logoutButton = document.getElementById("logoutButton");
var searchContainer = document.getElementById("searchContainer");
var searchInput = document.getElementById("searchInput");
var userProfile = document.getElementById("userProfile");
var brandName = document.getElementById("brandName");
if (memberName) {
  searchContainer.style.display = "inline-block";
  loginButton.style.display = "none";
  registerButton.style.display = "none";
  logoutButton.style.display = "inline-block";
  memberContainer.innerHTML = `<h2>Welcome ${memberName}</h2>`;
  memberContainer.style.display = "inline-block";
  userProfile.style.display = "inline-block";
  brandName.style.display = "inline-block";
} else {
  logoutButton.style.display = "none";
  memberContainer.style.display = "none";
  brandName.style.display = "none";
}
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    var searchParam = e.target.value;
    if (searchParam.trim() === "") {
      alert("Please enter a search term.");
    } else {
      window.location.href = `/search/${searchParam}`;
    }
  }
});

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
// Fetch data from the API
fetch("http://localhost:5000/v1/watch/getAllWatches")
  .then((response) => response.json())
  .then((data) => {
    // Iterate over each object in the data array
    data.forEach((object) => {
      const card = document.createElement("div");
      card.classList.add("card");
      // Remove 'public\' from the image path
      const imagePath = object.image.replace("public\\", "");
      card.innerHTML = `
      <h2>${object.watchName}</h2>
      <img src="${imagePath}" alt="${object.watchName}">
      <p>${object.price}</p>
      <p>Brand: ${object.brand.brandName}</p>
      <a href="/details/${object._id}"><button>Details</button></a>
      `;
      const cardsContainer = document.getElementById("cardsContainer");
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("http://localhost:5000/v1/brand/getAllBrands")
  .then((response) => response.json())
  .then((data) => {
    const select = document.getElementById("brandName");
    data.forEach((brand) => {
      const option = document.createElement("option");
      option.value = brand._id;
      option.textContent = brand.brandName;
      select.appendChild(option);
    });
  })
  .catch((error) => console.error("Error:", error));

// Handle select change event
document.getElementById("brandName").addEventListener("change", function () {
  if (this.value) {
    window.location.href = "/getWatchByBrand/" + this.value;
  }
});
