import { useLayoutEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import useUserStore from "../../store/useUserData";

import Login from "@/pages/Auth/Login";
import { createBrowserRouter } from "react-router-dom";
import Check from "../../pages/Check";
import PrivateRoute from "./PrivateRoute";
import routes from "./configureRoute";

const approutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Check />,
  },
  {
    path: "/submit/:formURL",
    element: <h1>Somethings went wrong ! 🫤</h1>,
  },
  {
    path: "*",
    element: <div>NOT approutes</div>,
  },
  {
    children: routes?.map((rout) => {
      return {
        path: rout.path,
        element: (
          <PrivateRoute>
            <div>
              <h1>PrivateRoute</h1>
              {rout.element}
            </div>
          </PrivateRoute>
        ),
      };
    }),
  },
]);

const unauthenticatedRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Check />,
  },
  {
    path: "/submit/:formURL",
    element: <h1>Somethings went wrong ! 🫤</h1>,
  },
  {
    path: "*",
    element: <div>NOT Loprem</div>,
  },
]);

const Router = () => {
  const { userData, saveUserData } = useUserStore();
  const user = localStorage.getItem("user");
  useLayoutEffect(() => {
    if (user) {
      saveUserData(JSON.parse(user));
    }
  }, []);
  const route = useMemo(() => {
    return userData?.role ? approutes : unauthenticatedRoutes;
  }, [userData]);
  return <RouterProvider router={route} />;
};

export default Router;
