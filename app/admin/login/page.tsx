"use client";

import { signIn } from "next-auth/react";
import { GitBranch } from "lucide-react";

export default function AdminLoginPage() {
  const handleGitHubLogin = async () => {
    await signIn("github", {
      callbackUrl: "/admin",
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="card p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
            <GitBranch size={32} />
          </div>

          <h1 className="text-3xl font-bold mb-3">
            Admin Login
          </h1>

          <p className="text-muted-foreground mb-8">
            Sign in with your authorized GitHub account to manage your portfolio.
          </p>

          <button
            onClick={handleGitHubLogin}
            className="btn-primary w-full flex items-center justify-center gap-3"
          >
            <GitBranch size={32} />
            Continue with GitHub
          </button>

          <p className="text-sm text-muted-foreground mt-6">
            Only the authorized administrator can access the dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}