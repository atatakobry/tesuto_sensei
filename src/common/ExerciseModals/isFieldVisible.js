function isFieldVisible(fieldsByExerciseType, exerciseTypeUid, field) {
  if (!fieldsByExerciseType || !exerciseTypeUid || !field) {
    return false;
  }

  return fieldsByExerciseType[exerciseTypeUid].includes(field);
}

export default isFieldVisible;
