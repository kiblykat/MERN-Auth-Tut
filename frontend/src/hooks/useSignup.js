import { useState } from "react";
//this just gets the context
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, setUser, login } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user/signup", {
        email,
        password,
      });
      console.log(`JS Object is: ${response.data}`);
      console.log(`JSON notation is: ${JSON.stringify(response.data)}`);

      //localStorage and login func can only interact with string objects
      localStorage.setItem("user", JSON.stringify(response.data));
      login(response.data);
      console.log({ user });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setError(err.response?.data?.error || error.message);
      console.log({ error: err.response?.data?.error });
    }
  };
  return { signup, isLoading, error };
};

// - - - - - USING FETCH METHOD - - - - -
//   //proxy in package.json auto uses localhost:4000 as port
//   const response = await fetch("/api/user/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   const json = await response.json();
//   console.log(`json is: ${JSON.stringify(json)}`);

//   if (!response.ok) {
//     setIsLoading(false);
//     setError(json.error);
//     console.log("erorr occured");
//   }
//   if (response.ok) {
//     //save the user to local storage
//     localStorage.setItem("user", JSON.stringify(json));

//     //we are passing the email and token to login func,
//     //this calls setUser with the argument provided
//     login(json);

//     console.log({ user });
//     setIsLoading(false);
//   }
// };
//   };
//   return { signup, isLoading, error };
// };
