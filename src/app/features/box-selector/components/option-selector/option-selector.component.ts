import {
  Component,
  inject,
  computed,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SaltosService } from '../../services/saltos/saltos.service';
import { Salto } from '../../models/salto';
import { SaltoGroup } from '../../models/saltogroup';
import { StorageSignalStore } from '../../store/storage/storage.store';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionSelectorComponent {
  // ==================== Inject Services ====================
  private readonly saltosService = inject(SaltosService);
  private readonly store = inject(StorageSignalStore); // reactive SignalStore

  readonly totalSaltos = this.store.totalSaltos;
  readonly selectedBox = this.store.selectedBox;
  readonly saltoGroups = this.store.saltos;
  readonly selectedSaltoOption = this.store.selectedSaltoOption;
  readonly selectedSaltoType = this.store.selectedSaltoType;

  ngOnInit(): void {
    // Fetch and store salto groups
    this.saltosService.fetchSaltos().subscribe((groups) => {
      this.store.setSaltoGroups(groups);
    });
  }

  onSelectOption(salto: Salto, type: string) {
    this.store.handleSaltoSelection(salto, type);
  }
}
