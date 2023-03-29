import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useState } from 'react';

export function SignInButton() {
   const [ isUserLoggedIn, setIsUserLoggedIn] = useState(false);

   const toggleState = () => {
      setIsUserLoggedIn(!isUserLoggedIn);
   }

   return isUserLoggedIn ? (
      <button
         type="button"
         className={styles.signInButton}
         onClick={() => toggleState()}
      >
         <FaGithub color="#04d361" />
         Pedro Luna
         <FiX color="#737380" className={styles.closeIcon} />
      </button>
   ) : (
      <button
         type="button"
         className={styles.signInButton}
         onClick={() => toggleState()}
      >
         <FaGithub color="#eba417" />
         Sign in with Github
      </button>
   );
}