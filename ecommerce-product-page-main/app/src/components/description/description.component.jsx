import Price from '../price/price.component';

const Description = ({ item }) => {
  const { company, name, description } = item;
  return (
    <div className="p-5 lg:ml-20 md:p-10">
      <h4 className="text-primary font-bold mb-1">{company}</h4>
      <h1 className="text-4xl font-bold mb-5">{name}</h1>
      <p className="text-secondary max-width-text">{description}</p>
      <Price item={item} />
    </div>
  );
};
export default Description;
