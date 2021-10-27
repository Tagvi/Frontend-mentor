import { ReactComponent as Clear } from '../../images/icon-delete.svg';
import { useContext } from 'react';
import { CartContext } from '../../providers/cart/cart.provider';

const CartItem = ({ item }) => {
  const { clearItemFromCart } = useContext(CartContext);
  return (
    <div className="flex items-center">
      <img
        src={item.images[0].imageUrl}
        alt="Shoe"
        className="w-14 h-14 object-cover rounded-md"
      />
      <div className="ml-5 flex justify-center flex-col ">
        <p className="text-xl font-bold  w-10/12 ellipsis">{item.name}</p>
        <p className="text-xl text-secondary">
          ${item.price.toFixed(2)} x {item.quantity}
          <span className="font-bold ml-1 text-black">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </p>
      </div>
      <Clear
        onClick={() => {
          clearItemFromCart(item);
        }}
        className="cursor-pointer"
      />
    </div>
  );
};
export default CartItem;
