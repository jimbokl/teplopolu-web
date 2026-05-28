import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const segments = [
  { title: "Электрический пол", desc: "Кабель, мат, терморегулятор", badge: "Квартира", color: "text-orange-400" },
  { title: "Водяной пол", desc: "Труба, коллектор, стяжка", badge: "Частный дом", color: "text-sky-400" },
  { title: "Стяжка", desc: "Раствор, утеплитель, лента", badge: "Подготовка", color: "text-emerald-400" },
];

export function Segments() {
  return (
    <section id="segments" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Направления</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {segments.map((s) => (
            <Card key={s.title} className="hover:border-zinc-600 transition-colors">
              <CardContent className="pt-5">
                <Badge variant="outline" className={s.color}>{s.badge}</Badge>
                <h3 className="text-lg font-semibold mt-3">{s.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
