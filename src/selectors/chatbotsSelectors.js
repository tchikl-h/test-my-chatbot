export const getChatbotState = store => store.chatbotReducer;

export const getChatbotList = store =>
getChatbotState(store) ? getChatbotState(store).chatbots : [];

export const getChatbotById = (store, id) => {
    if (getChatbotState(store)) {
        let chatbotArray = getChatbotList(store).filter((chatbot) => {
            return chatbot.id == id;
        });
        if (chatbotArray && chatbotArray.length === 1)
            return chatbotArray[0];
    }
}

export const getChatbotFilteredByCompanyList = store =>
getChatbotState(store) ? getChatbotState(store).chatbotsFilteredByCompany : [];

export const getChatbotFilteredByUserList = store =>
getChatbotState(store) ? getChatbotState(store).chatbotsFilteredByUser : [];

export const getChatbotFilteredById = (store, id) => {
    if (getChatbotState(store)) {
        let chatbotArray = getChatbotFilteredByUserList(store).filter((chatbot) => {
            return chatbot.id == id;
        });
        if (chatbotArray && chatbotArray.length === 1)
            return chatbotArray[0];
    }
}

export const getChatbotResponseById = store =>
getChatbotState(store) ? getChatbotState(store).chatbotResponse : [];

export const getChatbotLastUpdatedById = store =>
getChatbotState(store) ? getChatbotState(store).lastUpdated : [];

export const getChatbotIsFetching = store =>
getChatbotState(store).isFetching;