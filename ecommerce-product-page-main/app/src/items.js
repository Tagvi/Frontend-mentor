import ImageUrl1 from './images/image-product-1.jpg';
import ImageUrl2 from './images/image-product-2.jpg';
import ImageUrl3 from './images/image-product-3.jpg';
import ImageUrl4 from './images/image-product-4.jpg';

export const items = [
  {
    id: 0,
    images: [
      { id: 0, imageUrl: ImageUrl1 },
      { id: 1, imageUrl: ImageUrl2 },
      { id: 2, imageUrl: ImageUrl3 },
      { id: 3, imageUrl: ImageUrl4 },
    ],
    company: 'SNEAKER COMPANY',
    name: 'Fall Limited Edition Sneakers',
    description: `These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.`,
    price: 125,
    onSale: true,
    prevPrice: 250,
  },
];
