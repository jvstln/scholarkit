import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardLayoutPage = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  if (!session?.data?.user) {
    return redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutPage;
