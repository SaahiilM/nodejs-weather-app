const add = (first, second, callback) => {
  setTimeout(() => {
    let result = first + second;
    callback(result);
  }, 2000);
};

add(1, 4, (sum) => {
  console.log(sum);
});
