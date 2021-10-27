import { useState, useContext } from 'react';
import { ReactComponent as Minus } from '../../images/icon-minus.svg';
import { ReactComponent as Plus } from '../../images/icon-plus.svg';
import { ReactComponent as CartIcon } from '../../images/icon-cart.svg';
import { CartContext } from '../../providers/cart/cart.provider';

const Price = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { price, onSale, prevPrice } = item;
  const sale = onSale ? (price * 100) / prevPrice + '%' : null;
  const { addItemToCart } = useContext(CartContext);

  return (
    <>
      <div className="w-full flex justify-between mt-5 items-center lg:block">
        <div className="flex justify-start items-center">
          <h3 className="text-3xl font-bold">${price.toFixed(2)}</h3>
          {onSale ? (
            <p className="text-primary ml-3 bg-paleOrange py-0.5 px-2 rounded-md font-bold">
              {sale}
            </p>
          ) : null}
        </div>
        {onSale ? (
          <p className="text-lightGray line-through font-bold">
            ${prevPrice.toFixed(2)}
          </p>
        ) : null}
      </div>

      <div className="md:flex">
        <div className="mt-5 w-full flex justify-between p-4 bg-gray items-center rounded-lg font-bold shrink-custom">
          <button
            onClick={() => {
              setQuantity((c) => (c - 1 < 0 ? 0 : c - 1));
            }}
          >
            <Minus />
          </button>
          {quantity}
          <button onClick={() => setQuantity((c) => c + 1)}>
            <Plus />
          </button>
        </div>
        <button
          className="mt-5 w-full flex justify-center items-center bg-orange p-4 rounded-xl text-white font-bold md:ml-5"
          onClick={() => {
            if (quantity <= 0) return;
            addItemToCart({ ...item, quantity });
            setQuantity(0);
          }}
        >
          <CartIcon className="mr-3 fill-current" />
          Add to cart
        </button>
      </div>
    </>
  );
};
export default Price;
