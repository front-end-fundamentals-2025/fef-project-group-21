/* Fly to cart animation */
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.getElementById("add-to-cart-button");
  const productImg = document.querySelector(".productdetails-img");
  const cartIcon = document.querySelector("#cart");

  addToCartButton.addEventListener("click", function () {
    let flyingImg = productImg.cloneNode(true); //* Clones image */
    flyingImg.style.position = "fixed";
    flyingImg.style.width = "100px";
    flyingImg.style.height = "100px";
    flyingImg.style.zIndex = "1000"; /*Always above other elements*/

    /* Calculate the initial position of the image */
    let imgRect = productImg.getBoundingClientRect();
    let imgWidth = imgRect.width;
    let imgHeight = imgRect.height;
    flyingImg.style.left = imgRect.left + imgWidth / 2 - 50 + "px";
    flyingImg.style.top = imgRect.top + imgHeight / 2 - 50 + "px";

    /* Add to the page */
    document.body.appendChild(flyingImg);

    /* Calculate target location (shopping cart) */
    let cartRect = cartIcon.getBoundingClientRect();

    /* Let the image fly to the cart */
    flyingImg.style.transition = "all 1s ease-in-out";

    /* Setting the delay */
    setTimeout(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.opacity = "0";
    }, 100);

    /* Remover the image from the page after the animation*/
    setTimeout(() => {
      document.body.removeChild(flyingImg);
    }, 1100);
  });
});

/* Gets the previously stored cart or creates an empty cart */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Add to cart localStorage */
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.getElementById("add-to-cart-button");

  addToCartButton.addEventListener("click", () => {
    /* Get the infomation of product */
    const productName = document.querySelector(".productname").textContent;

    /* Remove symbols and spaces and output number */
    const productPrice = parseFloat(
      document.querySelector(".price").textContent.replace("$", "").trim()
    );
    const productImg = document.querySelector(".productdetails-img").src;

    /* Read the shopping cart data in localStorage */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /* Check if item exists */
    let existingProduct = cart.find((item) => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        image: productImg,
        quantity: 1,
      });
    }

    /* Save to localStorage */
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");

  /* If cart is empty, show this text and a button */
  if (cart.length === 0) {
    cartContainer.innerHTML = `
    <p>Your cart is empty</p>
    <a href="products.html">
     <button id="back-to-store-btn">
     Back to store
     </button>
    </a>
    `;
    totalPriceElement.textContent = "$0.00";
    return;
  }
  let total = 0;

  /* Creates a new element for each cart item and calculates total cost */
  cart.forEach((item, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");
    productElement.innerHTML = `
    <img src="${item.image}" class="cart-img">
    <div class="cart-info">
    <p class="cart-name">${item.name}</p>
    <p class="cart-price">$${item.price.toFixed(2)}</p>
    <div class="quantity-button"><button class="decrease" data-index="${index}">-</button>
    <span class="quantity-number">${item.quantity}</span>
    <button class="increase" data-index="${index}">+</button></div>
    <button class="remove-item" data-index="${index}">Remove</button>
    </div>`;
    cartContainer.appendChild(productElement);
    total += item.price * item.quantity;
  });
  total += 10;
  totalPriceElement.textContent = `$${total.toFixed(2)}`;

  /* Adds event listeners to the increase buttons */
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      cart[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });

  /* Adds event listeners to the decrease buttons */
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });

  /* Adds event listeners to the remove buttons */
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });
});
