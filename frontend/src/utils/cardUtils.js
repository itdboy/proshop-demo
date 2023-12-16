// addDecimals จะคืนค่าเป็น String
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {

  //คำนวนหา itemprice (เป็นยอดรวมค่าใช้จ่ายทั้งหมด) จากแต่ล่ะ cartitem แล้ว บวกกลับเข้าไป
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100 * item.qty) / 100,
    0
  );

  
  state.itemPrice = addDecimals(itemsPrice);

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  state.totalPrice = addDecimals(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  // //คำนวนหา itemprice (เป็นยอดรวมค่าใช้จ่ายทั้งหมด) จากแต่ล่ะ cartitem แล้ว บวกกลับเข้าไป
  // state.itemPrice = addDecimals(
  //   // + * จะทำการคำนวนที่ตัวคูณก่อน แล้วถึงจะบวก เชน 1+5*2 = 11 ไม่ใช่ 12
  //   state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // );
  // //คำนวนหาค่าขนส่ง ถ้ายอดสั่งซื้อมากกว่า 100 จะไม่คิด แต่ถ่าน้อยกว่า ให้คิด 10
  // state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // //คำนวนภาษี จากยอดรวม *0.15
  // state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // //Number เป็นการแปลง String เป็นตัวเลข
  // //calculate total price
  // state.totalPrice = (
  //   Number(state.itemsPrice) +
  //   Number(state.shippingPrice) +
  //   Number(state.taxPrice)
  // ).toFixed(2);

  // localStorage.setItem("cart", JSON.stringify(state));
};
