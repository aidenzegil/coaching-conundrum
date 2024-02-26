import React, { useContext, useEffect, useState } from "react";

import { createRegisteredContext } from "react-singleton-context";
import { User, UserType } from "../../../common/types/user";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { userController } from "../../../lib/server/controllers/users/controller";

const defaultProvider = {
  user: {
    id: null,
    phoneNumber: null,
    userType: UserType.STUDENT,
    bookedBlockIds: [],
    createdBlockIds: [],
  },
};

type Provider = {
  user: {
    id: string | null;
    phoneNumber: string | null;
    userType: UserType;
    bookedBlockIds: string[];
    createdBlockIds: string[];
  };
};

const UserContext = createRegisteredContext<Provider>(
  "user-provider-context",
  defaultProvider
);

// Create the context provider
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const currentUrl = usePathname();
  const { query } = useRouter();

  const asyncUserUpdate = async () => {
    const userId = query.userId as string;

    if (userId) {
      // fetch user by id
      try {
        const user = await userController({}).getUser({ id: userId });
        if (user.isErr()) {
          return console.error(user.error);
        }
        setUser(user.value);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    asyncUserUpdate();
  }, [currentUrl, query.userId]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );

  // Wrap the children with the context provider
  // return (
  // <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
  // )
};

export const useUserContext = () => useContext(UserContext);
