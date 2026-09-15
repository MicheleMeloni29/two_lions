export const metadata = {
  title: "Area Riservata | Two Lions International",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-white text-[color:var(--color-primary)] antialiased selection:bg-[color:var(--color-thirdary)] selection:text-white">
      {/* Sfondo essenziale bianco caldo con finitura dorata discreta */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(181,154,90,0.07),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(37,30,87,0.03),transparent_60%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
