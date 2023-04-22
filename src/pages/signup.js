import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/useAuth';
import { auth, functions, GoogleProvider } from '../lib/firebase'; // Import the functions instance
import { signInWithPopup } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

import Image from 'next/image';

const SignUpPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createUser = httpsCallable(functions, 'createUser');
      await createUser({ email, password, firstName, lastName });
      console.log(user);
      setSignUp(true);
      setLoading(false);
    } catch (error) {
      setAuthError(true);
      console.error('Error during sign-up:', error);
    }
  };

  const handleSignUpWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const user = result.user;

      // Call the createUser Cloud Function with Google user details
      const createUser = httpsCallable(functions, 'createUser');
      await createUser({
        email: user.email,
        password: null, // No password needed for Google sign-in
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
      });
      setSignUp(true);
      setLoading(false);
    } catch (error) {
      console.error('Error during sign-up with Google:', error);
    }
  };

  return (
    <>
      <div className='flex min-h-full '>
        <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-lg  shadow-sm p-10 border rounded-xl'>
            {!signUp ? (
              <>
                <div>
                  <Image className='h-12 w-auto' width='48' height='48' src='/BP.png' alt='Your Company' />
                  <h2 className='mt-6 text-2xl font-bold tracking-tight text-title'>You're one of the lucky ones!</h2>
                  <p className='mt-2 text-lg text-body'>Welcome to the game, register with an email & username to get started</p>
                </div>
                <div className='mt-8 gap-y-8 flex flex-col'>
                  <div className=''>
                    <form action='#' method='POST' onSubmit={handleSignUp} className='space-y-4'>
                      <div className='space-x-4 flex items-center'>
                        <div className='flex flex-col flex-1'>
                          <label htmlFor='firstName' className='block text-sm font-medium leading-6 text-title'>
                            First name
                          </label>
                          <div className='mt-2'>
                            <input
                              id='firstName'
                              name='firstName'
                              type='text'
                              autoComplete='firstName'
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                          <label htmlFor='lastName' className='block text-sm font-medium leading-6 text-title'>
                            Last Name
                          </label>
                          <div className='mt-2'>
                            <input
                              id='lastName'
                              name='lastName'
                              type='text'
                              autoComplete='lastName'
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <div>
                          <label htmlFor='email' className='block text-sm font-medium leading-6 text-title'>
                            Email
                          </label>
                          <div className='mt-2'>
                            <input
                              id='email'
                              name='email'
                              type='text'
                              autoComplete='email'
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor='password' className='block text-sm font-medium leading-6 text-title'>
                            Password
                          </label>
                          <div className='mt-2'>
                            <input
                              id='password'
                              name='password'
                              type='password'
                              autoComplete='current-password'
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className='block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        {authError && <p className='text-red-600 mb-2'>Oops, we could not log you in with these credentials. Please try again</p>}
                        <button type='submit' className='w-full mt-4 btn-lg btn-primary'>
                          {loading ? <span className='loader'></span> : <span>Register</span>}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                      <div className='w-full border-t border-gray-300' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                      <span className=' px-2 '>Or sign in with</span>
                    </div>
                  </div>

                  <div className='w-full text-center'>
                    <button onClick={handleSignUpWithGoogle} className='btn-lg btn-secondary w-1/3'>
                      <span className='sr-only'>Sign up with Google</span>
                      <svg className='h-5 w-5 ' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M14.1429 5.33718C13.4062 4.66168 12.1144 3.85336 10.1992 3.85336C7.50211 3.85336 5.21297 5.59183 4.38562 7.99466C4.18164 8.61473 4.05703 9.27909 4.05703 9.96565C4.05703 10.6521 4.18164 11.3166 4.39695 11.9366C5.21297 14.3395 7.50211 16.0779 10.1992 16.0779C11.7177 16.0779 12.8737 15.6682 13.7349 15.0813C15.0948 14.1512 15.7068 12.7671 15.8201 11.848H10.1992V8.14969H19.7752C19.9224 8.76977 19.9905 9.36771 19.9905 10.1871C19.9905 13.2211 18.8798 15.7789 16.9534 17.5174C15.2648 19.0454 12.953 19.9313 10.1992 19.9313C6.21016 19.9313 2.76508 17.6945 1.08789 14.4391C0.396641 13.0882 0 11.5712 0 9.96565C0 8.36008 0.396641 6.84305 1.08789 5.49214C2.76508 2.23672 6.21016 0 10.1992 0C12.953 0 15.2535 0.985496 17.0213 2.59107L14.1429 5.33718Z'
                          fill='currentColor'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Image className='h-12 w-auto' width='48' height='48' src='/BP.png' alt='Your Company' />
                <h2 className='mt-6 text-2xl font-bold tracking-tight text-title'>🎉 Success!</h2>
                <p className='mt-2 text-lg text-body'>Your account was created, you're ready to play the game!</p>
                <button onClick={() => router.push('/')} className='w-full mt-6 btn-lg btn-primary'>
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block m-6 max-w-4xl'>
          <Image
            height='800'
            width='800'
            src='/banter.jpg'
            alt='Banter banner'
            className='rounded-tl-3xl rounded-br-3xl absolute inset-0 h-full w-full object-cover'
          />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
