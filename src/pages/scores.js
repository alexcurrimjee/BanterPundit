import withAuth from '../lib/withAuth';
import Layout from '../components/layout';
import { useUserContext } from '../lib/UserContext';

const Scores = () => {
  const { userState, setUserState } = useUserContext();
  return (
    <Layout>
      <h1 class="font-medium text-2xl">Your Score:</h1>
      <p>{userState?.score}</p>
    </Layout>
  );
};

export default withAuth(Scores);
