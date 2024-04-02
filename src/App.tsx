import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Action, CartItem, Item } from './Types';

function App() {
  const [allItems, setAllItems] = useState<Item[]>([]);

  const reducer = (state: CartItem[], action: Action): CartItem[] => {
    switch (action.type) {
      case 'ADD': {
        const targetItem: Item = allItems[action.targetNumber];
        const result = state.some((item) => item.id === targetItem.id);
        if (result) {
          const newCartItems: CartItem[] = [...state];
          const updateIndex = newCartItems.findIndex(
            (item) => item.id === targetItem.id
          );
          newCartItems[updateIndex].number++;
          return newCartItems;
        } else {
          return [
            ...state,
            {
              id: targetItem.id,
              image: targetItem.image,
              price: targetItem.price,
              title: targetItem.title,
              number: 1,
            },
          ];
        }
      }
      case 'REMOVE': {
        const newCartItems: CartItem[] = [...state];
        newCartItems[action.targetNumber].number--;
        if (newCartItems[action.targetNumber].number < 1) {
          newCartItems.splice(action.targetNumber, 1);
        }
        return newCartItems;
      }

      case 'RESET':
        return [];
      default:
        throw new Error('Error!!!!!');
    }
  };

  const [cartItems, dispatch] = useReducer(reducer, []);
  const url = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setAllItems(data);
    };
    fetchData();
    console.log(cartItems);
  }, [cartItems]);

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
                        onClick={() =>
                          dispatch({ type: 'ADD', targetNumber: index })
                        }
                      >
                        Add
                      </button>
                    </div>
                  </li>
                );
              })}
        </ul>
        <ul className="m-5 fixed right-0 items-center border-gray-200rounded-lg shadow w-60">
          {cartItems.length === 0
            ? ''
            : cartItems.map((item, index) => {
                return (
                  <li key={index} className="">
                    <div className="flex flex-row space-x-14">
                      <img src={item.image} className="size-1/6" />
                      <p>{item.number}</p>
                      <button
                        className="border bg-blue-600 rounded text-white h-10 p-1 text-lg"
                        id={String(index)}
                        onClick={() =>
                          dispatch({ type: 'REMOVE', targetNumber: index })
                        }
                      >
                        remove
                      </button>
                    </div>
                  </li>
                );
              })}
          <button
            className="border bg-blue-600 rounded text-white h-10 p-1 text-lg"
            onClick={() => dispatch({ type: 'RESET' })}
          >
            Reset
          </button>
        </ul>
      </div>
    </>
  );
}

export default App;
