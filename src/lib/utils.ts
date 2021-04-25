export const addOrdersType = (type: any, orders: any) =>
  orders.map((o: any) => ({ ...o, type }));

export const shuffledArray = (arr: any) => {
  const newArr = [];
  const randomRecord: number[] = [];

  for (let index = 0; index < arr.length; index++) {
    // Gives you a random Integer between 0 and the array length
    const randomInt = Math.floor(Math.random() * arr.length);

    if (randomRecord.includes(randomInt)) {
      // The decrement is necessary to ensure the loop
      // passes over all the array positions
      index--;
    } else {
      randomRecord.push(randomInt);
      newArr.push(arr[randomInt]);
    }
  }

  return newArr;
};

export const smarterShuffledArray = (arr: any[]) => {
  const newArr = [];
  const randomRecord: Record<string, boolean> = {};

  // Gives you a random Integer between 0 and the array length
  let randomInt = Math.floor(Math.random() * arr.length);

  for (let index = 0; index < arr.length; index++) {
    while (index !== 0 && typeof randomRecord[randomInt] !== "undefined") {
      randomInt = Math.floor(Math.random() * arr.length);
    }

    randomRecord[randomInt] = true;
    newArr.push(arr[randomInt]);
  }

  return newArr;
};

// Constant Complexity (O(C))
export const evenSmarterShuffledArray = (originalArr: any[]) => {
  if (originalArr.length <= 1) {
    console.log(
      "🚨 Array is empty or has only one element and cannot be shuffled:",
      originalArr
    );

    return originalArr;
  }

  const shuffledArr: any[] = [];

  // Gives you a random Integer between 0 and the array length
  // By avoiding the 0 value, it avoids generating an exact copy of the originalArr
  let increaseRandomInt =
    Math.floor(Math.random() * (originalArr.length - 1)) + 1;
  let decreaseRandomInt = increaseRandomInt;

  // Assigns the starting point
  shuffledArr.push(originalArr[increaseRandomInt]);

  while (shuffledArr.length < originalArr.length) {
    // Goes right from starting point until the end of the array
    if (increaseRandomInt + 1 < originalArr.length) {
      increaseRandomInt += 1;
      shuffledArr.push(originalArr[increaseRandomInt]);
    }

    // Goes left from starting point until the beginning of the array
    if (decreaseRandomInt > 0) {
      decreaseRandomInt -= 1;
      shuffledArr.push(originalArr[decreaseRandomInt]);
    }
  }

  return shuffledArr;
};
