import { evenSmarterShuffledArray } from "./utils";

const originalArray = ["1", 3, "four", "V", "11", { test: "day" }];

describe("#evenSmarterShuffledArray", () => {
  const shuffledArr = evenSmarterShuffledArray(originalArray);

  it("generates an array with the same length", () => {
    expect(shuffledArr.length).toBe(originalArray.length);
  });

  it("does not have the same starting point", () => {
    expect(shuffledArr[0]).not.toBe(originalArray[0]);
  });

  it("returns original array when original array length is 0", () => {
    const emptyArray: any[] = [];

    expect(evenSmarterShuffledArray(emptyArray)).toEqual(emptyArray);
  });

  it("returns original array when original array length is 1", () => {
    const smallArray = ["s"];
    const newSmallArray = evenSmarterShuffledArray(smallArray);

    expect(newSmallArray[0]).toEqual(smallArray[0]);
    expect(newSmallArray.length).toBe(smallArray.length);
  });

  it("shuffles properly an array of two elements", () => {
    const twoElArray = [1, "II"];

    expect(evenSmarterShuffledArray(twoElArray)[0]).not.toEqual(twoElArray[0]);
    expect(evenSmarterShuffledArray(twoElArray)[1]).toEqual(twoElArray[0]);
  });
});
