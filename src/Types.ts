export type Rating = {
  count: number;
  rate: number;
};

export type Item = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

export type CartItem = {
  id: number;
  image: string;
  price: number;
  title: string;
  number: number;
};

export type Action =
  | {
      type: 'ADD';
      targetNumber: number;
    }
  | {
      type: 'REMOVE';
      targetNumber: number;
    }
  | {
      type: 'RESET';
    };
