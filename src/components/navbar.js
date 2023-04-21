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

const Navbar = () => {
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

  const navigation = [
    { name: 'Question of the day', href: '/quiz', icon: CalendarIcon, current: router.pathname === '/quiz' },
    { name: 'Scores', href: '/scores', icon: ChartPieIcon, current: router.pathname === '/scores' },
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
  ];

  const solutions = [
    {
      name: 'Your Profile',
    },
    {
      name: 'Sign Out',
    },
  ];

  const leagues = [
    { id: 1, name: 'Red Devils', href: '#', initial: 'R', current: false },
    { id: 2, name: 'AC Winners', href: '#', initial: 'A', current: false },
    { id: 3, name: 'Real To The Moon', href: '#', initial: 'R', current: false },
  ];

  return (
    <>
      <div className='hidden relative lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-background-l3 dark:bg-background-l2 border-r border-default px-6'>
          <div className='flex h-16 shrink-0 items-center'>
            <Image className='h-12 w-auto' width='48' height='48' src='/BP.png' alt='Your Company' />
          </div>
          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul role='list' className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-cta-secondary-background-hover font-semibold'
                            : 'hover:bg-cta-secondary-background-hover',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        <item.icon
                          className={classNames(
                            item.current
                              ? ' '
                              : 'text-icon group-hover: dark:group-hover:text-primary-400',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className='flex flex-row justify-between'>
                  <div className='text-xs font-semibold leading-6 text-body'>Your leagues</div>
                  <button type='button' className='btn-icon-sm btn-secondary'>
                    <PlusSmallIcon className='h-4 w-4' aria-hidden='true' />
                  </button>
                </div>
                <ul role='list' className='-mx-2 mt-2 space-y-1'>
                  {leagues.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? 'bg-cta-secondary-background-hover '
                            : ' hover: hover:bg-cta-secondary-background-hover',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}>
                        <span
                          className={classNames(
                            team.current
                              ? ' border-active'
                              : 'border-default group-hover:border-active group-hover:text-active',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-cta-secondary-background-default'
                          )}>
                          {team.initial}
                        </span>
                        <span className='truncate'>{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='-mx-6 mt-auto'>
                <div className='px-6'>
                  <Switch.Group as='div' className='flex items-center'>
                    <Switch
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      className={classNames(
                        darkMode ? 'bg-primary-500' : 'bg-gray-200',
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
                          <MoonIcon className='h-3 w-3 text-primary-500' aria-hidden='true' />
                        </span>
                      </span>
                    </Switch>
                    <Switch.Label as='span' className='ml-3 text-sm '>
                      Theme
                    </Switch.Label>
                  </Switch.Group>
                </div>

                <div className=' w-full'>
                  <Menu as='div' className='text-left w-full'>
                    <Menu.Button className='group w-full flex justify-between items-center px-6 py-3 mt-3 text-sm font-semibold leading-6 hover:bg-cta-secondary-background-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                      <div className='items-center flex gap-x-4'>
                        <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500'>
                          <span className='font-medium leading-none text-white uppercase'>{userState?.firstName.charAt(0)}</span>
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
                      <Menu.Items className='overflow-hidden absolute bottom-4 left-full ml-4 z-10 w-full transform mt-2 origin-bottom-left divide-y divide-border-default rounded-lg bg-l3 shadow-lg border focus:outline-none'>
                        <div className='px-1 py-1 '>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-cta-secondary-background-hover  ' : 'text-cta-secondary-text'
                                } group flex w-full items-center rounded-md p-3`}>
                                <UserCircleIcon className='mr-2 h-5 w-5 text-icon group-hover: group-hover:' />
                                Your Profile
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='px-1 py-1 bg-l2'>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={openModal}
                                className={`${
                                  active ? 'bg-cta-secondary-background-hover  ' : 'text-cta-secondary-text'
                                } group flex w-full items-center rounded-md p-3`}>
                                <ArrowRightOnRectangleIcon className='mr-2 h-5 w-5 text-icon group-hover: group-hover:' />
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            </ul>
          </nav>
        </div>
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
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

export default Navbar;
