import React, { useEffect } from "react";
// Custom hooks
import { useAuth } from "@/modules/auth/hooks";
// Components
import { Loading, Layout } from "@/modules/shared/components";
import { AuthLayout, Login } from "@/modules/auth/components";
import { Fade } from "@mui/material";

const LoginPage = () => {
  //--> Hooks

  const { status } = useAuth();

  //--> Renders

  if (status === "checking" || status === "authenticated")
    return <Loading message="My Journal" />;

  return (
    <Layout title="Login" name="login" content="login">
      <AuthLayout title="My Journal">
        <Login />
      </AuthLayout>
    </Layout>
  );
};

export default LoginPage;
