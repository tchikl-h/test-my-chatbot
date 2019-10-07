export const getLogState = store => store.logReducer;

export const getLogList = store =>
getLogState(store) ? getLogState(store).logs : [];

export const getLogFilteredList = store =>
getLogState(store) ? getLogState(store).logsFiltered : [];

export const getLogIsFetching = store =>
getLogState(store).isFetching;
