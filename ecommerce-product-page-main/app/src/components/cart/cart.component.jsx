import CartItem from '../cart-item/cart-item.component';
const Cart = ({ cartItems, cartHidden }) => {
  return (
    <>
      {cartHidden ? null : (
        <div className="cart left-1/2 transform -translate-x-1/2 md:-translate-x-0 md:right-5p md:left-unset">
          <p className="font-bold text-xl border-b pb-4">Cart</p>
          <div className="mt-5">
            {cartItems.length ? (
              <>
                {cartItems.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </>
            ) : (
              <p className="text-center p-10">Your cart is empty</p>
            )}
          </div>
          {!cartItems.length ? null : (
            <button className="mt-5 w-full bg-orange p-4 rounded-xl text-white font-bold">
              Checkout
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default Cart;
