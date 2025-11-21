import { Hero } from "@/components/features";

export default function Home() {
  return (
    <div className="flex items-center justify-start bg-transparent">
      <main className="flex flex-col items-center justify-start gap-8 p-8 w-full mx-auto">
        <Hero showForm={true} />
      </main>
    </div>
  );
}
