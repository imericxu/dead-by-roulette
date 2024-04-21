import { ReactElement, ReactNode } from "react";
import DbdRole from "@/lib/dbdRole";
import RoleSettingsLayout from "@/app/settings/_components/RoleSettingsLayout";

export default function SurvivorSettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <RoleSettingsLayout role={DbdRole.survivor}>{children}</RoleSettingsLayout>
  );
}
