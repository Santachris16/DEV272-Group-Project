import React, { createContext, useContext } from 'react';
import { supabase } from '../data/supabase';
import { useQuery} from '@tanstack/react-query';

// note: no need to create query client, it's already created in the root _layout

// ================= Create context ==================

//this is the data type for the user context
type UserContextType = {
  user: any;
  isPending: boolean;
  error: any;
};

// Create context with some default values
const UserContext = createContext<UserContextType>({
  user: null,
  isPending: false,
  error: null,
});

// ============ Create context provider =============
export const UserProvider = ({ children }: { children: React.ReactNode }) => {  // Use other React components or elements nested inside it (its 'children') as a prop
  const {
    data: sessionData,                          // Take the property data from the returned object and store it in a local variable called 'sessionData'
    isPending,
    error,
  } = useQuery({
    queryKey: ['userSession'],                  // can name anything, must be unique, this will show up in the devtools
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session?.user ?? null;        // Inside session property, there's user property which contains the user data
    },
    refetchOnWindowFocus: false,                // Don't refetch when the window is focused
  });

  return (
    <UserContext.Provider
      value={{ user: sessionData, isPending, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Export hook to use the UserContext, skipping having to use useContext(UserContext) every time
export const useUser = () => useContext(UserContext);


// Wrapping the UserProvider around the app in _layout.tsx so that the user data is available throughout the app