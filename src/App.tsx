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

function App() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const url = 'https://fakestoreapi.com/products';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setAllItems(data);
      console.log(data);
    };
    fetchData();
  }, []);
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
                      <button className="border bg-blue-600 rounded text-white max-w-20 text-lg">
                        Add
                      </button>
                    </div>
                  </li>
                );
              })}
        </ul>
        <ul className="m-5 fixed right-0 items-center border-gray-200rounded-lg shadow w-60">
          <li>test1</li>
          <li>test2</li>
          <li>test3</li>
          <li>test4</li>
          <li>test4444444444444444444</li>
        </ul>
      </div>
    </>
  );
}

export default App;
