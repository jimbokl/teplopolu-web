export interface RoomInput {
  lengthM: number;
  widthM: number;
}

export interface ExclusionInput {
  lengthM: number;
  widthM: number;
}

export type HeatingMode = "comfort" | "main";
export type RoomType = "bathroom" | "balcony" | "kitchen" | "corridor" | "default";
export type FloorCovering = "tile" | "porcelain" | "laminate" | "wood" | "linoleum";
export type SystemType = "electric" | "water";

export interface ElectricFloorSettings {
  heatingMode: HeatingMode;
  roomType: RoomType;
  floorCovering: FloorCovering;
  cablePowerWM: number;
  targetPowerWM2?: number;
}

export interface ElectricFloorResult {
  roomAreaM2: number;
  excludedAreaM2: number;
  activeAreaM2: number;
  targetPowerWM2: number;
  totalPowerW: number;
  cablePowerWM: number;
  cableLengthM: number;
  layingStepCm: number;
  warnings: { id: string; copy: string }[];
}

export interface CalculatorState {
  system: SystemType;
  room: RoomInput;
  exclusions: ExclusionInput[];
  settings: ElectricFloorSettings;
  result: ElectricFloorResult | null;
}
