import { ReactComponent as Close } from '../../images/icon-close.svg';
import Slider from '../slider/slider.component';
const Lightbox = ({
  images,
  selected,
  selectPrevious,
  selectNext,
  handleClose,
  setSelected,
}) => {
  return (
    <div className="w-screen h-screen absolute bg-black left-0 top-0 z-50 bg-opacity-70 lg:flex justify-center items-center flex-col hidden ">
      <div className="w-96 flex justify-end mb-4">
        <Close className="text-white cursor-pointer" onClick={handleClose} />
      </div>

      <Slider
        {...{
          images,
          selected,
          selectPrevious,
          selectNext,
        }}
        styles="w-full h-full flex absolute transition duration-700 ease-in-out"
        switcherStyles="z-10 flex justify-between items-center w-full"
        containerStyles="w-96 h-96 relative overflow-hidden flex justify-center items-center lg:rounded-xl lg:mb-5"
      />
      <div className="hidden lg:flex w-96 justify-between">
        {images.map(({ imageUrl, id }) => {
          return (
            <img
              src={imageUrl}
              key={id}
              alt="Shoe"
              className={`w-20 h-20 rounded-xl object-cover hover:opacity-50 transition cursor-pointer ${
                selected === id ? 'logo-hover opacity-50' : ''
              }`}
              onClick={() => setSelected(id)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Lightbox;
