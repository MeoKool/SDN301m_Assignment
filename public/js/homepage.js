var memberName = sessionStorage.getItem("memberName");
var loginButton = document.querySelector('a[href="/login"]');
var registerButton = document.querySelector('a[href="/register"]');
var memberContainer = document.getElementById("memberContainer");
var logoutButton = document.getElementById("logoutButton");
var searchContainer = document.getElementById("searchContainer");
var searchInput = document.getElementById("searchInput");
var userProfile = document.getElementById("userProfile");
var brandName = document.getElementById("brandName");
var searchButton = document.querySelector(".button.is-info");

if (memberName) {
  searchContainer.style.display = "inline-block";
  loginButton.style.display = "none";
  registerButton.style.display = "none";
  logoutButton.style.display = "inline-block";
  memberContainer.innerHTML = `<h2>Welcome, ${memberName}</h2>`;
  memberContainer.style.display = "inline-block";
  userProfile.style.display = "inline-block";
  brandName.style.display = "inline-block";
} else {
  searchButton.style.display = "none";
  logoutButton.style.display = "none";
  memberContainer.style.display = "none";
  brandName.style.display = "none";
}
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    var searchParam = e.target.value;
    if (searchParam.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a search term.",
      });
    } else {
      window.location.href = `/search/${searchParam}`;
    }
  }
});
searchButton.onclick = function () {
  var searchParam = searchInput.value;
  if (searchParam.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a search term.",
    });
  } else {
    window.location.href = `/search/${searchParam}`;
  }
};
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
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imagePath}" alt="${object.watchName}">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${object.watchName}</p>
              <p class="subtitle-is-6">Brand: ${object.brand.brandName}</p>
            </div>
          </div>
          <div class="content">
           Price: ${object.price}$
            <a href="/details/${object._id}"><button>Details</button></a>
          </div>
        </div>
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
