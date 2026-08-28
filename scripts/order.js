import { orders } from "../data/orders.js";
import { getProduct,loadProductsFetch } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { addToCart } from "../data/cart.js";
console.log(orders);


async function loadPage(){
  await loadProductsFetch();
  let orderPageHTML='';
  orders.forEach(order => {
  const deliveryDate = dayjs(order.orderTime).format('MMMM D');
  orderPageHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${deliveryDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
           ${generateProductsHTML(order)}
          </div>
        </div>
`
});

function generateProductsHTML(order)
{
  let productsHTML='';
  order.products.forEach((productDetails)=>{
    const product=getProduct(productDetails.productId);
    // defensive: if product data isn't available, skip rendering this product
    if(!product){
      console.warn('Missing product for id', productDetails.productId, 'in order', order.id);
      return; // continue to next product
    }
    productsHTML+=`<div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D, YYYY')}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-it-again-button" data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message ">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            `
  });
  return productsHTML;
}

    const ordersGrid = document.querySelector('.js-order-grid');
    if(!ordersGrid){
      console.error('Orders grid element not found: .js-order-grid');
      return;
    }

    if(orderPageHTML.trim() === ''){
      ordersGrid.innerHTML = `<div class="no-orders">You have no orders.</div>`;
    } else {
      ordersGrid.innerHTML = orderPageHTML;

      // attach event listeners to buy again buttons
      const buyAgainButtons = ordersGrid.querySelectorAll('.js-buy-it-again-button');
      buyAgainButtons.forEach((buttonElement)=>{  
        buttonElement.addEventListener('click',()=>{
          addToCart(buttonElement.dataset.productId);
          // provide simple feedback
          buttonElement.textContent = 'Added';
        });
      });
    }
  }

  loadPage();
  



