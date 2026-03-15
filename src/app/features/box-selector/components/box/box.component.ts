import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BoxService } from '../../services/box/box.service';
import { Box } from '../../models/box';
import { SaltoGroup } from '../../models/saltogroup';
import { StorageSignalStore } from '../../store/storage/storage.store';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  // ==================== Inject Services ====================
  private readonly store = inject(StorageSignalStore); // reactive store
  private readonly boxService = inject(BoxService);

  // ==================== Input ====================

  //Input boxId coming from the parent list.
  //Required decorator ensures parent passes this value.

  readonly boxId = input.required<number>();

  // ==================== Reactive Signals ====================

  // Reactive signal of all boxes

  readonly boxes = this.store.boxes;

  //  Reactive signal of the currently selected box
  readonly selectedBox = this.store.selectedBox;

  // Reactive signal of all salto groups
  readonly saltoGroups = this.store.saltos;

  // ==================== Computed Signals ====================

  //Selects the current box based on the input `boxId`
  // Reacts automatically if boxes or boxId change

  readonly box = computed(() => this.store.getCurrentBox(this.boxId()));

  // Returns the latest version of this box from the store
  readonly currentBox = computed(() => this.store.getCurrentBox(this.boxId()));

  // Determines if this box is currently selected
  readonly isSelected = computed(() => this.store.isBoxSelected(this.boxId()));

  // Returns the  salto option associated with this box
  readonly selectedSaltoOption = computed(() => this.store.getSelectedSaltoOption(this.box()));

  // ==================== Actions ====================

  //Handles user clicking the box.
  // Toggles selection through the BoxService.

  onBoxClick(): void {
    const box = this.currentBox();
    if (!box) return;
    this.store.toggleBoxSelection(box);
  }
}
