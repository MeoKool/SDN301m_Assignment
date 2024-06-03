var memberName = sessionStorage.getItem("memberName");
var memberContainer = document.getElementById("memberContainer");
var logoutButton = document.getElementById("logoutButton");
var searchContainer = document.getElementById("searchContainer");
var searchInput = document.getElementById("searchInput");

if (memberName) {
  searchContainer.style.display = "inline-block";
  logoutButton.style.display = "inline-block";
  memberContainer.innerHTML = `<h2>Welcome ${memberName}</h2>`;
  memberContainer.style.display = "inline-block";
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
  var confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    sessionStorage.clear();
    location.reload();
  }
});

function searchWatchByName(name) {
  fetch(`http://localhost:5000/v1/watch/searchWatches/${name}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear the current cards
      const cardContainer = document.getElementById("cardsContainer");
      cardContainer.innerHTML = "";
      data.forEach((object) => {
        const card = document.createElement("div");
        card.classList.add("card");
        // Remove 'public\' from the image path
        const imagePath = "/" + object.image.replace("public\\", "");
        card.innerHTML = `
        <h2>${object.watchName}</h2>
        <img src="${imagePath}" alt="${object.watchName}">
        <p>${object.price}</p>
        <p>Brand: ${object.brand.brandName}</p>
        <a href="/details/${object._id}"><button>Details</button></a>
        `;
        cardContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  fetch("http://localhost:5000/v1/brand/getAllBrands")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const select = document.getElementById("brandName");
      data.forEach((brand) => {
        const option = document.createElement("option");
        option.value = brand._id;
        option.textContent = brand.brandName;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}
document.getElementById("brandName").addEventListener("change", function () {
  if (this.value) {
    window.location.href = "/getWatchByBrand/" + this.value;
  }
});
