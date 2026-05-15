const categoryButtons = document.querySelectorAll(".category-btn");
const productCards = document.querySelectorAll(".product-card");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-category");

    productCards.forEach(card => {
      const productCategory = card.getAttribute("data-category");

      if(selectedCategory === "all" || selectedCategory === productCategory){
        card.style.display = "block";
      }else{
        card.style.display = "none";
      }
    });
  });
});