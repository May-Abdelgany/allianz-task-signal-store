import { inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { Box } from '../../models/box';
import { SaltoGroup } from '../../models/saltogroup';
import { Salto } from '../../models/salto';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const storageMethods = (store: any) => {
  // Inject LocalStorageService to persist state in the browser localStorage
  const localStorage = inject(LocalStorageService);
  const httpClint = inject(HttpClient);
  return {
    // ================= BOXES =================

    // Replaces the entire boxes collection
    // Also persists the updated boxes list to localStorage
    setBoxes(boxes: Box[]) {
      // Save boxes in localStorage for persistence across page reloads
      localStorage.setLocalStorage('boxes', JSON.stringify(boxes));

      // Update the store state
      patchState(store, { boxes });
    },

    // Returns the latest version of a box by its id
    getCurrentBox(boxId: number) {
      const boxes = store.boxes();
      return boxes.find((b: Box) => b.id === boxId) ?? null;
    },
    // Updates the salto information for a specific box
    // Finds the box by id and updates its saltoId and saltoType
    updateBoxSalto(id: number, saltoId: number, saltoType: string) {
      // Create a new updated boxes array (immutable update)
      const updated = store
        .boxes()
        .map((box: Box) => (box.id === id ? { ...box, saltoId, saltoType } : box));

      // Persist updated boxes in localStorage
      localStorage.setLocalStorage('boxes', JSON.stringify(updated));
      // Update the store state
      patchState(store, { boxes: updated });
    },

    //  Loads boxes from the API and resets the application state
    async loadBoxesFromApi(): Promise<void> {
      const boxes = await firstValueFrom(httpClint.get<Box[]>('/boxes.json'));
      if (!boxes) return;

      this.setBoxes(boxes);
      this.setTotalSaltos(0);
      this.setSelectedBox(null);

      // Persist
      localStorage.setLocalStorage('boxes', JSON.stringify(boxes));
      localStorage.setLocalStorage('total', JSON.stringify(0));
    },

    // Initializes boxes data
    // Uses cached data from localStorage if available
    // Otherwise fetches from API

    initBoxes() {
      const storedBoxes = localStorage.getLocalStorage('boxes');
      if (storedBoxes) {
        const parsedBoxes: Box[] = JSON.parse(storedBoxes);
        this.setBoxes(parsedBoxes);

        const storedTotal = localStorage.getLocalStorage('total');
        if (storedTotal) {
          this.setTotalSaltos(JSON.parse(storedTotal));
        }

        this.setSelectedBox(null);
      } else {
        this.loadBoxesFromApi();
      }
    },

    // Toggles the selection of a box
    // If the box is already selected, deselect it
    toggleBoxSelection(box: Box): void {
      const isSelected = store.selectedBox() === box;
      this.setSelectedBox(isSelected ? null : box);
    },
    // ================= SELECTED BOX =================

    // Updates the currently selected box
    // Used when a user selects a box in the UI
    setSelectedBox(box: Box | null) {
      patchState(store, { selectedBox: box });
    },
    // checks if a specific box is selected
    isBoxSelected(boxId: number) {
      return store.selectedBox()?.id === boxId;
    },

    // ================= SALTO GROUPS =================

    // Stores the salto groups data fetched from the API
    setSaltoGroups(groups: SaltoGroup[]) {
      patchState(store, { saltos: groups });
    },

    // ================= SALTO EVENT =================

    // Emits a salto selection event
    // Used when a salto option is chosen for a box
    emitSaltoOptionSelected(data: { salto: Salto; type: string }) {
      patchState(store, { saltoOptionSelected: data });
    },

    // ================= TOTAL SALTOS =================

    // Updates the total number of selected saltos
    // Also persists the value in localStorage
    setTotalSaltos(total: number) {
      // Save total saltos in localStorage
      localStorage.setLocalStorage('total', JSON.stringify(total));

      // Update the store state
      patchState(store, { totalSaltos: total });
    },

    // Handles user selecting a salto option
    handleSaltoSelection(salto: Salto, type: string) {
      const box = store.selectedBox();
      if (!box) return;
      // Update the box's saltoId and saltoType in the store
      const updatedBoxes = store
        .boxes()
        .map((b: Box) => (b.id === box.id ? { ...b, saltoId: salto.id, saltoType: type } : b));
      patchState(store, { boxes: updatedBoxes });
      localStorage.setLocalStorage('boxes', JSON.stringify(updatedBoxes));
      const previousSelection = store.selectedSaltoOption();
      this.recalculateTotalSaltos(salto, previousSelection);
      const total = store.totalSaltos();
      patchState(store, { totalSaltos: total });
      this.selectNextBox(box);
    },

    // Computes the selected Salto option for a given box
    getSelectedSaltoOption(box: Box): Salto | null {
      if (!box || !box.saltoId || !box.saltoType) return null;
      const groups: SaltoGroup[] | null = store.saltos();
      const group = groups?.find((g) => g.type === box.saltoType);
      return group?.items?.find((item) => item.id === box.saltoId) ?? null;
    },

    //Recalculates the total salto value based on new selection
    // and previous selection.
    // Updates the store signal and persists in localStorage if needed.

    recalculateTotalSaltos(salto: Salto, previousSelection: Salto | null): void {
      const currentTotal = store.totalSaltos();
      const newTotal = currentTotal - (previousSelection?.value ?? 0) + salto.value;

      const roundedTotal = Math.round(newTotal * 100) / 100;

      // Update store signal
      this.setTotalSaltos(roundedTotal);
    },

    // Automatically selects the next box in the list after a selection.
    // If the current box is the last one, clears the selection.

    selectNextBox(currentBox: Box): void {
      const boxes = store.boxes();
      const currentIndex = boxes.findIndex((b: Box) => b.id === currentBox.id);
      const nextBox = boxes[currentIndex + 1];

      if (nextBox) {
        this.setSelectedBox(nextBox);
      } else {
        this.setSelectedBox(null);
      }
    },
  };
};
