import { Box } from '../../models/box';
import { SaltoGroup } from './../../models/saltogroup';
import { computed } from '@angular/core';

interface Store {
  selectedBox: () => Box | null;
  saltos: () => SaltoGroup[] | null;
}
export const storageComputed = (store: Store) => ({
  // Compute the selected salto option for the currently selected box
  selectedSaltoOption: computed(() => {
    const box = store.selectedBox();
    const groups: SaltoGroup[] | null = store.saltos();
    if (!box || !box.saltoId || !box.saltoType) return null;

    const group = groups?.find((g) => g.type === box.saltoType);
    return group?.items?.find((item) => item.id === box.saltoId) ?? null;
  }),

  // Automatically track the selected salto type
  selectedSaltoType: computed(() => store.selectedBox()?.saltoType ?? null),
});
