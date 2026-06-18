/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

// Lazy-loaded page components for optimization
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/leads',
    element: <Leads />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
