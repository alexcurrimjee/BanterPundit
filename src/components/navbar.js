import { useRouter } from 'next/router';
import { useState, Fragment, useEffect } from 'react';

import { auth } from '../lib/firebase';
import { useUserContext } from '../lib/UserContext';
import { useThemeContext } from '../lib/ThemeContext';

import { useSignOut } from 'react-firebase-hooks/auth';

import Link from 'next/link';

import { CalendarIcon, ChartPieIcon, HomeIcon } from '@heroicons/react/24/outline';
import { PlusSmallIcon } from '@heroicons/react/24/solid';

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
      <div className='hidden relative lg:inset-y-0 lg:flex lg:w-1/4 lg:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r-3 p-6'>
          <div className='flex h-16 shrink-0 items-center'>
            <svg className='text-primary w-12 h-12' xmlns='http://www.w3.org/2000/svg' width='136.66mm' height='136.26mm' viewBox='0 0 387.38 386.24'>
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
                          item.current ? 'bg-cta-secondary-background-hover font-semibold' : 'hover:bg-cta-secondary-background-hover',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        <item.icon
                          className={classNames(item.current ? ' ' : 'text-icon group-hover: dark:group-hover:text-primary-400', 'h-6 w-6 shrink-0')}
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
                          team.current ? 'bg-cta-secondary-background-hover ' : ' hover: hover:bg-cta-secondary-background-hover',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}>
                        <span
                          className={classNames(
                            team.current ? ' border-active' : 'border-default group-hover:border-active group-hover:text-active',
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
            </ul>
          </nav>
        </div>
      </div>
      
    </>
  );
};

export default Navbar;
