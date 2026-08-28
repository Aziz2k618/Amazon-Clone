import { getOrder } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"


async function loadPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

const order = getOrder(orderId);
const product = getProduct(productId);

let productDetails;
order.products.forEach((item)=>{
  if(item.productId === product.id){
    productDetails=item;
  }
});


const today = dayjs();
const deliveryDate = dayjs(productDetails.estimatedDeliveryTime);
const orderTime= dayjs(order.orderTime);

// compute percentage complete in a safe way (use valueOf for clarity)
const totalDuration = deliveryDate.valueOf() - orderTime.valueOf();
const elapsed = today.valueOf() - orderTime.valueOf();
let percentageCompleted = 0;
if (Number.isFinite(totalDuration) && totalDuration > 0) {
  percentageCompleted = (elapsed / totalDuration) * 100;
} else if (elapsed >= 0) {
  // fallback: if duration is zero but elapsed is positive, treat as 100%
  percentageCompleted = 100;
}

// clamp to [0,100] and round
const clampedPercentage = Math.max(0, Math.min(100, Math.round(percentageCompleted)));
const trackingHTML=`
 <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        `
document.querySelector('.js-order-tracking').innerHTML=trackingHTML;
// now that the HTML is in the DOM, set the progress bar width safely
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
  progressBar.style.width = `${clampedPercentage}%`;
  progressBar.setAttribute('aria-valuenow', String(clampedPercentage));
} else {
  console.warn('Progress bar element not found in tracking page.');
}
}
loadPage();