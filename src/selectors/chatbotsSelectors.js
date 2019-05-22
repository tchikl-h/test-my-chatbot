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

// getChatbotState(store) ? getChatbotList(store).map((chatbot) => {
//     if (chatbot.id === id)
//         return chatbot
// }) : {}

export const getChatbotFilteredList = store =>
getChatbotState(store) ? getChatbotState(store).chatbotsFiltered : [];

export const getChatbotFilteredById = (store, id) => {
    if (getChatbotState(store)) {
        let chatbotArray = getChatbotFilteredList(store).filter((chatbot) => {
            return chatbot.id == id;
        });
        if (chatbotArray && chatbotArray.length === 1)
            return chatbotArray[0];
    }
}

export const getChatbotIsFetching = store =>
getChatbotState(store).isFetching;