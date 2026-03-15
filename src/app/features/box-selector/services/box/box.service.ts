import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Box } from '../../models/box';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private readonly http = inject(HttpClient);

  // Fetches all boxes from the backend API

  fetchBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>('/boxes.json');
  }
}
