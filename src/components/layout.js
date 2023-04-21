import Navbar from './navbar';
import { useUserContext } from '../lib/UserContext';

const LoadingScreen = () => (
  <div className='w-full h-full flex items-center justify-center'>
    <div className='text-gray-400'>Loading...</div>
  </div>
);

export default function Layout({ children }) {
  const { userState, loading } = useUserContext();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className='flex h-full'>
        <Navbar />
        <main className='flex flex-grow py-10 bg-background-l1 dark:bg-background-l1'>
          <div className='px-4 sm:px-6 lg:px-8 w-full'>{children}</div>
        </main>
      </div>
    </>
  );
}
