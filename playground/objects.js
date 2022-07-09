// Object property shorthand
const name = "Saahiil";
const age = 27;

const user = {
  name,
  age,
};

console.log(user);

// Object destructuring

const product = {
  label: "some product",
  price: 3,
  stock: 21,
  salePrice: undefined,
};
// rename propertyName:propertyNewName
// default value propertyName=defaultValue
// const { label: productLabel, price, stock, rating = 5 } = product;
// console.log(productLabel, price, stock, rating);

// destructuring inline
const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction("order", product);
