import { Outlet } from "@amazing-router/react";

const RegisterLayout = () => {
  return (
    <div>
      register layout - Este layout es propio de la carpeta register, no comparte con login
      <Outlet />
    </div>
  );
};

export default RegisterLayout;