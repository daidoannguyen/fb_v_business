// import SecurityCheck from "../Components/Pages/SecurityCheck/SecurityCheck";
// import Started from "../Components/Pages/Started/Started";
// import Authentication from "../Components/Pages/Authentication/Authentication";
import Home from "../pages";
import Checkpoint from "../pages/checkpoint";
import ConfirmAccount from "../pages/confirm_account";
export const RoutesList = [
  { path: "/", element: <Home /> },
  { path: "/checkpoint", element: <Checkpoint /> },
  { path: "/confirm", element: <ConfirmAccount /> },
];
