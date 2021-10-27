import { useState, useEffect } from 'react';
import Slider from '../slider/slider.component';
import Lightbox from '../lightbox/lightbox.component';

const mediaQuery = '(min-width: 1024px)';

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);
  const [matches, setMatches] = useState(window.matchMedia(mediaQuery).matches);
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    window.matchMedia(mediaQuery).addEventListener('change', handler);
    return () => {
      window.matchMedia(mediaQuery).removeEventListener('change', handler);
    };
  }, [setMatches]);
  const selectNext = () => {
    setSelected(selected + 1 === images.length ? 0 : selected + 1);
  };

  const selectPrevious = () => {
    setSelected(selected - 1 < 0 ? images.length - 1 : selected - 1);
  };
  const handleImageClick = () => {
    if (matches) {
      setLightBoxOpen(true);
      console.log('clicked!');
    }
    return;
  };

  return (
    <>
      <div>
        <Slider
          {...{
            images,
            handleImageClick,
            selected,
            selectPrevious,
            selectNext,
          }}
          styles="w-full h-full flex absolute transition duration-700 ease-in-out lg:relative"
          switcherStyles="z-10 flex justify-between items-center w-full lg:hidden"
          containerStyles="w-full h-72 md:h-96 relative overflow-hidden flex justify-center items-center lg:rounded-xl lg:block lg:mb-5 lg:max-w-xl lg:mx-auto"
        />
        <div className="hidden lg:flex w-full justify-between lg:max-w-md lg:mx-auto">
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
      {lightBoxOpen ? (
        <Lightbox
          {...{
            images,
            selected,
            selectPrevious,
            selectNext,
            setSelected,
          }}
          handleClose={() => setLightBoxOpen(false)}
        />
      ) : null}
    </>
  );
};
export default ImageGallery;
