import { ReactElement, ReactNode } from "react";
import DbdRole from "@/lib/dbdRole";
import RoleSettingsLayout from "@/app/settings/_components/RoleSettingsLayout";

export default function KillerSettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <RoleSettingsLayout role={DbdRole.killer}>{children}</RoleSettingsLayout>
  );
}
