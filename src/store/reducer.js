
export const initialState = {
  loading: false,
  employees: [],
  errorMessage: null
};


export const reducer = (state, action) => {
  switch (action.type) {
     case "SEARCH_EMPLOYEE_REQUEST":
      return {
        ...state,
        isFound: false,
        errorMessage: null
      }
    case "SEARCH_EMPLOYEE_SUCCESS":
      return {
        ...state,
        isFound:true,
        employees: action.payload
      };
    case "SEARCH_EMPLOYEE_FAILURE":
      return {
        ...state,
        isFound: false,
        errorMessage: 'Employee not Found'
      };
    default:
      return state;
  }
};

