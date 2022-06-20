import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  f7,
} from 'framework7-react';
import firebaseConfiguration from './firebaseConfiguration';

const firebaseConfig = firebaseConfiguration;

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const logIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      if (/[a-z.]+@asial.co.jp/.test(user.email)) {
        f7.views.current.router.navigate('/event', {
          reloadAll: true,
          browserHistory: false,
          ignoreCache: true,
        });
      } else {
        f7.views.current.router.navigate('/list', {
          reloadAll: true,
          browserHistory: false,
          ignoreCache: true,
        });
      }
      return user;
    })
    .catch(() => {
      f7.dialog.alert('User or password incorrect.', 'Error');
    });
};

export default logIn;
