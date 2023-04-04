import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton() {
   const session = useSession();

   return session.data ? (
      <button
         type="button"
         className={styles.signInButton}
         onClick={() => signOut()}
         disabled={session.status == 'loading'}
      >
         <FaGithub color="#04d361" />
         {session.data.user.name}
         {/* {console.log('session:\n', session)} */}
         <FiX color="#737380" className={styles.closeIcon} />
      </button>
   ) : (
      <button
         type="button"
         className={styles.signInButton}
         onClick={() => signIn('github')}
         disabled={session.status == 'loading'}
      >
         <FaGithub color="#eba417" />
         Sign in with Github
      </button>
   );
}