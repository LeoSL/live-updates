export const addOrdersType = (type: any, orders: any) =>
  orders.map((o: any) => ({ ...o, type }));

export const shuffleArray = (arr: any) => {
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

export const smarterShuffleArray = (arr: any) => {
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

export const evenMoreSmarterShuffleArray = (arr: any) => {
  const newArr = [];
  const randomRecord: Record<string, boolean> = {};

  // Gives you a random Integer between 0 and the array length
  let randomInt = Math.floor(Math.random() * arr.length);

  let initialRandomInt = randomInt;

  while (newArr.length <= arr.length) {
    if (!randomRecord[randomInt]) {
      randomRecord[randomInt] = true;
      newArr.push(arr[randomInt]);
    }

    if (!!randomRecord[randomInt] && randomInt + 1 < arr.length) {
      randomInt += 1;
      randomRecord[randomInt] = true;
      newArr.push(arr[randomInt]);
    }

    if (initialRandomInt >= 0) {
      initialRandomInt -= 1;
      randomRecord[initialRandomInt] = true;
      newArr.push(arr[initialRandomInt]);
    }
  }

  return newArr;
};
