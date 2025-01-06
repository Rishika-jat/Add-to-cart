//goood
let addBtns = document.querySelectorAll(".add-to-btn");
let divBtns = document.querySelectorAll(".div-add-btn");
let NumOfItem = 1;
let yourCard = 0;
let TotalOrderPrice = 0;
let addCountCart = document.querySelector(".add-count");
let sideShow = document.querySelector(".empty-img");
let totalBtn = document.querySelector(".totalbtn");
let AddedItems = document.querySelector(".itemmms");
let totalAmount = document.querySelector(".totalAmount");
let confirmbtn = document.querySelector(".confirmbtn");

let parentElement;
let nameItem;
let fullNameItem;
let priceItem;
let photoFood;
let quantity;
let photoborder;

function increFunction(event) {
  let countElement = event.target
    .closest(".add-to-btn")
    .querySelector(".counting-item");
  quantity = parseInt(countElement.innerHTML) + 1;
  countElement.innerHTML = quantity;
  addCountCart.innerHTML = parseInt(addCountCart.innerHTML) + 1;
  updateTask();
}

function decreFunction(event) {
  let countElement = event.target
    .closest(".add-to-btn")
    .querySelector(".counting-item");

  let count = event.target.closest(".add-to-btn");
  quantity = parseInt(countElement.innerHTML) - 1;
  if (quantity <= 0) {
    quantity = 0;

    forbtn(countElement); //have to solve problem here
    forborder(countElement);
    let cart = AddedItems.querySelectorAll(".cartitem");

    cart.forEach((carty) => {
      let class1 = carty.classList[1];
      let class2 = countElement.classList[1];
      // console.log(class1, class2);

      if (class1 == class2) {
        carty.style.display = "none";
        addCountCart.innerHTML = addCountCart.innerHTML - quantity;
        TotalOrderPrice = TotalOrderPrice - priceItem * quantity;
        totalAmount.innerHTML = TotalOrderPrice;

        if (addCountCart.innerHTML == 0) {
          sideShow.style.display = "flex";
          confirmbtn.style.display = "none";
        }
      }
    });
  } else {
    countElement.innerHTML = quantity;
  }
  addCountCart.innerHTML = parseInt(addCountCart.innerHTML) - 1;
  updateTask();
}

addBtns.forEach((addBtn, index) => {
  addBtn.addEventListener("click", () => {
    // sideShow.innerHTML = "";
    sideShow.style.display = "none";
    parentElement = addBtn.closest(".item");
    nameItem = parentElement.querySelector(".item-name").innerHTML;
    fullNameItem = parentElement.querySelector(".item-full-name").innerHTML;
    quantity = 1;
    priceItem = parseFloat(
      parentElement.querySelector(".item-price").innerHTML
    );
    photoFood = parentElement.querySelector(".food-photo");

    TotalOrderPrice += priceItem;
    totalAmount.innerHTML = TotalOrderPrice.toFixed(2);

    addBtn.style.backgroundColor = "hsl(14, 86%, 42%)";
    photoFood.classList.add("food-border");
    photoFood.classList.add(nameItem);

    // photoFood.style.border = "3px solid hsl(14,86%,42%)";
    addBtn.style.display = "none";
    const existingItem = AddedItems.querySelector(`.itemcartcount.${nameItem}`);
    if (existingItem) {
      quantity = parseInt(existingItem.innerHTML) + 1;
      updateTask();
    } else {
      addTask();
    }
    addCountCart.innerHTML = parseInt(addCountCart.innerHTML) + 1;
    photoborder = document.querySelectorAll(".food-border");
  });
});

divBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.classList.add(nameItem);
    btn.innerHTML = `
      <div class="add-to-btn flex">
        <button class="inde decre ${nameItem}"><img src="./assets/icon-decrement-quantity.svg" alt=""></button>
        <p class="counting-item ${nameItem}">${quantity}</p>
        <button class="inde incre"><img src="./assets/icon-increment-quantity.svg" alt=""></button>
      </div>`;
    let addToBtn = btn.querySelector(".add-to-btn");
    const incrementBtn = addToBtn.querySelector(".incre");
    const decrementBtn = addToBtn.querySelector(".decre");
    incrementBtn.addEventListener("click", increFunction);
    decrementBtn.addEventListener("click", decreFunction);
  });
});

