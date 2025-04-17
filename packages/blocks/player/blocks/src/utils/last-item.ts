export function lastItem<T = any>(mapOrSet: Map<any,T> | Set<T>): T{
  const iterator = mapOrSet.values();
  let i = 1;
  while(i++ < mapOrSet.size && iterator.next()){}
  return iterator.next().value;
}

export default lastItem;
