// ================= IMAGE ZOOM =================

const container = document.getElementById("zoomContainer");
const image = document.getElementById("productImage");

container.addEventListener("mousemove", (e)=>{

  const rect = container.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  image.style.transformOrigin = `${x}% ${y}%`;
  image.style.transform = "scale(2)";

});

container.addEventListener("mouseleave", ()=>{

  image.style.transform = "scale(1)";

});

// ================= SIZE =================

const sizeButtons = document.querySelectorAll(".size-btn");

let selectedSize = "";

sizeButtons.forEach((button)=>{

  button.addEventListener("click", ()=>{

    sizeButtons.forEach(btn=>{
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedSize = button.innerText;

  });

});

// ================= QUANTITY =================

const quantityText = document.getElementById("quantity");

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

let quantity = 1;

plusBtn.addEventListener("click", ()=>{

  quantity++;

  quantityText.innerText = quantity;

});

minusBtn.addEventListener("click", ()=>{

  if(quantity > 1){

    quantity--;

    quantityText.innerText = quantity;

  }

});

// ================= ADD TO CART =================

const addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", ()=>{

  if(selectedSize === ""){

    alert("Pilih ukuran terlebih dahulu!");

    return;

  }

  const product = {

    name: "Batik Mega Mendung",

    desc: "Batik khas Cirebon dengan motif awan elegan dan premium.",

    price: 130000,

    qty: quantity,

    size: selectedSize,

    image: image.src,

    detailPage: "detail produk.html"

  };

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  cart.push(product);

  localStorage.setItem("cartItems", JSON.stringify(cart));

  updateCartCount();

  alert("Produk berhasil ditambahkan!");

});

// ================= CART COUNT =================

function updateCartCount(){

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  document.getElementById("cart-count").innerText = cart.length;

}

updateCartCount();