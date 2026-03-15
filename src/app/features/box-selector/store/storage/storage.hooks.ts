import { inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { LocalStorageService } from '../../../../core/services/localStorage/local-storage.service';

export const storageHooks = (store: any) => {
  // Inject LocalStorageService to interact with browser localStorage
  const localStorage = inject(LocalStorageService);

  return {
    // Lifecycle hook that runs automatically when the SignalStore is initialized
    // It is used here to restore persisted state from localStorage
    onInit() {
      // Retrieve saved boxes data from localStorage
      const boxes = localStorage.getLocalStorage('boxes');

      // Retrieve saved total saltos count from localStorage
      const total = localStorage.getLocalStorage('total');

      try {
        patchState(store, {
          boxes: boxes ? JSON.parse(boxes) : [],
          totalSaltos: total ? JSON.parse(total) : 0,
        });
      } catch (error) {
        console.error('Failed to restore state from localStorage:', error);
      }
    },
  };
};
