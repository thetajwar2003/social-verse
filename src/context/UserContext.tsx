import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { User } from "../types/UserType";

type UserContextType = {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
};

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User>({
    docId: "",
    username: "",
    dob: "",
    bio: "",
    profilePicUrl: "",
    name: "",
    email: "",
    followers: 0,
    following: 0,
    trendy: false,
    verses: [],
    trendyVerses: 0,
    tips: 0,
    totalLike: 0,
    totalDislikes: 0,
    warnings: 0,
    userType: "",
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
