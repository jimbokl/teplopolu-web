import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Площадь", value: "4.8", unit: "м²" },
  { label: "Мощность", value: "0.8", unit: "кВт" },
  { label: "Кабель", value: "48", unit: "м" },
  { label: "Шаг", value: "10", unit: "см" },
];

export function Hero() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Badge variant="outline" className="text-[#FF6A1A] border-[#FF6A1A]/30 mb-4">
          Инженерный расчёт
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Расчёт теплого пола</h1>
        <p className="text-zinc-400 mt-2 text-lg">
          Площадь, мощность, шаг укладки и материалы — за секунды.
        </p>

        <div className="flex gap-3 mt-6">
          <a href="#calculator">
            <Button className="bg-[#FF6A1A] hover:bg-[#FF6A1A]/90 text-white">
              Начать расчёт
            </Button>
          </a>
          <Button variant="ghost" className="text-zinc-400 hover:text-zinc-100">
            Пример
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-zinc-500 uppercase tracking-wider">{m.label}</p>
                <p className="text-3xl font-bold mt-1">
                  {m.value} <span className="text-base font-normal text-zinc-400">{m.unit}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
