function removeTypename(obj) {
  return JSON.parse(
    JSON.stringify(obj, (k, v) => (k === '__typename' ? undefined : v))
  );
}

function convertExercise(exercise, compareFunction) {
  // NOTE: remove `__typename` fields (added by Apollo for caching)
  exercise = removeTypename(exercise);

  // NOTE: object => array of `{ key, value }`
  exercise = Object.keys(exercise).reduce(
    (ac, p) => [...ac, { key: p, value: exercise[p] }],
    []
  );

  // NOTE: sort array with `compareFunction` if it's necessary
  if (typeof compareFunction === 'function') {
    exercise = exercise.sort(compareFunction);
  }

  return exercise;
}

export default convertExercise;
