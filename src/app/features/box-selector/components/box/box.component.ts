import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { StorageSignalStore } from '../../store/storage/storage.store';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  private readonly store = inject(StorageSignalStore);
  readonly boxId = input.required<number>();

  readonly boxes = this.store.boxes;

  readonly selectedBox = this.store.selectedBox;

  readonly saltoGroups = this.store.saltos;

  // Selects the current box based on the input `boxId`
  readonly box = computed(() => this.store.getCurrentBox(this.boxId()));

  // Returns the latest version of this box from the store
  readonly currentBox = computed(() => this.store.getCurrentBox(this.boxId()));

  // Determines if this box is currently selected
  readonly isSelected = computed(() => this.store.isBoxSelected(this.boxId()));

  // Returns the  salto option associated with this box
  readonly selectedSaltoOption = computed(() => this.store.getSelectedSaltoOption(this.box()));
  
  // Handles user clicking the box.
  // Toggles selection through the BoxService.
  onBoxClick(): void {
    const box = this.currentBox();
    if (!box) return;
    this.store.toggleBoxSelection(box);
  }
}
