import { Hero } from "@/components/features";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <main className="flex flex-col items-center justify-center gap-8 p-8 max-w-4xl mx-auto">
        <Hero showForm={true} />
      </main>
    </div>
  );
}
