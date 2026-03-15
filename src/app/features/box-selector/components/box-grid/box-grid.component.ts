import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { StorageSignalStore } from '../../store/storage/storage.store';

@Component({
  selector: 'app-box-grid',
  imports: [BoxComponent],
  templateUrl: './box-grid.component.html',
  styleUrls: ['./box-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxGridComponent implements OnInit {
  private readonly store = inject(StorageSignalStore);

  readonly boxes = this.store.boxes;

  readonly selectedBox = this.store.selectedBox;

  ngOnInit(): void {
    this.store.initBoxes();
  }
}
