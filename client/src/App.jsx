// App.jsx
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Body from './components/Body';
import SellerLogin from "./components/SellerLogin";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* Outlet renders child routes here */}
    </>
  );
}

// Define the routes
const appRouter = createBrowserRouter([
  {
    path: '/',         // Base path for App
    element: <App />,
    children: [
      {
        path: '/',      // Route for Login component at root path
        element: <Login />
      },
      {
        path: '/body',  // Route for Body component at /body path
        element: <Body />
      },
      {
        path:"/seller",
        element:<SellerLogin/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      }
    ]
  }
]);

// Wrap RouterProvider with appRouter
function Root() {
  return <RouterProvider router={appRouter} />;
}

export { App, Root };
