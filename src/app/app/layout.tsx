import { AppControls } from "@/hooks/use-app-controls";

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppControls>
      {children}
    </AppControls>
  );
}
