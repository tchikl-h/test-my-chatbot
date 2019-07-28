export const getCompanyState = store => store.companyReducer;

export const getCompanyList = store =>
getCompanyState(store) ? getCompanyState(store).companies : [];

export const getCompanyById = (store, id) => {
    if (getCompanyState(store)) {
        let companyArray = getCompanyList(store).filter((company) => {
            return company.id == id;
        });
        if (companyArray && companyArray.length === 1)
            return companyArray[0];
    }
}

export const getCompanyIsFetching = store =>
getCompanyState(store).isFetching;
