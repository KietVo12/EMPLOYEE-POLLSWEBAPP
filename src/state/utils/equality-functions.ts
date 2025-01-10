export const customObjectEqual = (oldValue: any, newValue: any) =>
  JSON.stringify(oldValue) === JSON.stringify(newValue);
