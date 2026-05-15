// ======================
// AMBIL TOTAL DARI CART
// ======================

const subtotal =
  Number(localStorage.getItem("checkoutSubtotal")) || 0;

const delivery =
  Number(localStorage.getItem("checkoutDelivery")) || 25000;

const total =
  Number(localStorage.getItem("checkoutTotal")) || 0;

// ======================
// FORMAT RUPIAH
// ======================

function formatNumber(number){

  return number.toLocaleString("id-ID");

}

// ======================
// PAYMENT ACTIVE
// ======================

const paymentBoxes =
  document.querySelectorAll(".payment-box");

let selectedMethod = "qris";

paymentBoxes.forEach(box => {

  box.addEventListener("click", () => {

    paymentBoxes.forEach(item => {
      item.classList.remove("active");
    });

    box.classList.add("active");

    selectedMethod = box.dataset.method;

  });

});

// ======================
// POPUP
// ======================

const nextBtn =
  document.getElementById("nextBtn");

const popupOverlay =
  document.getElementById("popupOverlay");

const popupContent =
  document.getElementById("popupContent");

const closePopup =
  document.getElementById("closePopup");

nextBtn.addEventListener("click", () => {

  popupOverlay.classList.add("show");

  // ======================
  // QRIS
  // ======================

  if(selectedMethod === "qris"){

    popupContent.innerHTML = `

      <h2 class="popup-title">
        Pembayaran QRIS
      </h2>

      <div class="payment-total">

        <p>Subtotal : Rp ${formatNumber(subtotal)}</p>

        <p>Delivery : Rp ${formatNumber(delivery)}</p>

        <h3>
          Rp ${formatNumber(total)}
        </h3>

      </div>

      <p class="payment-text">
        Scan QR code berikut untuk menyelesaikan pembayaran.
      </p>

      <img 
        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=PETIKBATIKPAYMENT" 
        class="qris-image"
      >

      <button 
        class="checkout-popup-btn"
        onclick="goToTrack()">

        Check Out

      </button>

    `;

  }

  // ======================
  // DEBIT
  // ======================

  if(selectedMethod === "debit"){

    popupContent.innerHTML = `

      <h2 class="popup-title">
        Pembayaran Debit
      </h2>

      <div class="payment-total">

        <p>Subtotal : Rp ${formatNumber(subtotal)}</p>

        <p>Delivery : Rp ${formatNumber(delivery)}</p>

        <h3>
          Rp ${formatNumber(total)}
        </h3>

      </div>

      <div class="payment-form">

        <input 
          type="text" 
          value="Richard William"
        >

        <input 
          type="text" 
          value="5267 8123 4567 8901"
        >

        <input 
          type="text" 
          value="08/28"
        >

        <input 
          type="text" 
          value="221"
        >

      </div>

      <button 
        class="checkout-popup-btn"
        onclick="goToTrack()">

        Check Out

      </button>

    `;

  }

  // ======================
  // CREDIT
  // ======================

  if(selectedMethod === "credit"){

    popupContent.innerHTML = `

      <h2 class="popup-title">
        Pembayaran Credit Card
      </h2>

      <div class="payment-total">

        <p>Subtotal : Rp ${formatNumber(subtotal)}</p>

        <p>Delivery : Rp ${formatNumber(delivery)}</p>

        <h3>
          Rp ${formatNumber(total)}
        </h3>

      </div>

      <div class="payment-form">

        <input 
          type="text" 
          value="Richard William"
        >

        <input 
          type="text" 
          value="4111 5678 9876 1234"
        >

        <input 
          type="text" 
          value="11/29"
        >

        <input 
          type="text" 
          value="887"
        >

      </div>

      <button 
        class="checkout-popup-btn"
        onclick="goToTrack()">

        Check Out

      </button>

    `;

  }

  // ======================
  // VA
  // ======================

  if(selectedMethod === "va"){

    popupContent.innerHTML = `

      <h2 class="popup-title">
        Virtual Account
      </h2>

      <div class="payment-total">

        <p>Subtotal : Rp ${formatNumber(subtotal)}</p>

        <p>Delivery : Rp ${formatNumber(delivery)}</p>

        <h3>
          Rp ${formatNumber(total)}
        </h3>

      </div>

      <div class="payment-form">

        <select>

          <option>
            BCA Virtual Account
          </option>

          <option>
            Mandiri Virtual Account
          </option>

          <option>
            BNI Virtual Account
          </option>

          <option>
            BRI Virtual Account
          </option>

        </select>

      </div>

      <div class="va-number">
        8808 1234 5678 9012
      </div>

      <button 
        class="checkout-popup-btn"
        onclick="goToTrack()">

        Check Out

      </button>

    `;

  }

});

// ======================
// CLOSE POPUP
// ======================

closePopup.addEventListener("click", () => {

  popupOverlay.classList.remove("show");

});

popupOverlay.addEventListener("click", (e) => {

  if(e.target === popupOverlay){

    popupOverlay.classList.remove("show");

  }

});

// ======================
// REDIRECT
// ======================

function goToTrack(){

  window.location.href =
    "track-your-package.html";

}