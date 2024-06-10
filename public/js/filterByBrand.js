var memberName = sessionStorage.getItem("memberName");
var memberContainer = document.getElementById("memberContainer");
var logoutButton = document.getElementById("logoutButton");
var searchContainer = document.getElementById("searchContainer");
var searchInput = document.getElementById("searchInput");
var searchButton = document.querySelector(".button.is-info");

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

function fetchFilterDetails(id) {
  fetch(`http://localhost:5000/v1/brand/getByIDBrands/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Add this line to log the data
      // Clear the current cards
      const cardContainer = document.getElementById("cardsContainer");
      cardContainer.innerHTML = "";
      data.watches.forEach((object) => {
        const card = document.createElement("div");
        card.classList.add("card");
        // Remove 'public\' from the image path
        const imagePath = "/" + object.image.replace("public\\", "");
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
// Handle select change event
document.getElementById("brandName").addEventListener("change", function () {
  if (this.value) {
    window.location.href = "/getWatchByBrand/" + this.value;
  }
});
