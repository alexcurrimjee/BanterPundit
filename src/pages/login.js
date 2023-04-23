import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';

import { Transition, Dialog } from '@headlessui/react';

import { auth, GoogleProvider } from '../lib/firebase';
import { useAuth } from '../lib/useAuth';
import { useSignInWithEmailAndPassword, useDeleteUser } from 'react-firebase-hooks/auth';
import { signInWithPopup } from 'firebase/auth';
import { LockClosedIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleError, setGoogleError] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [deleteUser, loadingDelete, errorDelete] = useDeleteUser(auth);

  if (user) {
    router.push('/');
  }

  function closeModal() {
    setIsSignUpOpen(false);
  }

  function openModal() {
    setIsSignUpOpen(true);
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

  const handleSignPassword = (e) => {
    e.preventDefault();
    if (signupPassword === 'password') {
      router.push('/signup');
    } else {
      closeModal();
      setSignupError(true);
    }
  };

  return (
    <>
      <div className='flex flex-1 min-h-full bg-secondary'>
        <div className='m-4 lg:m-6 flex w-full'>
          <div className='flex flex-1 flex-col border-3 h-full'>
            <div className='w-full flex-1 flex p-6 lg:py-10 lg:px-14 border-b-3'>
              <div className='mx-auto flex flex-col flex-1 justify-center space-y-6 max-w-md'>
                <div>
                  <svg
                    className='text-primary w-12 h-12'
                    xmlns='http://www.w3.org/2000/svg'
                    width='136.66mm'
                    height='136.26mm'
                    viewBox='0 0 387.38 386.24'>
                    <path
                      fill='currentColor'
                      d='m102.03,138.08c-2.45,5.1-5.02,9.85-7.06,14.83-7.64,18.64-9.85,37.96-6.01,57.74,2.62,13.51,11.02,22.5,24.22,26.23,13.85,3.92,25.89.12,35.4-10.69,15.11-17.19,26.75-36.64,36.38-57.33,10.36-22.26,18.14-45.37,22.63-69.54.47-2.53.72-5.11,1.21-7.64.33-1.69-.39-2.15-1.92-2.37-12.65-1.83-25.21-1.5-37.7,1.25-23.69,5.22-43.21,17.23-58.64,35.92-1.31,1.59-2.5,3.27-3.87,5.07-6.07-4.57-11.09-9.84-15.34-15.84-27.92-39.38-11-95.06,34.57-110.9,28.37-9.86,54.81-4.61,77.09,16.22,10.45,9.77,15.31,22.77,17.76,36.66,3.24,18.4,1.69,36.67-2.04,54.78-6.17,29.98-17.02,58.22-32.84,84.45-8.94,14.82-18.4,29.31-30.28,42.06-12.13,13.02-25.84,23.84-41.71,32.09-10.01,5.21-20.2,9.4-31.49,10.47-21.87,2.09-41.28-3.97-57.56-18.71C5.6,245.42-2.45,223.4.64,197.71c3.66-30.39,26.4-55.46,56.26-62.76,14.43-3.52,28.71-2.78,42.75,2.09.83.29,1.62.7,2.39,1.03Z'
                    />
                    <path
                      fill='currentColor'
                      d='m242.81,101.93c-.52,3.48-1.09,6.73-1.49,9.99-3.18,25.97-.85,51.3,9.03,75.71,3.89,9.61,8.94,18.58,15.17,26.87,4.21,5.6,10.66,7.95,16.95,6.25,6.73-1.83,11.18-7.03,12.09-14.04,2.09-16.27.75-32.21-4.59-47.75-.58-1.69-.16-2.53,1.25-3.46,37.46-24.55,87.16-3.53,95.1,40.13,5.92,32.57-13.25,63.06-44.91,71.21-18.42,4.74-35.89,1.72-51.38-9.24-19.87-14.06-36.19-31.58-47.89-53.11-11.11-20.46-16.22-42.42-16.47-65.62-.25-22.85,3.64-45.04,10.5-66.76,6.42-20.33,27.38-37.55,53.99-34.31,20.65,2.51,40.94,18.95,43.75,44.6,3.28,29.86-20.14,55.78-50.12,55.77-2.47,0-4.01-.77-5.42-2.94-8.54-13.08-19.42-23.81-32.79-31.96-.5-.3-.99-.61-1.5-.89-.21-.12-.46-.17-1.26-.46Z'
                    />
                    <path
                      fill='currentColor'
                      d='m263.3,266.91c-43.07-22.07-95.75-11.44-124.55,15.68,6.05,2.68,11.74,5.59,17.7,7.75,16.75,6.07,34.01,7.59,51.61,4.69,1.7-.28,2.53.28,3.36,1.69,12.77,21.58,9.92,50.26-6.94,69.33-29.38,33.24-84.16,24-100.25-17.3-9.12-23.41-4.59-44.83,12.29-63.66,8.55-9.53,17.75-18.25,28.56-25.15,25.5-16.27,53.3-23.43,83.45-20.26,24.76,2.6,46.49,12.33,64.71,29.42,13.78,12.92,17.39,33.39,8.72,48.87-7.29,13.02-18.87,18.83-33.44,19.68-22.28,1.3-41.68-18.24-39.75-42.22.03-.33.07-.66.08-1,.06-3.67,1.61-5.77,5.27-7.3,10.37-4.32,19.52-10.7,27.78-18.32.37-.34.72-.7,1.03-1.08.14-.18.19-.44.34-.82Z'
                    />
                  </svg>
                  <h2 className='mt-4 text-2xl xl:text-4xl font-medium tracking-tight'>Welcome to Banter Pundits</h2>
                  <p className='mt-2 text-xl text-body'>Sign in to access your account and start bantering</p>
                </div>

                <form action='#' method='POST' onSubmit={handleSignIn} className='mt-4 flex flex-col space-y-4'>
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
                      <input id='remember-me' name='remember-me' type='checkbox' className='checkbox-base' />
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
                    <button type='submit' className='mt-2 w-full btn-lg btn-primary'>
                      {loading ? <span className='loader'></span> : <span>Sign in</span>}
                    </button>
                  </div>
                </form>

                <div className='mt-4 w-full text-center flex flex-col justify-center items-center gap-4'>
                  <span className=' px-2 '>Or sign in with</span>
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
            <button onClick={openModal} className='w-full relative group focus-ring'>
              <div className='absolute inset-0 plus-pattern w-full h-full bg-secondary group-hover:bg-primary opacity-50 transition-all duration-200'></div>
              <div className='py-4 max-w-md mx-auto w-full text-center flex flex-row justify-center items-center gap-2'>
                <LockClosedIcon className='h-4 w-4' aria-hidden='true' />
                <span>Have been invited? Sign up here</span>
                {signupError && <p className='text-red-600'>Wrong password</p>}
              </div>
            </button>
          </div>
          <div className='relative hidden flex-1 lg:flex max-w-4xl border-l-0 border-3'>
            <Image height='800' width='800' src='/banter.jpg' alt='Banter banner' className='absolute inset-0 h-full w-full object-cover' />
          </div>
        </div>
      </div>
      <Transition appear show={isSignUpOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black dark:bg-white bg-opacity-25 dark:bg-opacity-40' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto font-sans'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden border-3 bg-secondary p-8 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-2xl font-medium leading-6 text-primary font-sans'>Enter the password here</Dialog.Title>
                  <form action='#' method='POST' onSubmit={handleSignPassword} className='mt-4 flex flex-col space-y-4'>
                    <div>
                      <label htmlFor='signup' className='block text-sm font-medium leading-6 text-title'>
                        Password
                      </label>
                      <div className='mt-1'>
                        <input
                          id='signup'
                          name='signup'
                          type='text'
                          autoComplete='signup'
                          required
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className='input-base'
                        />
                      </div>
                    </div>
                    <div>
                      <button type='submit' className='mt-2 w-full btn-lg btn-primary'>
                        {loading ? <span className='loader'></span> : <span>Get started</span>}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginPage;
