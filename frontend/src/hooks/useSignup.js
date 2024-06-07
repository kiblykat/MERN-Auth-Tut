import { useState } from "react";
//this just gets the context
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, setUser, login } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //proxy in package.json auto uses localhost:4000 as port
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(`json is: ${JSON.stringify(json)}`);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log("erorr occured");
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //we are passing the email and token to login func,
      //this calls setUser with the argument provided
      login(JSON.stringify(json));

      console.log({ user });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
