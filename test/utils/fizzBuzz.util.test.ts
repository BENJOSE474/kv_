import { FizzBuzz } from "../../src/utils/fizzBuzz.util";
describe("fizzBuzz test", () => {
  let fizzBuzz: FizzBuzz;
  beforeEach(() => {
    fizzBuzz = new FizzBuzz();
  });
  it('should return "Buzz" for numbers divisible by 3', () => {
    const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz.fizzBuzz(6)).toBe("Fizz");
  });
  it('should return "Buzz" for numbers divisible by 3', () => {
    const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
    expect(fizzBuzz.fizzBuzz(10)).toBe("Buzz");
  });
  it('should return "FizzBuzz" for numbers divisible by 3 and 6', () => {
    const fizzBuzz = new FizzBuzz();
    expect(fizzBuzz.fizzBuzz(45)).toBe("FizzBuzz");
    expect(fizzBuzz.fizzBuzz(75)).toBe("FizzBuzz");
  });
  it("using mocks", () => {
    let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
    fizzBuzz.divisibleByThree = mockFn;
    expect(fizzBuzz.fizzBuzz(4)).toBe(4);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
  it("using spy", () => {
    const spy = jest.spyOn(fizzBuzz, 'divisibleByThree');
    expect(fizzBuzz.fizzBuzz(4)).toBe(4);
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });
});
