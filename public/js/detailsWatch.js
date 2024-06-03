function fetchWatchDetails(watchId) {
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
function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function submitFeedback(watchId) {
  const rate = document.querySelector('input[name="rate"]:checked').value;
  const feedback = document.getElementById("feedback").value;
  const IdMember = sessionStorage.getItem("id");
  const data = {
    rating: rate,
    content: feedback,
    author: IdMember,
  };
  fetch(`http://localhost:5000/v1/feedback/${watchId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  document.getElementById("popup").style.display = "none";
}
