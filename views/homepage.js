var memberName = sessionStorage.getItem("memberName");
var loginButton = document.querySelector('a[href="/login"]');
var registerButton = document.querySelector('a[href="/register"]');
var memberContainer = document.getElementById("memberContainer");
var logoutButton = document.getElementById("logoutButton");
var searchContainer = document.getElementById("searchContainer");
var searchInput = document.getElementById("searchInput");
if (memberName) {
  searchContainer.style.display = "inline-block";
  loginButton.style.display = "none";
  registerButton.style.display = "none";
  logoutButton.style.display = "inline-block";
  memberContainer.innerHTML = `<h2>Welcome ${memberName}</h2>`;
  memberContainer.style.display = "inline-block";
} else {
  logoutButton.style.display = "none";
  memberContainer.style.display = "none";
}
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    var searchParam = e.target.value;
    if (searchParam.trim() === "") {
      alert("Please enter a search term.");
    } else {
      fetch(`/api/search/${searchParam}`)
        .then((response) => response.json())
        .then((data) => {
          // Clear the current cards
          const cardContainer = document.getElementById("cardsContainer");
          cardContainer.innerHTML = "";

          // Add new cards based on search results
          data.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
              <h2>${item.title}</h2>
              <p>${item.description}</p>
            `;
            cardContainer.appendChild(card);
          });
        })
        .catch((error) => console.error("Error:", error));
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
        <p>Brand</p>
        <a href="/details/${object._id}"><button>Details</button></a>
        `;
      const cardsContainer = document.getElementById("cardsContainer");
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
