// product-item.js
class ProductItem extends HTMLElement {
  // TODO
  static get observedAttributes(){
    return ['imgurl', 'tite', 'price', 'id', 'has'];
  }
  constructor(){
    super();
    var shadow = this.attachShadow({mode:'open'});
    let item = document.createElement('li');
    item.setAttribute('class', 'product');
    //get the product title and price

    //handle the image
    let img = document.createElement('img');
    item.appendChild(img);
    img.src = this.getAttribute('imgurl');
    img.width=200;

    //handle the p tag containing title
    let pTitle = document.createElement('p');
    pTitle.class = "title";

    item.appendChild(pTitle);
    pTitle.innerHTML = this.getAttribute('tite')

    //handle the p tag containing price
    let pPrice = document.createElement('p');
    item.appendChild(pPrice);
    pPrice.innerHTML = this.getAttribute('price');
    pPrice.class = "price";



    //handle the button tag
    let addBtn = document.createElement('button');
    item.appendChild(addBtn);
    addBtn.innerHTML = "Add to Cart";
    addBtn.onclick = () => {
      if(addBtn.innerHTML == "Add to Cart"){
        cartCount++;
        cartDisplay.innerHTML = cartCount;
        addBtn.innerHTML = "Remove From Cart";
        cartItems.push(this.id);

      }
      else if(addBtn.innerHTML == "Remove From Cart"){
        if(cartCount!== 0){
          cartCount--;
        }
        cartDisplay.innerHTML = cartCount;
        addBtn.innerHTML = "Add to Cart";
        cartItems.splice(cartItems.indexOf(this.id), 1);
        console.log(carItems);
      }
      localStorage.setItem("cart", cartItems.toString());

    }
    let style = document.createElement('style');

    style.textContent=`
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    

    `;

 
    shadow.append(style);
    shadow.append(item);
  }


  get id() {
    return this.getAttribute('id');
  }
  
  set id(val) {
    this.setAttribute('id', val);
  }

  get has() {
    return this.getAttribute('has');
  }
  
  set has(val) {
    this.setAttribute('has', val);
  }

  get imgurl() {
    return this.getAttribute('imgurl');
  }
  
  set imgurl(val) {
    this.setAttribute('imgurl', val);
  }

  get tite() {
    return this.getAttribute('tite');
  }
  
  set tite(val) {
    this.setAttribute('tite', val);
  }

  get price() {
    return this.getAttribute('price');
  }
  
  set price(val) {
    this.setAttribute('price', val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
      let c = this.shadowRoot.childNodes;
      if(name == 'imgurl'){
        c[1].children[0].src = newValue;
      }
      else if(name == 'tite'){
        c[1].children[1].innerHTML = newValue;
        c[1].children[1].setAttribute('class', 'title');
        c[1].children[0].alt = newValue;
      }
      else if(name == 'price'){
        c[1].children[2].innerHTML = newValue;
        c[1].children[2].setAttribute('class', 'price');

      }
      else if(name == 'id'){
        c[1].setAttribute('id', newValue);
      }
      else if(name == 'has'){
        c[1].setAttribute('has', newValue);
        if(newValue == "yes"){
          c[1].children[3].innerHTML = "Remove From Cart";
        }
      }
    }


}



customElements.define('product-item', ProductItem);
