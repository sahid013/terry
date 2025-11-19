import { Hero } from "@/components/features";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <main className="flex flex-col items-center justify-center gap-8 p-8 max-w-4xl mx-auto">
        <Hero showForm={true} />
      </main>
    </div>
  );
}
