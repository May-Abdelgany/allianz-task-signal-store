import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SaltoGroup } from '../../models/saltogroup';
@Injectable({
  providedIn: 'root',
})
export class SaltosService {
  private readonly http = inject(HttpClient);

  // ==================== Fetch Saltos ====================

  //Fetches salto groups from the API
  fetchSaltos() {
    return this.http
      .get<{ saltos: SaltoGroup[] }>('/saltos.json')
      .pipe(map((response) => response.saltos));
  }


}
