import { createContext, useContext, useState } from "react";
import { User } from "../types";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
