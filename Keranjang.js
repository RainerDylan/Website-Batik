// ================= DATA =================

let cartItems =
  JSON.parse(localStorage.getItem("cartItems")) || [];

// ================= ELEMENT =================

const cartContainer =
  document.getElementById("cartContainer");

// ================= RENDER =================

function renderCart(){

  cartContainer.innerHTML = "";

  // EMPTY
  if(cartItems.length === 0){

    cartContainer.innerHTML = `

      <div class="empty-cart">
        Keranjang kosong
      </div>

    `;

    document.getElementById("subtotal").innerText = "Rp.0";

    document.getElementById("total").innerText = "Rp.0";

    return;

  }

  cartItems.forEach((item, index)=>{

    const productTotal = item.price * item.qty;

    cartContainer.innerHTML += `

      <div class="cart-item">

        <!-- IMAGE -->
        <a href="${item.detailPage}" class="product-image">

          <img src="${item.image}">

        </a>

        <!-- INFO -->
        <div class="product-info">

          <a href="${item.detailPage}" class="product-link">

            <h2>${item.name}</h2>

          </a>

          <p>${item.desc}</p>

          <p>Ukuran: ${item.size}</p>

          <div class="price">

            Rp.${formatNumber(productTotal)}

          </div>

          <!-- QUANTITY -->
          <div class="qty-wrapper">

            <button
              class="qty-btn minus"
              onclick="decreaseQty(${index})">

              -

            </button>

            <div class="qty-number">

              ${item.qty}

            </div>

            <button
              class="qty-btn plus"
              onclick="increaseQty(${index})">

              +

            </button>

          </div>

        </div>

      </div>

    `;

  });

  updateSummary();

}

// ================= INCREASE =================

function increaseQty(index){

  cartItems[index].qty++;

  saveCart();

}

// ================= DECREASE =================

function decreaseQty(index){

  if(cartItems[index].qty > 1){

    cartItems[index].qty--;

  }

  else{

    cartItems.splice(index, 1);

  }

  saveCart();

}

// ================= SAVE =================

function saveCart(){

  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );

  renderCart();

}

// ================= SUMMARY =================

function updateSummary(){

  let subtotal = 0;

  cartItems.forEach(item=>{

    subtotal += item.price * item.qty;

  });

  const delivery = 25000;

  const total = subtotal + delivery;

  document.getElementById("subtotal").innerText =
    "Rp." + formatNumber(subtotal);

  document.getElementById("total").innerText =
    "Rp." + formatNumber(total);

}

// ================= FORMAT =================

function formatNumber(number){

  return number.toLocaleString("id-ID");

}

// ================= BACK =================

function goBack(){

  window.history.back();

}

// ================= INIT =================

renderCart();

function updateSummary(){

  let subtotal = 0;

  cartItems.forEach(item=>{

    subtotal += item.price * item.qty;

  });

  const delivery = 25000;

  const total = subtotal + delivery;

  // TAMPILAN
  document.getElementById("subtotal").innerText =
    "Rp." + formatNumber(subtotal);

  document.getElementById("total").innerText =
    "Rp." + formatNumber(total);

  // =========================
  // SIMPAN KE LOCAL STORAGE
  // =========================

  localStorage.setItem(
    "checkoutSubtotal",
    subtotal
  );

  localStorage.setItem(
    "checkoutDelivery",
    delivery
  );

  localStorage.setItem(
    "checkoutTotal",
    total
  );

}

// ================= CHECKOUT PAGE =================

function goToCheckout(){

  window.location.href = "Checkout page.html";

}