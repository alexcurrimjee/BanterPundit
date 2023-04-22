import Navbar from './navbar';
import Footer from './footer';
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
    <div className="flex flex-1 flex-col my-4 mx-8 gap-4">
      <div className='flex flex-1 border-3'>
        <Navbar />
        <main className='flex flex-grow py-10'>
          <div className='px-4 sm:px-6 lg:px-8 w-full'>{children}</div>
        </main>
      </div>
      <Footer />
      </div>
    </>
  );
}
