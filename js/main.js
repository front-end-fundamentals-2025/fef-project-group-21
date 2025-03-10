document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.getElementById("add-to-cart-button");
  const productImg = document.querySelector(".productdetails-img");
  const cartIcon = document.querySelector(".material-symbols-outlined");

  addToCartButton.addEventListener("click", function () {
    let flyingImg = productImg.cloneNode(true); //*Clone Image*/
    flyingImg.style.position = "fixed";
    flyingImg.style.width = "100px";
    flyingImg.style.height = "100px";
    flyingImg.style.zIndex = "1000"; /*Always before all elements*/

    /*Calculate the initial position of the image*/
    let imgRect = productImg.getBoundingClientRect();
    let imgWidth = imgRect.width;
    let imgHeight = imgRect.height;
    flyingImg.style.left = imgRect.left + imgWidth / 2 - 50 + "px";
    flyingImg.style.top = imgRect.top + imgHeight / 2 - 50 + "px";

    /* add to the page */
    document.body.appendChild(flyingImg);

    /*Calculate target location (shopping cart)*/
    let cartRect = cartIcon.getBoundingClientRect();
    /* let the image fly to the cart */
    flyingImg.style.transition = "all 1s ease-in-out";

    /*Setting the delay*/
    setTimeout(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.opacity = "0";
    }, 100);
    /* remover the image from the page after the animation*/
    setTimeout(() => {
      document.body.removeChild(flyingImg);
    }, 1100);
  });
});

/* add to cart localStorage */
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.getElementById("add-to-cart-button");

  addToCartButton.addEventListener("click", () => {
    /* get the infomation of product */
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
