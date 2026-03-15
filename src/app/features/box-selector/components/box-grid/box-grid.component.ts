import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { BoxService } from '../../services/box/box.service';
import { StorageSignalStore } from '../../store/storage/storage.store';

@Component({
  selector: 'app-box-grid',
  imports: [BoxComponent],
  templateUrl: './box-grid.component.html',
  styleUrls: ['./box-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxGridComponent implements OnInit {
  // ==================== Inject Services ====================
  private readonly boxService = inject(BoxService);
  private readonly store = inject(StorageSignalStore);

  // ==================== Reactive Signals ====================

  // Signal representing the current boxes list from the global store.
  readonly boxes = this.store.boxes;

  // Signal representing the currently selected box
  // Optional: useful if you need to highlight the selected box in the grid
  readonly selectedBox = this.store.selectedBox;

  // ==================== Lifecycle ====================

  // On initialization, load boxes data.
  ngOnInit(): void {
    this.store.initBoxes();
  }
}
