import { useRouter } from 'next/router';
import { useState, Fragment, useEffect } from 'react';

import { auth } from '../lib/firebase';
import { useUserContext } from '../lib/UserContext';
import { useThemeContext } from '../lib/ThemeContext';

import { useSignOut } from 'react-firebase-hooks/auth';

import Link from 'next/link';
import Image from 'next/image';

import { Switch, Menu, Transition, Dialog } from '@headlessui/react';
import { CalendarIcon, ChartPieIcon, HomeIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon, PlusSmallIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Footer = () => {
  const router = useRouter(); // Get the current route
  const { userState, setUserState } = useUserContext();
  const { darkMode, setDarkMode } = useThemeContext();
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);

  function closeModal() {
    setIsSignOutOpen(false);
  }

  function openModal() {
    setIsSignOutOpen(true);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const solutions = [
    {
      name: 'Your Profile',
    },
    {
      name: 'Sign Out',
    },
  ];

  return (
    <>
      <div className='flex flex-row justify-between'>
        <Menu as='div' className='relative'>
          <Menu.Button className='relative group flex justify-between items-center px-6 py-3 mt-3 text-sm font-semibold leading-6 hover:bg-cta-secondary-background-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <div className='items-center flex gap-x-4'>
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary'>
                <span className='font-medium leading-none text-secondary uppercase'>{userState?.firstName.charAt(0)}</span>
              </span>
              <span className='sr-only'>Your profile</span>
              <span aria-hidden='true'>{userState?.firstName}</span>
            </div>
            <ChevronRightIcon
              className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden='true'
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items className='overflow-hidden absolute bottom-4 left-full ml-4 z-10 w-full transform mt-2 origin-bottom-left divide-y divide-gray-300 shadow-lg border-3 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-cta-secondary-background-default' : 'text-cta-secondary-text'} group flex w-full items-center p-3`}>
                      <UserCircleIcon className='mr-2 h-5 w-5 text-icon group-hover: group-hover:' />
                      Your Profile
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className='px-1 py-1 bg-white'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openModal}
                      className={`${active ? 'bg-cta-secondary-background-default  ' : 'text-cta-secondary-text'} group flex w-full items-center p-3`}>
                      <ArrowRightOnRectangleIcon className='mr-2 h-5 w-5 text-icon' />
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Switch.Group as='div' className='flex items-center'>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            className={classNames(
              darkMode ? 'border-white' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
            )}>
            <span className='sr-only'>Use setting</span>
            <span
              className={classNames(
                darkMode ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}>
              <span
                className={classNames(
                  darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                )}
                aria-hidden='true'>
                <SunIcon className='h-3 w-3 ' aria-hidden='true' />
              </span>
              <span
                className={classNames(
                  darkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                )}
                aria-hidden='true'>
                <MoonIcon className='h-3 w-3 text-secondary' aria-hidden='true' />
              </span>
            </span>
          </Switch>
          <Switch.Label as='span' className='ml-3 text-sm '>
            Theme
          </Switch.Label>
        </Switch.Group>
      </div>
      <Transition appear show={isSignOutOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Are you sure you want to Sign out?
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>Make sure you save any changes before you sign out.</p>
                  </div>

                  <div className='mt-6 flex flex-row gap-4'>
                    <button type='button' className='btn-md btn-secondary' onClick={closeModal}>
                      Cancel
                    </button>
                    <button type='button' className='btn-md btn-destroy' onClick={signOut}>
                      Yes, Please Sign me out
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Footer;
