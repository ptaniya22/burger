let products = {
  crazy: {
    name: 'Crazy',
    price: 31000,
    img: 'images/products/burger-1.png',
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  light: {
    name: 'Light',
    price: 26000,
    img: 'images/products/burger-2.png',
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    name: 'CheeseBurger',
    price: 29000,
    img: 'images/products/burger-3.png',
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  dburger: {
    name: 'dBurger',
    price: 24000,
    img: 'images/products/burger-4.png',
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
};

let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
  cartBtn = document.querySelector('.wrapper__navbar-btn'),
  cartAmount = document.querySelector('.warapper__navbar-count'),
  cartList = document.querySelector('.wrapper__navbar-basket'),
  cartClose = document.querySelector('.wrapper__navbar-close'),
  cartListItem = document.querySelector('.wrapper__navbar-checklist');
cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice');

burgersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    addCount(btn);
  });
});

cartBtn.addEventListener('click', () => cartList.classList.add('active'));
cartClose.addEventListener('click', () => cartList.classList.remove('active'));

function addCount(btn) {
  // closest() - позволяет нам подключиться к указаному ближайшему родителю
  // getAttribute() - позволяет получить данные указаного атрибута
  let parent = btn.closest('.wrapper__list-card');
  let id = parent.getAttribute('id');
  products[id].amount++;
  basket();
}

function basket() {
  let korzina = [];
  for (let key in products) {
    let burger = products[key];
    let productBurger = document.querySelector(`#${key}`);
    let productCount = productBurger.querySelector('.wrapper__list-count');
    if (burger.amount > 0) {
      korzina.push(burger);
      productCount.classList.add('active');
      productCount.innerHTML = burger.amount;
    } else {
      productCount.classList.remove('active');
      productCount.innerHTML = '';
    }
  }
  let allAmount = getTotalAmount();
  if (allAmount > 0) {
    cartAmount.classList.add('active');
    cartAmount.innerHTML = allAmount;
  } else {
    cartAmount.classList.remove('active');
    cartAmount.innerHTML = '';
  }

  cartListItem.innerHTML = '';

  korzina.forEach(burger => {
    cartListItem.innerHTML += createBurger(burger);
  });

  cartTotalPrice.innerHTML = getTotalSum();
}

function getTotalSum() {
  let sum = 0;
  for (let key in products) {
    sum += products[key].totalSum;
  }
  return sum;
}

function getTotalAmount() {
  let sum = 0;
  for (let key in products) {
    sum += products[key].amount;
  }
  return sum;
}

function createBurger(burger) {
  return `<div class="navbar__item" id="${burger.name.toLowerCase()}-burger">
    <div class="navbar__item-left">
        <img src="images/products/burger-1.png" alt="">
        <div class="navbar__item-info">
            <p>${burger.name}</p>
            <p>${burger.price} сум</p>
        </div>
    </div>
    <div class="navbar__item-right">
        <button class="navbar__item-btn minus">-</button>
        <span class="navbar__item-count">${burger.amount}</span>
        <button class="navbar__item-btn plus">+</button>
    </div>
  </div>`;
}

window.addEventListener('click', event => {
  if (event.target.classList.contains('navbar__item-btn')) {
    let btn = event.target;
    const parent = btn.closest('.navbar__item');
    if (parent) {
      let id = parent.getAttribute('id').split('-')[0];
      if (btn.classList.contains('plus')) {
        products[id].amount++;
      } else if (btn.classList.contains('minus')) {
        products[id].amount--;
      }
      basket();
    }
  }
});

//Function of  Gradient Timer
// --------------------------
let redIndex = 1,
  greenIndex = 255,
  blueIndex = 255,
  randColor = '',
  time = 0,
  timer = document.querySelector('.timer');

function timerGo() {
  if (time < 100) {
    timer.innerHTML = time;

    if (greenIndex > 7) {
      greenIndex = greenIndex - 8;
      //   console.log(greenIndex);
    } else if (redIndex < 249) {
      redIndex = redIndex + 8;
      //   console.log(redIndex);
    } else if (blueIndex > 7) {
      blueIndex = blueIndex - 8;
      //   console.log(blueIndex);
    }
    randColor = `rgb(${redIndex}, ${greenIndex}, ${blueIndex})`;
    timer.style.color = randColor;
    console.log(randColor);
    time++;
    setTimeout(() => timerGo(), 100);
  } else {
    timer.innerHTML = 'o.k.';
    timer.style.fontSize = 80 + 'px';
  }
}

timerGo();
