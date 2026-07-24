import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from 'app/models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  http = inject(HttpClient);

  API = "http://localhost:8080/api/marca";

  constructor() { }

  findAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.API + "/findAll");
  }

  deleteById(id: number): Observable<String> {
    return this.http.delete<String>(this.API + "/deleteById/" + id, { responseType: 'text' as 'json' });
  }

  save(marca: Marca): Observable<String> {
    return this.http.post<String>(this.API + "/save", marca, { responseType: 'text' as 'json' });
  }

  update(marca: Marca, id: number): Observable<String> {
    return this.http.put<String>(this.API + "/update/" + id, marca, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API + "/findById/" + id);
  }
}
