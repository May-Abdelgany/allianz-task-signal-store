import { Box } from "./box";
import { Salto } from "./salto";
import { SaltoGroup } from "./saltogroup";

export interface StorageState {
  boxes: Box[];
  selectedBox: Box | null;
  saltos: SaltoGroup[] | null;
  saltoOptionSelected: { salto: Salto; type: string } | null;
  totalSaltos: number;
}
