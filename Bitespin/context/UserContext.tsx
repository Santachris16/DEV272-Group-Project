import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../data/supabase';

// ================= Create context ==================

type UserContextType = {
  user: any;
  isPending: boolean;
  error: any;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isPending: false,
  error: null,
});

// ============ Context Provider =============
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // local state for user, loading, and error
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch session once on mount
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setUser(data.session?.user ?? null);
        }
        setIsPending(false);
      });

    // Listen to auth state changes and update user | note: destructuring the data property from the object returned by onAuthStateChange, and saving it as listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // unsubscribe when component unmounts
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, isPending, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


// note on change:
// useQuery only fetch the login state once on mount
// and does not update on auth state changes, so we need a custom context that listens to auth state changes via supabase.auth.onAuthStateChange

// ============ IMPORTANT NOTE =============
// BIG note on useEffect (thank you React class for ts!):
//useEffect runs the first function after the component renders and whenever dependencies change (the array in the second argument). 
// Inside that function, the optional return defines a cleanup function that runs before the next effect runs or when the component unmounts.