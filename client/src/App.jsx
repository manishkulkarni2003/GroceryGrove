// App.jsx
import { createBrowserRouter, RouterProvider, Outlet, BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Body from './components/Body';
import SellerLogin from "./components/SellerLogin";
import Dashboard from "./components/Dashboard";
import { Provider } from 'react-redux';
import store from "./utils/app.store"
import ProtectedRoute from "./components/ProtectedRoute";
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
        path: '/body', 
         // Route for Body component at /body path
        element: (
          <ProtectedRoute>
        <Body />
         </ProtectedRoute>
        
      )
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
  return(
  <Provider store={store}>
   <RouterProvider router={appRouter} />
   </Provider>

  );
}

export { App, Root };
