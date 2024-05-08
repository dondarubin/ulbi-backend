export function isValidFilterOptions<T extends object>(option: any, optionType: T): option is T[keyof T] {
  return Object.values(optionType).includes(option);
}