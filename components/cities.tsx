import { Badge } from "@/components/ui/badge";

const cities = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Краснодар"];

export function Cities() {
  return (
    <section id="cities" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Города</h2>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Badge key={city} variant="secondary" className="text-sm py-1.5 px-3 cursor-pointer hover:bg-zinc-700 transition-colors">
              {city}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
