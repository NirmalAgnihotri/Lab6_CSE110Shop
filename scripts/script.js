// Script.js
let cartDisplay = document.getElementById("cart-count");
let cartCount = 0;
let cartItems = [];

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if(!(localStorage.getItem("products"))){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data=>localStorage.setItem("products", JSON.stringify(data)));
  }

  let currCart = localStorage.getItem("cart");
  let currCartObj;
  let initCount = 0;
  if(currCart){
    currCartObj = currCart.split(',');
    initCount = currCartObj.length;
  }
  cartDisplay.innerHTML = initCount;
  let products = localStorage.getItem("products");
  let productsObj = JSON.parse(products);
  let productContainer = document.getElementById("product-list");
  console.log(currCartObj);
  for(let i = 0; i < productsObj.length; ++i){
    let toAppend = document.createElement('product-item');
    toAppend.id = productsObj[i].id;
    if(currCartObj){
      if(currCartObj.includes(String(productsObj[i].id))){
        toAppend.has = "yes";
      }
      else{

        toAppend.has = "no";
      }
    }
  
    toAppend.imgurl = productsObj[i].image;
    toAppend.tite = productsObj[i].title;
    toAppend.price = productsObj[i].price;
    productContainer.appendChild(toAppend);
  }
});

