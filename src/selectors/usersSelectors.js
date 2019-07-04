
export const getUserState = store => store.userReducer;

export const getUserList = store =>
getUserState(store) ? getUserState(store).users : [];

export const getUserById = (store, id) => {
    if (getUserState(store)) {
        let userArray = getUserList(store).filter((user) => {
            return user.id == id;
        });
        if (userArray && userArray.length === 1)
            return userArray[0];
    }
}

export const getUserFilteredList = store =>
getUserState(store) ? getUserState(store).usersFiltered : [];

export const getUserFilteredById = (store, id) => {
    if (getUserState(store)) {
        let userArray = getUserFilteredList(store).filter((user) => {
            return user.id == id;
        });
        if (userArray && userArray.length === 1)
            return userArray[0];
    }
}

export const getUserIsFetching = store =>
getUserState(store).isFetching;
