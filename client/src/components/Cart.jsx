import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartOrders = useSelector((store) => store.cart.orders);
  const dispatch =useDispatch();
  const handleRemove = ()=>{
    dispatch(removeItem())

  }
  const handleClearCart=()=>{
    dispatch(clearCart())

  }

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-mono mb-6">Cart</h1>
      {cartOrders.length === 0 ? (
        <div className="text-gray-500">Your cart is empty</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartOrders.map((order, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={order.image}
                alt={order.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="font-semibold text-lg mt-2">{order.name}</h3>
              <p className="text-green-600 font-medium text-lg">
                ₹{parseFloat(order.price).toFixed(2)}
              </p>
              <button onClick={handleRemove}
                className="bg-red-700 text-white rounded-md p-2 mt-4 hover:bg-red-500"
              >
                Remove from Cart
              </button>
            </div>
          ))}
          <div className="">
            <button onClick={handleClearCart} className=" bg-teal-700 text-white rounded-lg p-2 mt-4 hover:bg-teal-500">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
