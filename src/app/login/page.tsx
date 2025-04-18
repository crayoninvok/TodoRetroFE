// /app/login/page.tsx
import dynamic from "next/dynamic";

// Import LoginClient secara dinamis dan non-SSR
const LoginClient = dynamic(() => import("./LoginClient"), { ssr: false });

export default function LoginPage() {
  return <LoginClient />;
}