function addTask() {
  AddedItems.innerHTML += `
    <div class="cartitem ${nameItem}">
      <div class="iteemmm">
        <div class="nameofitem">
          <p>${fullNameItem}</p>
        </div>
        <div class="cartitemdet">
          <img src="${photoFood.src}" class="add-img">
          <p class="itemcartcount ${nameItem}">${quantity + "x"}</p>
          <p>@${priceItem}</p>
          <p class="totalamountofitem ${nameItem}">${(
    priceItem * quantity
  ).toFixed(2)}</p>
        </div>
      </div>
      <div class="cut ${nameItem}">
        <img src="./assets/icon-remove-item.svg" alt="">
      </div>
      
       <div class="hr"></div>
    </div>
   

    
  `;
  let remove = AddedItems.querySelectorAll(".cut");
  let cart = AddedItems.querySelectorAll(".cartitem");
  remove.forEach((cut) => {
    cart.forEach((carty) => {
      cut.addEventListener("click", () => {
        let class1 = carty.classList[1];
        let class2 = cut.classList[1];
        console.log(class1, class2);

        if (class1 == class2) {
          carty.style.display = "none";
          addCountCart.innerHTML = addCountCart.innerHTML - quantity;
          TotalOrderPrice = TotalOrderPrice - priceItem * quantity;
          totalAmount.innerHTML = TotalOrderPrice;
          forbtn(carty);
          forborder(carty);

          if (addCountCart.innerHTML == 0) {
            sideShow.style.display = "flex";
            confirmbtn.style.display = "none";
          }
        }
      });
    });
  });

  confirmbtn.style.display = "block";
}

function updateTask() {
  const existingItemCount = AddedItems.querySelector(
    `.itemcartcount.${nameItem}`
  );
  const existingTotalAmount = AddedItems.querySelector(
    `.totalamountofitem.${nameItem}`
  );
  existingItemCount.innerHTML = `${quantity}x`;
  existingTotalAmount.innerHTML = `${(priceItem * quantity).toFixed(2)}`;

  TotalOrderPrice = Array.from(
    AddedItems.querySelectorAll(".totalamountofitem")
  ).reduce((acc, item) => acc + parseFloat(item.innerHTML), 0);
  totalAmount.innerHTML = TotalOrderPrice.toFixed(2);
}

let popup = document.querySelector(".popup");
confirmbtn.addEventListener("click", () => {
  console.log("hey");

  popup.innerHTML += `
        <div class="popup-content">
              <p>
                <i class="fa-regular fa-circle-check" style="color: #6ed926;"></i>
               Order Confirmed!</p>
                <div class="order-det">
                <h3>Your cart:<span class="total-confirm ">${addCountCart.innerHTML}</span></h3>
                <h3 class="totalbtnconfirm">Total: <span class="totalAmountconfirm">${totalAmount.innerHTML}</span></h3>

            </div>
               <button class="startNeworder">Start a new order</button>
        </div>`;
  popup.style.display = "block";

  let startNewOrder = popup.querySelector(".startNeworder");

  startNewOrder.addEventListener("click", () => {
    sideShow.style.display = "flex";
    addCountCart.innerHTML = 0;
    confirmbtn.style.display = "none";
    totalAmount.innerHTML = 0;
    AddedItems.innerHTML = "";
    popup.style.display = "none";
    photoborder.forEach((border) => {
      border.classList.remove("food-border");
    });
    quantity = 0;

    divBtns.forEach((btn) => {
      btn.innerHTML = `
       <button class="add-to-btn"><img src="./assets/icon-add-to-cart.svg" alt="" class="icon">Add to
                                cart</button>`;
    });
  });
});


function forbtn(carty) {
  divBtns.forEach((btn) => {
    let class2 = carty.classList[1];
    let class3 = btn.classList[1];

    if (class2 == class3) {
      btn.innerHTML = `
     <button class="add-to-btn"><img src="./assets/icon-add-to-cart.svg" alt="" class="icon">Add to
                              cart</button>`;
  
    }
  });
}
function forborder(carty) {
  photoborder.forEach((border) => {
    let class2 = carty.classList[1];
    let class3 = border.classList[2];

    if (class2 == class3) {
      border.classList.remove("food-border");
    }
  });
}
