function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calcPrices(orderItems) {
  // Calculate the items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate the shipping price
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  // Calculate the total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}

// function addDecimals(num) {
//   return (Math.round(num * 100) / 100).toFixed(2);
// }

// export function calcPrices(orderItems) {
//   // reduce = ซึ่งมันทำงานโดยการเข้าไปที่ element แต่ละตัวและทำกระบวนการบางอย่าง แล้วนำค่าที่ return ออกมาเก็บไว้เพื่อเอาไปใช้งานในการทำงานใน element ถัดไป และทำไปเรื่อย ๆ จนกว่าจะครบทุก element
//   const itemsPrice = orderItems.reduce(
//     (acc, item) => acc + (item.price * item.qty) / 100,
//     0
//   );
// }

// const shippingPrice = tempsPrice > 100 ? 0 : 10;

// const taxPrice = 0.15 * itemsPrice;

// const totalPrice = itemsPrice + shippingPrice + taxPrice;

// return {
//   itemsPrice: addDecimals(itemsPrice),
//   shippingPrice: addDecimals(shippingPrice),
//   taxPrice: addDecimals(taxPrice),
//   totalPrice: addDecimals(totalPrice),
// };
