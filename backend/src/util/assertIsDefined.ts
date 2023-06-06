// function that checks whether a value is defined and not null or undefined
// T is the type of the value

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (!value) {
    throw Error("Expected 'value' to be defined, but received " + value);
    // throw an error if the value is falsy (null, undefined, false, "")
  }
}
