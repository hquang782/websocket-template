import { NotFoundPage } from '../components/NotFoundPage';
import { HomePage } from '../components/HomePage';


const notFound = {
  path: '/*',
  element: <NotFoundPage />,
};

const Mainroutes = () => [
  {
    path: '/',
    element: <HomePage />,
  },
  notFound,
];

export default Mainroutes;
