import { ReactComponent as Previous } from '../../images/icon-previous.svg';
import { ReactComponent as Next } from '../../images/icon-next.svg';

const Slider = ({
  images,
  handleImageClick,
  selected,
  styles,
  selectPrevious,
  selectNext,
  switcherStyles,
  containerStyles,
}) => {
  return (
    <div className={containerStyles}>
      <div
        className={styles}
        style={{ transform: `translateX(-${selected * 100}%)` }}
        onClick={handleImageClick}
      >
        {images.map(({ imageUrl, id }) => (
          <img
            src={imageUrl}
            alt="Shoe"
            className="w-full h-full object-cover flex-shrink-0"
            key={id}
          />
        ))}
      </div>
      <div className={switcherStyles}>
        <button
          onClick={selectPrevious}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center ml-4 hover:text-primary transition"
        >
          <Previous />
        </button>
        <button
          onClick={selectNext}
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center mr-4 hover:text-primary transition"
        >
          <Next />
        </button>
      </div>
    </div>
  );
};
export default Slider;
