import { Component, signal } from '@angular/core';
import { TotalComponent } from "./features/box-selector/components/total/total.component";
import { BoxGridComponent } from "./features/box-selector/components/box-grid/box-grid.component";
import { OptionSelectorComponent } from "./features/box-selector/components/option-selector/option-selector.component";

@Component({
  selector: 'app-root',
  imports: [TotalComponent, BoxGridComponent, OptionSelectorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('allianz-task-signal-store');
}
