function fetchWatchDetails(watchId) {
  // Fetch the watch details by ID
  fetch(`http://localhost:5000/v1/watch/getByIdWatches/${watchId}`)
    .then((response) => response.json())
    .then((data) => {
      const imagePath = "/" + data.image.replace("public\\", "");
      const watchDetails = document.getElementById("watchDetails");
      watchDetails.innerHTML = `
   <h2>${data.watchName}</h2>
   <img src="${imagePath}" alt="Watch Image">    
   <h3>Price: ${data.price}</h3>
   <h3>Brand: ${data.brand.brandName}</h3>
   <h3>Description: ${data.watchDescription}</h3>      
 `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function goBack() {
  window.history.back();
}
