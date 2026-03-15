import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoxService } from '../../services/box/box.service';
import { StorageSignalStore } from '../../store/storage/storage.store';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalComponent {
  // ==================== Inject Services ====================
  private readonly store = inject(StorageSignalStore); // reactive SignalStore
  private readonly boxService = inject(BoxService);

  // ==================== Reactive Signals ====================

  // Reactive signal representing the total salto value.
  //Automatically updates whenever the store changes.

  readonly totalSaltos = this.store.totalSaltos;

  // ==================== Actions ====================

  // Resets all boxes by reloading them from the API and clearing the current application state.

  resetBoxes(): void {
    this.store.loadBoxesFromApi();
  }
}
