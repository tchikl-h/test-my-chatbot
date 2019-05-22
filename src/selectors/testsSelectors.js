export const getTestState = store => store.testReducer;

export const getTestList = store =>
getTestState(store) ? getTestState(store).tests : [];

export const getTestFilteredList = store =>
getTestState(store) ? getTestState(store).testsFiltered : [];

export const getTestIsFetching = store =>
getTestState(store).isFetching;
