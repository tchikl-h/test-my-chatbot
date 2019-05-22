export const getCompanyState = store => store.companyReducer;

export const getCompanyList = store =>
getCompanyState(store) ? getCompanyState(store).companies : [];

export const getCompanyIsFetching = store =>
getCompanyState(store).isFetching;
