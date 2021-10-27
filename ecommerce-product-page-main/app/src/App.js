import Header from './components/header/header.component';
import Item from './components/item/item.component';
import { items } from './items';
function App() {
  return (
    <div className="min-h-screen font-main">
      <Header />
      <Item item={items[0]} />
    </div>
  );
}

export default App;
