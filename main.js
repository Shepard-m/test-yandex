function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  const productElement = event.target;
  const productText = productElement.querySelector("p").textContent; // Получение текста из p
  const productClass = productElement.className;

  const data = JSON.stringify({ productClass, productText });
  event.dataTransfer.setData("text", data);
}

function drop(event) {
  event.preventDefault();

  const store = document.querySelector(".store");
  const productsBasket = document
    .querySelector(".basket")
    .querySelectorAll(".product");
  const productsList = store.querySelectorAll(".product");
  let copyFilterProducts = [];
  const data = event.dataTransfer.getData("text");
  const { productClass, productText } = JSON.parse(data);
  const countProductBasket = productsBasket.length;

  const product = document.createElement("div");
  product.className = `${productClass} product--basket`;
  product.style.position = "absolute";
  product.style.zIndex = -1;

  const basket = document.querySelector(".basket");

  if (countProductBasket >= 5) {
    product.style.left = `${62 + 20 * (countProductBasket - 5)}px`;
  } else {
    product.style.left = `${62 + 30 * countProductBasket}px`;
  }

  const text = document.createElement("p");
  text.textContent = productText;
  text.className = "visually-hidden";
  product.appendChild(text);

  for (const element of productsList) {
    if (!element.classList.contains(productClass.split(" ")[1])) {
      copyFilterProducts.push(element);
    }
  }

  basket.appendChild(product);
  store.innerHTML = "";
  for (const element of copyFilterProducts) {
    store.appendChild(element);
  }

  document
    .querySelector(".basket")
    .querySelectorAll(".product")
    .forEach((item) => {
      item.style.bottom = "53px";
    });
  if (countProductBasket + 1 === 3) {
    console.log(document.querySelector(".pay"));
    document.querySelector(".pay").style.opacity = "1";
  }
}

document.querySelectorAll(".product").forEach((item) => {
  item.addEventListener("dragstart", drag);
});
