import Board from "@/pages/Board";

interface Route {
  path: string;
  element: React.ReactNode;
  roles: "owner"[];
}
const routes: Route[] = [
  {
    path: "/board",
    element: <Board />,
    roles: ["owner"],
  },
  {
    path: "/organization/create-update",
    element: <div>OrganizationCreateUpdate</div>,
    roles: ["owner"],
  },
  {
    path: "/organization/create-update/:id",
    element: <div>OrganizationCreateUpdate</div>,
    roles: ["owner"],
  },
  {
    path: "/organization_user",
    element: <div>OrganizationUser</div>,
    roles: ["owner"],
  },
  {
    path: "/organization_user/create-update",
    element: <div>OrganizationUserCreateUpdate</div>,
    roles: ["owner"],
  },
  {
    path: "/organization_user/create-update/:id",
    element: <div>OrganizationUserCreateUpdate</div>,
    roles: ["owner"],
  },
  {
    path: "/categories",
    element: <div>Categories</div>,
    roles: ["owner"],
  },
  {
    path: "/categories/create-update",
    element: <div>CategoriesCreateUpdate</div>,
    roles: ["owner"],
  },
  {
    path: "/categories/create-update/:id",
    element: <div>CategoriesCreateUpdate</div>,
    roles: ["owner"],
  },
  {
    path: "/city",
    element: <div>City</div>,
    roles: ["owner"],
  },
  {
    path: "/city/create-update",
    element: <div>CityCreateUpdate</div>,
    roles: ["owner"],
  },
];

export default routes;
