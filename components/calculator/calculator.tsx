"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateElectricFloor } from "@/lib/calculations/electric";
import type { SystemType, RoomType, HeatingMode } from "@/lib/calculations/types";

export function Calculator() {
  const [system, setSystem] = useState<SystemType>("electric");
  const [lengthM, setLengthM] = useState(3);
  const [widthM, setWidthM] = useState(2);
  const [exLength, setExLength] = useState(1.7);
  const [exWidth, setExWidth] = useState(0.7);
  const [roomType, setRoomType] = useState<RoomType>("bathroom");
  const [heatingMode, setHeatingMode] = useState<HeatingMode>("comfort");

  const result = useMemo(() => {
    if (system !== "electric") return null;
    return calculateElectricFloor(
      { lengthM, widthM },
      [{ lengthM: exLength, widthM: exWidth }],
      { heatingMode, roomType, floorCovering: "tile", cablePowerWM: 17 }
    );
  }, [system, lengthM, widthM, exLength, exWidth, roomType, heatingMode]);

  return (
    <section id="calculator" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Tabs value={system} onValueChange={(v) => setSystem(v as SystemType)}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="electric">Электрический</TabsTrigger>
            <TabsTrigger value="water">Водяной</TabsTrigger>
          </TabsList>

          <TabsContent value="electric">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
              {/* LEFT: Input form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Параметры помещения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Длина, м</Label>
                      <Input
                        id="length"
                        type="number"
                        min={0.5}
                        step={0.1}
                        value={lengthM}
                        onChange={(e) => setLengthM(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Ширина, м</Label>
                      <Input
                        id="width"
                        type="number"
                        min={0.5}
                        step={0.1}
                        value={widthM}
                        onChange={(e) => setWidthM(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Тип помещения</Label>
                    <Select value={roomType} onValueChange={(v) => setRoomType(v as RoomType)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bathroom">Ванная</SelectItem>
                        <SelectItem value="kitchen">Кухня</SelectItem>
                        <SelectItem value="balcony">Балкон</SelectItem>
                        <SelectItem value="corridor">Коридор</SelectItem>
                        <SelectItem value="default">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Режим обогрева</Label>
                    <Select value={heatingMode} onValueChange={(v) => setHeatingMode(v as HeatingMode)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comfort">Комфортный</SelectItem>
                        <SelectItem value="main">Основной</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-zinc-400 mb-3">Зона без обогрева</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ex-length">Длина, м</Label>
                        <Input
                          id="ex-length"
                          type="number"
                          min={0}
                          step={0.1}
                          value={exLength}
                          onChange={(e) => setExLength(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ex-width">Ширина, м</Label>
                        <Input
                          id="ex-width"
                          type="number"
                          min={0}
                          step={0.1}
                          value={exWidth}
                          onChange={(e) => setExWidth(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* RIGHT: Results */}
              <div className="space-y-4">
                {result && (
                  <>
                    {/* Main metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">Площадь обогрева</p>
                          <p className="text-2xl font-bold text-emerald-400 mt-1">{result.activeAreaM2} м²</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">Мощность</p>
                          <p className="text-2xl font-bold mt-1">{(result.totalPowerW / 1000).toFixed(1)} кВт</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">Длина кабеля</p>
                          <p className="text-2xl font-bold mt-1">{result.cableLengthM} м</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4 pb-3">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">Шаг укладки</p>
                          <p className="text-2xl font-bold mt-1">{result.layingStepCm} см</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Details */}
                    <Card>
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Площадь комнаты</span>
                          <span>{result.roomAreaM2} м²</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Исключено</span>
                          <span>{result.excludedAreaM2} м²</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Мощность на м²</span>
                          <span>{result.targetPowerWM2} Вт/м²</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Мощность кабеля</span>
                          <span>{result.cablePowerWM} Вт/м</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Warnings */}
                    {result.warnings.length > 0 && (
                      <Card className="border-amber-500/30">
                        <CardContent className="pt-4">
                          {result.warnings.map((w) => (
                            <div key={w.id} className="flex items-start gap-2 text-sm">
                              <Badge variant="outline" className="text-amber-400 border-amber-500/30 shrink-0 mt-0.5">!</Badge>
                              <span className="text-zinc-300">{w.copy}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="water">
            <Card>
              <CardContent className="pt-6 text-center text-zinc-500">
                <p className="text-lg">Водяной пол — в разработке</p>
                <p className="text-sm mt-2">Расчёт контуров, трубы и коллектора появится в следующей версии.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
