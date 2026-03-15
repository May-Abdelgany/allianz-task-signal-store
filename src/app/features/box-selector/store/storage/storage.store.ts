import { signalStore, withState, withComputed, withMethods, withHooks } from '@ngrx/signals';

import { initialState } from './storage.state';
import { storageMethods } from './storage.methods';
import { storageHooks } from './storage.hooks';
import { storageComputed } from './storage.computed';
// Main SignalStore definition
// This store manages boxes, saltos, and UI state related to selections
export const StorageSignalStore = signalStore(
  { providedIn: 'root' }, // Makes the store available as a singleton service across the application

  // ================= STATE =================
  // Defines the initial store state
  // Signals for each property will automatically be created
  withState(initialState),

  // ================= COMPUTED =================
  // Contains derived state (selectors) based on existing store signals
  withComputed(storageComputed),

  // ================= METHODS =================
  // Contains all state mutation logic
  // Responsible for updating the store and persisting data if needed
  withMethods(storageMethods),

  // ================= HOOKS =================
  // Lifecycle hooks for the store
  // Used here to hydrate the store from localStorage on initialization
  withHooks(storageHooks),
);
