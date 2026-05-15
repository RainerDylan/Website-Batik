let selectedRating = 0;

const reviews = [

  {
    username:"Sarah",
    rating:5,
    text:"Batiknya bagus banget dan kualitas kainnya premium. Jahitannya juga rapih dan nyaman dipakai.",
    profile:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    images:[
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400"
    ]
  },

  {
    username:"Kevin",
    rating:4,
    text:"Packaging rapi dan pengiriman cepat. Motif batiknya juga unik banget.",
    profile:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    images:[
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400"
    ]
  }

];

function setRating(rating){

  selectedRating = rating;

  const stars =
  document.querySelectorAll(".star-select span");

  stars.forEach((star,index)=>{

    if(index < rating){
      star.classList.add("active");
    }else{
      star.classList.remove("active");
    }

  });

}

function openPopup(index){

  const review = reviews[index];

  let galleryHTML = "";

  review.images.forEach(image => {

    galleryHTML += `
      <img src="${image}">
    `;

  });

  document.getElementById("popupBody").innerHTML = `

    <div class="popup-profile">

      <img src="${review.profile}">

      <div>
        <h2>${review.username}</h2>

        <div class="popup-stars">
          ${"★".repeat(review.rating)}
          ${"☆".repeat(5-review.rating)}
        </div>
      </div>

    </div>

    <div class="popup-review">
      ${review.text}
    </div>

    <div class="popup-gallery">
      ${galleryHTML}
    </div>

  `;

  document.getElementById("popup").style.display="flex";

}

function closePopup(){

  document.getElementById("popup").style.display="none";

}

/* SUBMIT REVIEW */

document.getElementById("reviewForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const username =
  document.getElementById("username").value;

  const reviewText =
  document.getElementById("reviewText").value;

  const imageInput =
  document.getElementById("imageUpload");

  const files = imageInput.files;

  let uploadedImages = [];

  if(files.length > 0){

    for(let i=0; i<files.length; i++){

      uploadedImages.push(
        URL.createObjectURL(files[i])
      );

    }

  }

  const newReview = {

    username:username,
    rating:selectedRating,
    text:reviewText,
    profile:"https://cdn-icons-png.flaticon.com/512/149/149071.png",
    images:uploadedImages

  };

  reviews.push(newReview);

  renderReviews();

  this.reset();

  selectedRating = 0;

  document.querySelectorAll(".star-select span")
  .forEach(star => {

    star.classList.remove("active");

  });

});

/* RENDER REVIEW */

function renderReviews(){

  const grid =
  document.getElementById("reviewGrid");

  grid.innerHTML = "";

  reviews.forEach((review,index)=>{

    grid.innerHTML += `

      <div class="review-card"
      onclick="openPopup(${index})">

        <img src="${review.profile}"
        class="profile-img">

        <h3>${review.username}</h3>

        <div class="card-stars">
          ${"★".repeat(review.rating)}
          ${"☆".repeat(5-review.rating)}
        </div>

        <p>
          ${review.text.substring(0,80)}...
        </p>

        ${
          review.images.length > 0
          ?
          `<img src="${review.images[0]}"
          class="product-img">`
          :
          ""
        }a

      </div>

    `;

  });

}

renderReviews();