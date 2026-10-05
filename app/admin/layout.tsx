import AdminThemeShell from "./AdminThemeShell";

export const metadata = {
  title: "Area Riservata | Two Lions International",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminThemeShell>{children}</AdminThemeShell>;
}

