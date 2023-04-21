import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { auth, GoogleProvider } from '../lib/firebase';
import { useAuth } from '../lib/useAuth';
import { useSignInWithEmailAndPassword, useDeleteUser } from 'react-firebase-hooks/auth';
import { signInWithPopup } from 'firebase/auth';

import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleError, setGoogleError] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [deleteUser, loadingDelete, errorDelete] = useDeleteUser(auth);

  if (user) {
    router.push('/');
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      router.push('/');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleSignInGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      if (result._tokenResponse.isNewUser) {
        setGoogleError(true);
        deleteUser();
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
    }
  };

  return (
    <>
      <div className='flex min-h-full bg-secondary'>
        <div className='m-6 flex w-full'>
          <div className='flex flex-1 flex-col justify-center border-3 h-full'>
            <div className='mx-auto w-full flex flex-col flex-1 justify-center py-8 px-14 border-b-3'>
              <div>
                <Image className='h-12 w-auto' width='48' height='48' src='/BP.png' alt='Your Company' />
                <h2 className='mt-6 text-2xl xl:text-4xl font-medium tracking-tight'>Welcome to Banter Pundits</h2>
                <p className='mt-2 text-xl text-body'>Sign in to access your account and start bantering</p>
              </div>

              <div className='mt-8 gap-y-8 flex flex-col'>
                <div className=''>
                  <form action='#' method='POST' onSubmit={handleSignIn} className='space-y-6'>
                    <div>
                      <label htmlFor='email' className='block text-sm font-medium leading-6 text-title'>
                        Email
                      </label>
                      <div className='mt-1'>
                        <input
                          id='email'
                          name='email'
                          type='text'
                          autoComplete='email'
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='input-base'
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor='password' className='block text-sm font-medium leading-6 text-title'>
                        Password
                      </label>
                      <div className='mt-1'>
                        <input
                          id='password'
                          name='password'
                          type='password'
                          autoComplete='current-password'
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className='input-base'
                        />
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <input
                          id='remember-me'
                          name='remember-me'
                          type='checkbox'
                          className='checkbox-base'
                        />
                        <label htmlFor='remember-me' className='ml-2 block text-sm text-title'>
                          Remember me
                        </label>
                      </div>

                      <div className='text-sm'>
                        <a href='#' className='font-medium'>
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div>
                      {error && <p className='text-red-600 mb-2'>Oops, we could not log you in with these credentials. Please try again</p>}
                      <button type='submit' className='mt-4 w-full btn-lg btn-primary'>
                        {loading ? <span className='loader'></span> : <span>Sign in</span>}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='mx-auto w-full py-8 px-14'>
              <div className='w-full text-center flex flex-col justify-center items-center gap-4'>
                <span className='bg-l3 px-2 '>Or sign in with</span>
                <button onClick={handleSignInGoogle} className='btn-lg btn-secondary w-1/3'>
                  <span className='sr-only'>Sign up with Google</span>
                  <svg className='h-5 w-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M14.1429 5.33718C13.4062 4.66168 12.1144 3.85336 10.1992 3.85336C7.50211 3.85336 5.21297 5.59183 4.38562 7.99466C4.18164 8.61473 4.05703 9.27909 4.05703 9.96565C4.05703 10.6521 4.18164 11.3166 4.39695 11.9366C5.21297 14.3395 7.50211 16.0779 10.1992 16.0779C11.7177 16.0779 12.8737 15.6682 13.7349 15.0813C15.0948 14.1512 15.7068 12.7671 15.8201 11.848H10.1992V8.14969H19.7752C19.9224 8.76977 19.9905 9.36771 19.9905 10.1871C19.9905 13.2211 18.8798 15.7789 16.9534 17.5174C15.2648 19.0454 12.953 19.9313 10.1992 19.9313C6.21016 19.9313 2.76508 17.6945 1.08789 14.4391C0.396641 13.0882 0 11.5712 0 9.96565C0 8.36008 0.396641 6.84305 1.08789 5.49214C2.76508 2.23672 6.21016 0 10.1992 0C12.953 0 15.2535 0.985496 17.0213 2.59107L14.1429 5.33718Z'
                      fill='currentColor'
                    />
                  </svg>
                </button>
                {googleError && (
                  <p className='text-red-600 mt-2'>Oops, It doesn't look like this account exists. Make sure you are using the right one.</p>
                )}
              </div>
            </div>
          </div>
          <div className='relative hidden flex-1 lg:flex max-w-4xl border-l-0 border-3'>
            <Image height='800' width='800' src='/banter.jpg' alt='Banter banner' className='absolute inset-0 h-full w-full object-cover' />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
