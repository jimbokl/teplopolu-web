import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-block w-6 h-6 rounded bg-[#FF6A1A]" />
          ТеплоПолу.ру
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#calculator" className="hover:text-zinc-100 transition-colors">Калькулятор</a>
          <a href="#segments" className="hover:text-zinc-100 transition-colors">Направления</a>
          <a href="#cities" className="hover:text-zinc-100 transition-colors">Города</a>
        </nav>

        <Button className="bg-[#FF6A1A] hover:bg-[#FF6A1A]/90 text-white text-sm h-9 px-4">
          Заявка
        </Button>
      </div>
    </header>
  );
}
