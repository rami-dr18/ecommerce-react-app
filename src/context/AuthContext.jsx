import React from "react";

export const AuthContext = React.createContext(null);
export default function AuthProvider({ children }) {
  const [user, setUser] = React.useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );
  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "email already exists" };
    }
    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });
    return { success: true };
  }
  function logIn(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { success: false, error: "user credentials are wrong" };
    }
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true };
  }
  function logOut() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ signUp, user, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}
