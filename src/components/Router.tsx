import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import TournamentsPage from '@/components/pages/TournamentsPage';
import TournamentDetailsPage from '@/components/pages/TournamentDetailsPage';
import LeaderboardsPage from '@/components/pages/LeaderboardsPage';
import NewsPage from '@/components/pages/NewsPage';
import NewsArticlePage from '@/components/pages/NewsArticlePage';
import CommunityPage from '@/components/pages/CommunityPage';
import CommunityMemberPage from '@/components/pages/CommunityMemberPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "tournaments",
        element: <TournamentsPage />,
        routeMetadata: {
          pageIdentifier: 'tournaments',
        },
      },
      {
        path: "tournaments/:id",
        element: <TournamentDetailsPage />,
        routeMetadata: {
          pageIdentifier: 'tournament-details',
        },
      },
      {
        path: "leaderboards",
        element: <LeaderboardsPage />,
        routeMetadata: {
          pageIdentifier: 'leaderboards',
        },
      },
      {
        path: "news",
        element: <NewsPage />,
        routeMetadata: {
          pageIdentifier: 'news',
        },
      },
      {
        path: "news/:id",
        element: <NewsArticlePage />,
        routeMetadata: {
          pageIdentifier: 'news-article',
        },
      },
      {
        path: "community",
        element: <CommunityPage />,
        routeMetadata: {
          pageIdentifier: 'community',
        },
      },
      {
        path: "community/members/:id",
        element: <CommunityMemberPage />,
        routeMetadata: {
          pageIdentifier: 'community-member',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
