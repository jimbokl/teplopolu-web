import { RoomInput, ExclusionInput, ElectricFloorSettings, ElectricFloorResult } from "./types";

const TARGET_POWER_TABLE: Record<string, Record<string, number>> = {
  comfort: {
    bathroom: 170, balcony: 180, kitchen: 150, corridor: 150, default: 150,
  },
  main: {
    bathroom: 200, balcony: 200, kitchen: 180, corridor: 180, default: 180,
  },
};

export function calculateElectricFloor(
  room: RoomInput,
  exclusions: ExclusionInput[],
  settings: ElectricFloorSettings
): ElectricFloorResult {
  const roomAreaM2 = round(room.lengthM * room.widthM, 2);
  const excludedAreaM2 = round(
    exclusions.reduce((sum, ex) => sum + ex.lengthM * ex.widthM, 0), 2
  );
  const activeAreaM2 = round(Math.max(0, roomAreaM2 - excludedAreaM2), 2);

  const targetPowerWM2 = settings.targetPowerWM2 ??
    TARGET_POWER_TABLE[settings.heatingMode]?.[settings.roomType] ?? 150;

  const totalPowerW = round(activeAreaM2 * targetPowerWM2, 1);
  const cablePowerWM = settings.cablePowerWM || 17;
  const cableLengthM = round(totalPowerW / cablePowerWM, 1);
  const layingStepCm = activeAreaM2 > 0
    ? round((activeAreaM2 / cableLengthM) * 100, 1)
    : 0;

  const warnings: { id: string; copy: string }[] = [];
  if (room.lengthM <= 0 || room.widthM <= 0) {
    warnings.push({ id: "room_dimensions_missing", copy: "Укажите длину и ширину комнаты." });
  }
  if (activeAreaM2 <= 0) {
    warnings.push({ id: "active_area_empty", copy: "Площадь обогрева равна нулю." });
  }
  if (layingStepCm > 0 && layingStepCm < 6) {
    warnings.push({ id: "laying_step_too_small", copy: "Шаг укладки менее 6 см — возможен перегрев." });
  }
  if (layingStepCm > 12) {
    warnings.push({ id: "laying_step_too_large", copy: "Шаг укладки более 12 см — пол может нагреваться неравномерно." });
  }

  return {
    roomAreaM2, excludedAreaM2, activeAreaM2, targetPowerWM2,
    totalPowerW, cablePowerWM, cableLengthM, layingStepCm, warnings,
  };
}

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
