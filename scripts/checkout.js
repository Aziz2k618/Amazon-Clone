import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
//import '../data/car.js';
//import '../data/backend-practice.js';
import { loadCartFetch } from "../data/cart.js";


async function loadPage(){
try{
  //throw 'error1';
await Promise.all([
    loadProductsFetch(),
     loadCartFetch()
]);
 ;
 
 
} catch(error){
  console.log('Unexpected error.Please try again later');
}
  

  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();

}
loadPage();

/*
Promise.all(
[
  loadProductsFetch(),

  new Promise((resolve)=>{
  loadCart(()=>{
    resolve();
  });
})
]).then((values)=>{
    console.log(values);
      renderCheckoutHeader();
      renderPaymentSummary();
      renderOrderSummary();
});
*/

