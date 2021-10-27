import { ReactComponent as BurgerMenu } from '../../images/icon-menu.svg';
import { ReactComponent as CartIcon } from '../../images/icon-cart.svg';
import avatar from '../../images/image-avatar.png';
import { ReactComponent as CloseIcon } from '../../images/icon-close.svg';
import { useContext, useState } from 'react';
import { CartContext } from '../../providers/cart/cart.provider';
import Cart from '../cart/cart.component';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  function closeMenu() {
    setMenuOpen(false);
  }
  function openMenu() {
    setMenuOpen(true);
  }
  const {
    itemCount,
    cartHidden,
    toggleCartHidden,
    total,
    cartItems,
    clearItemFromCart,
  } = useContext(CartContext);
  return (
    <div className="bg-white p-5 lg:px-40 relative 2xl:px-96">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BurgerMenu className="cursor-pointer md:hidden" onClick={openMenu} />
          <p className="ml-4 pb-1.5 font-bold text-3xl md:ml-0 cursor-pointer">
            sneakers
          </p>
          <div
            className={`w-screen h-screen absolute top-0 left-0 z-20 transition transform ${
              menuOpen ? 'translate-x-0' : '-translate-x-full '
            } md:w-auto md:h-auto md:relative md:transform-none md:ml-10`}
            onClick={closeMenu}
          >
            <div
              className="w-9/12 h-screen bg-white z-30 absolute left-0 top-0 p-5 md:w-auto md:h-auto md:relative md:bg-transparent md:p-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CloseIcon
                className="mb-10 cursor-pointer md:hidden"
                onClick={closeMenu}
              />
              <nav>
                <ul className="font-bold md:flex text-xl space-y-5 md:space-x-5 md:items-center md:space-y-0 md:font-light md:text-secondary md:text-base ">
                  <li className="md:navbar-item">Collections</li>
                  <li className="md:navbar-item">Men</li>
                  <li className="md:navbar-item">Women</li>
                  <li className="md:navbar-item">About</li>
                  <li className="md:navbar-item">Contact</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative cursor-pointer" onClick={toggleCartHidden}>
            <CartIcon />
            <p className="absolute -top-3 -right-3 bg-orange text-white font-bold px-2 rounded-3xl text-sm">
              {itemCount}
            </p>
          </div>
          <div className="w-8 h-8 ml-5 object-cover md:h-12 md:w-12 md:ml-10 rounded-full hover:logo-hover">
            <img src={avatar} alt="avatar" />
          </div>
        </div>
        <Cart cartItems={cartItems} cartHidden={cartHidden} />
      </div>
      <div className="w-full h-px bg-darkGray mt-5 hidden lg:block"></div>
    </div>
  );
};
export default Header;
