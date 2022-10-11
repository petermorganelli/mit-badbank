import { createContext, useContext, useState, React } from "react";

const BankContext = createContext();

export const useBankContext = () => useContext(BankContext);

export const BankProvider = ({ children }) => {
  const [bank, setBank] = useState({
    loggedInUser: null,
    users: [
      {
        username: "Elliott Smith",
        password: "maddog2020",
        email: "Esmith@figure8.com",
        balance: 100,
      },
    ],
  });
///Transaction Logging
  const [loggedTransactions, setLoggedTransactions] = useState({
    data: [
      
    ],
  });

  const updateTransactions = (
    userName,
    currentBalance,
    newBalance,
    subtractedFunds,
    addedFunds,
    currentDate,
    transType
    
    
  ) => {
 
    setLoggedTransactions({
      
      data: [
        ...loggedTransactions.data,
        {
          userName,
          currentBalance,
          newBalance,
          subtractedFunds,
          addedFunds,
          currentDate,
          transType
          }
      ]
    });
   
  };

  const setLoggedInUser = (username) => {
    setBank({
      ...bank,
      loggedInUser: username,
    });
  };

  const addNewUser = (username, password, email, balance) => {
    setBank({
      ...bank,
      users: [
        ...bank.users,
        {
          username,
          password,
          email,
          balance,
        }
      ]
    });
   
  };
  const logOutUser = () => {
    setBank({
      ...bank,
      loggedInUser: null,
    });
  };

  

  ///Sets active user 
  const [currentUser, setCurrentUser] = useState('');

  const assignActiveUser = (e) => {
    const user = bank.users.find((user) => user.username === e);
    setCurrentUser(user.username);
    console.log(currentUser);
  };

  return (
    <BankContext.Provider
      value={{
        bank,
        addNewUser,
        setLoggedInUser,
        currentUser,
        assignActiveUser,
        setLoggedTransactions,
        loggedTransactions,
        updateTransactions,
        setCurrentUser,
        logOutUser,
      
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
