import React from "react";
// Custom hooks
import { useAuth } from "@/modules/auth/hooks";
// Components
import { Loading, Layout } from "@/modules/shared/components";
import { AuthLayout, Register } from "@/modules/auth/components";

const RegisterPage = () => {
  //--> Hooks

  const { status } = useAuth();

  //--> Renders

  if (status === "checking" || status === "authenticated")
    return <Loading message="My Journal" />;

  return (
    <Layout title="Register" name="register" content="register">
      <AuthLayout title="My Journal">
        <Register />
      </AuthLayout>
    </Layout>
  );
};

export default RegisterPage;
