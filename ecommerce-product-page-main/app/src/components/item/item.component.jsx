import Description from '../description/description.component';
import ImageGallery from '../image-gallery/image-gallery.component';

const Item = ({ item }) => (
  <div className="lg:p-32 lg:px-40 lg:flex items-center 2xl:px-96 justify-center">
    <ImageGallery images={item.images} />
    <Description item={item} />
  </div>
);
export default Item;
