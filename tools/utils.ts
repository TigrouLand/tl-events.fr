import Levenshtein from 'levenshtein';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findQuery = <O extends any[]>(queries: Ref<O>, current: Ref<string>) => {
  return queries.value.filter(
    (query): boolean =>
      query.name.toLowerCase().startsWith(current.value.toLowerCase()) ||
      new Levenshtein(query.name.toLowerCase(), current.value.toLowerCase()).distance < 5
  );
};
