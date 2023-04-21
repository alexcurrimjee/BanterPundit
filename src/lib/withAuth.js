import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return (
			<div className='w-full h-full flex items-center justify-center'>
				<div className="text-gray-400">Loading...</div>
			</div>
			);
    }

    if (!user) {
      router.push('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;