import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDataRef = doc(db, 'users', user.uid);
        const unsubscribeDoc = onSnapshot(
          userDataRef,
          (docSnapshot) => {
            setUserState({ uid: user.uid, ...docSnapshot.data() });
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
        return () => {
          unsubscribeDoc();
        };
      } else {
        setUserState(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userState, setUserState, loading }}>
      {children}
    </UserContext.Provider>
  );
};
