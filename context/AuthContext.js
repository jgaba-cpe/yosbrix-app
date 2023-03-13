import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

// (1) create the context
export const AuthContext = createContext();

// (6) authReducer function
//     responsible for updating the state and returning the new state
//     1st parameter = current state
//     2nd parameter = dispatch
export const authReducer = (state, action) => {
  // evaluate the type of dispatch action
  // update the state based on the type of action
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// (2) wraps the provider of AuthContext
export const AuthContextProvider = ({ children }) => {
  // (4) useReducer Hook
  //     [state, dispatch] comes from the useReducer Hook
  //     1st argument = reducer function
  //     2nd argument = initial state object
  //     authReducer function = controls the state
  //     dispatch = for updating the state using authReducer function
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // (7) wait for firebase to figure out if a user is logged in
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  // (3) template for wrapping child components
  return (
    // (5) context value = accessible in any component
    //     use spread syntax just in case there might be more state
    //     dispatch was added in order for it to be used in custom hooks
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
