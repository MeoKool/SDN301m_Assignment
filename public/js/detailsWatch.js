function fetchWatchDetails(watchId) {
  fetch(`http://localhost:5000/v1/watch/getByIdWatches/${watchId}`)
    .then((response) => response.json())
    .then((object) => {
      console.log(object);
      const imagePath = "/" + object.image.replace("public\\", "");
      const watchDetails = document.getElementById("watchDetails");
      watchDetails.innerHTML = `
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
           <div class="content">
          Description: ${object.watchDescription}
          </div>
          </div>
        </div>
        <div class="card-footer">
    <button id="feedbackButton" class="button is-info" style="display: none" onclick="openPopup()">Feedback</button>
    <button class="button is-warning" onclick="goBack()">Back</button>
    </div>  
      `;

      var memberName = sessionStorage.getItem("memberName");
      var feedbackButton = document.querySelector("#feedbackButton");
      if (memberName) {
        feedbackButton.style.display = "inline-block";
      } else {
        feedbackButton.style.display = "none";
      }
      if (object.comments.length >= 1) {
        const Comment = document.getElementById("comments");
        Comment.style.display = "inline-block";
        Comment.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Rating</th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                ${object.comments
                  .map(
                    (comment) => `
                    <tr>
                        <td>${comment.rating}⭐</td>
                        <td>${comment.content}</td>
                        <td>${comment.author.name}</td>
                        <td>${new Date(comment.createdAt).toLocaleString()}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
        `;
      }
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
      Swal.fire({
        icon: "success",
        title: "Thanks for your feedback!",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "You can only feedback once time!",
      });
      console.error("Error:", error);
    });
  document.getElementById("popup").style.display = "none";
}
