export const getAssertionState = store => store.assertionReducer;

export const getAssertionList = store =>
getAssertionState(store) ? getAssertionState(store).assertions : [];

export const getAssertionFilteredList = store =>
getAssertionState(store) ? getAssertionState(store).assertionsFiltered : [];

export const getAssertionIsFetching = store =>
getAssertionState(store).isFetching;
