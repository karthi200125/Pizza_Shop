// animation
const allSections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section__hidden");
    observer.unobserve(entry.target);
  });
}, {
  root: null,
  threshold: 0.12,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});

//  menu button
const menu = document.querySelector('#menu-btn');
const navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
};

// pagination
new Swiper(".home-slider", {
  spaceBetween: 20,
  effect: "fade",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

new Swiper(".review-slider", {
  spaceBetween: 20,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
  },
});

// quantity show on cart icon
const quantityElement = document.querySelector('.quantity');
const addCartIcons = document.querySelectorAll('.add_cart');
let cartCount = 0;

addCartIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    cartCount++;
    updateQuantity();
    updateTotal();
  });
});

function updateQuantity() {
  quantityElement.textContent = cartCount.toString();
}

// total amount
const total = document.querySelector('.total');
let totalAmount = 0;

function updateTotal() {
  totalAmount += parseFloat(this.parentElement.querySelector('.item-price').textContent);
  total.textContent = totalAmount.toString();
}

// cart open and close events
const btncart = document.querySelector('.carty');
const btnclose = document.querySelector('.cart-remove');
const cart = document.querySelector('.cart');

// cart open
btncart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});
//  caret close
btnclose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});


document.addEventListener('DOMContentLoaded', loadFood);
function loadFood() {
  loadContent();
}
function loadContent() {
  // remove cart items from cart
  const cartItemRemove = document.querySelectorAll('.trash');
  cartItemRemove.forEach((btn) => {
    btn.addEventListener('click', removeCartItem);
  });
// add to cart itmes
  const addCart = document.querySelectorAll('.add_cart');
  addCart.forEach((btn) => {
    btn.addEventListener('click', addToCart);
  });
}

function removeCartItem() {
  this.parentElement.remove();
}


function addToCart() {
  const food = this.parentElement;
  const cartTitle = food.querySelector('.item-title').innerHTML;
  const cartPrice = food.querySelector('.item-price').innerHTML;
  const cartImage = food.querySelector('.item-image').src;
  
  const newProductElement = createCartProduct(cartImage, cartPrice, cartTitle);
  const element = document.createElement('div');
  element.innerHTML = newProductElement;
  
  const cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
}

function createCartProduct(cartImage, cartPrice, cartTitle) {
  return `
  <div class="cart-box">      
    <i class="fa fa-trash trash" aria-hidden="true"></i>
    <div class="cart-item">
      <div class="dish-img">
        <img src="${cartImage}" alt="" />
      </div>
      <div class="dish-content">
        <h3>${cartTitle}</h3>            
        <div class="dish-content-bottom">
          <p class="item-price">${cartPrice}</p>              
          <div class="increse">
            <button class="decrese-btn">-</button>         
            <div class="count">1</div>
            <button class="increase-btn">+</button>         
          </div> 
        </div>
      </div>
    </div>  
  </div>`;
}
const increaseBtn = document.querySelector('.increase-btn');
const decreaseBtn = document.querySelector('.decrese-btn');
const countElement = document.querySelector('.count');

let count = parseInt(countElement.textContent);

increaseBtn.addEventListener('click', () => {
  count++;
  updateCount();
});

decreaseBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
    updateCount();
  }
});

function updateCount() {
  countElement.textContent = count.toString();
}




const imageInput = document.getElementById('image-input');
const profileImage = document.getElementById('profile-image');

profileImage.addEventListener('click', function () {
  imageInput.click();
});

imageInput.addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    profileImage.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
