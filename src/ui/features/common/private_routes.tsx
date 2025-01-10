import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import PageRoutes from "../../../state/types/page_routes";
import Header from "../../layout/header/header";

export default function PrivateRoutes() {
  const authedUser = useAppSelector((state) => state.authedUser.entities);
  const currentPath = useLocation().pathname;
  let path: string | undefined;

  if (currentPath !== PageRoutes.Login) path = currentPath;

  return authedUser ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={PageRoutes.Login} state={{ prevRoute: path }} />
  );
}
