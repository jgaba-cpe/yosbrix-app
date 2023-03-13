import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// custom hook that consumes the context and pass it to the components
// components use this hook instead of accessing the context directly
export const useAuthContext = () => {
  // (1) useContext hook
  //     consumes the AuthContext
  //     context variable contain the value object
  const context = useContext(AuthContext);

  // (2) additional check
  //     check if there is no value in the context and throw an error
  //     check if the context is used outside of its scope
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  // (3) return the context if useAuthContext was used in other component
  return context; // <----- { ...state, dispatch }
};
