import { useEffect, useState } from 'react';
import './App.css';

type Rating = {
  count: number;
  rate: number;
};

type Item = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

type CartItem = {
  id: number;
  image: string;
  price: number;
  title: string;
  number: number;
};

function App() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const url = 'https://fakestoreapi.com/products';

  const onClickAdd = (itemNumber: number) => {
    console.log(itemNumber);
    const targetItem: Item = allItems[itemNumber];
    const result = cartItem.some((item) => item.id === itemNumber);
    if (result) {
      const newCartItems: CartItem[] = [...cartItem];
      const updateIndex = newCartItems.findIndex(
        (item) => item.id === itemNumber
      );
      newCartItems[updateIndex].number++;
      setCartItem(newCartItems);
    } else {
      setCartItem((prev) => [
        ...prev,
        {
          id: itemNumber,
          image: targetItem.image,
          price: targetItem.price,
          title: targetItem.title,
          number: 1,
        },
      ]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setAllItems(data);
      console.log(data);
    };
    fetchData();
  }, [cartItem]);
  return (
    <>
      <div className="container flex m-5">
        <ul className="-my-6 divide-y divide-gray-200 m-5">
          {allItems.length === 0
            ? ''
            : allItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className=" my-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-cyan-200  dark:bg-white dark:hover:bg-cyan-200"
                  >
                    <img
                      className="object w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={item.image}
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                        {item.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-black">
                        {item.description}
                      </p>
                      <button
                        id={String(index)}
                        className="border bg-blue-600 rounded text-white max-w-20 text-lg"
                        onClick={() => onClickAdd(index)}
                      >
                        Add
                      </button>
                    </div>
                  </li>
                );
              })}
        </ul>
        <ul className="m-5 fixed right-0 items-center border-gray-200rounded-lg shadow w-60">
          {cartItem.length === 0
            ? ''
            : cartItem.map((item, index) => {
                return (
                  <li key={index} className="">
                    <div className="flex flex-row">
                      <img src={item.image} className="size-1/6" />
                      <p>{item.number}</p>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
}

export default App;
