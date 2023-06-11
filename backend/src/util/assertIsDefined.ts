// function that checks whether a value is defined and not null or undefined
// T is the type of the value

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (!value) {
    throw Error("Expected 'value' to be defined, but received " + value);
    // throw an error if the value is falsy (null, undefined, false, "")
  }
}

// the function is asserts value is NonNullable<T> is a special syntax in TypeScript known as a type predicate. It indicates that the function narrows down the type of value to NonNullable<T>. After calling this function, TypeScript will consider value to be non-nullable (not null or undefined)