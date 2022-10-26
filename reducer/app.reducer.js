const AppReducer = (state, action) => {
  switch (action.type) {
    case "ACCOUNTS_INFO":
      return {
        ...state,
        accountsData: {
          ...state.accountsData,
          accountsList: action.accountsList,
        },
      };
    default:
      return state;
  }
};

export default AppReducer;
