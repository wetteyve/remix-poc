import { useRoutes } from 'react-router-dom';
import { routesConfig } from '../utils/routesConfig';

const app = () => {
  return useRoutes(routesConfig)
};

export default app;
