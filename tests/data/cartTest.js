import { addToCart,cart,loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite : addToCart', ()=>{
  beforeEach(()=>{
  spyOn(localStorage,'setItem');
});
  it('adds and existing product to the cart',()=>{
    
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId: '1'
     }]); 
    });
    loadFromStorage();
     
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
     }
    ]));
   
  });

  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([]); 
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryOptionId: '1'
     }
    ]));
  });
});

describe('test suite: removeFromCart',()=>
{
  it('Remove a productId that is in the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
     }]); 
    });
  
  loadFromStorage();
  removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.length).toEqual(0);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));

  });
  /*it('Removing a product that is not in the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
     }]);
  });
  loadFromStorage();
  removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
  expect(cart.length).toEqual(0);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
});
*/
});

describe('test suite: updateDeliveryOption',()=>{
  it('updating deliveryOptionId of a product  in the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
     }]); 
     
  });
  updateDeliveryOption(`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,'3');
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([
    {
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '3'
     }
  ]));
  expect(cart.length).toEqual(1);
});
 it('updating deliveryOptionId of a product that is not in the cart',()=>{ 
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
     }]); 
     
  });
  loadFromStorage();
  updateDeliveryOption(`54e0eccd-8f36-462b-b68a-8182611d9add`,'3');
  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  expect(cart.length).toEqual(1);
});
});
