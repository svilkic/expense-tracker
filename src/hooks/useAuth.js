import { useEffect, useState, useLayoutEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'config/firebase';

export const useAuth = (redirectNoUser, redirectYesUser) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    console.log('----Current-----');
    console.log(auth.currentUser);
    console.log('----------------');

    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ user, authenticated: !!user });
        console.log('----Login-----');
        const uid = user.uid;
        console.log(uid);
        console.log('--------------');
        if (redirectYesUser) navigate(redirectYesUser);
      } else {
        if (redirectNoUser) navigate(redirectNoUser);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  const checkRedirect = (NoUser, YesUser) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ user, authenticated: !!user });
        console.log('----Login-----');
        const uid = user.uid;
        console.log(uid);
        console.log('--------------');
        if (YesUser) navigate(YesUser);
      } else {
        if (NoUser) navigate(NoUser);
      }
    });
  };
  return { authState, checkRedirect };
};
