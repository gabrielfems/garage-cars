import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carro } from 'app/models/carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  http = inject(HttpClient);

  API = "http://localhost:8080/api/carro";

  constructor() { }

  findAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API+"/findAll");
  }

  deleteById(id: number): Observable<String> {
    return this.http.delete<String>(this.API+"/deleteById/"+id, { responseType: 'text' as 'json' });
  }

  save(carro: Carro): Observable<String> {
    return this.http.post<String>(this.API+"/save", carro, { responseType: 'text' as 'json' });
  }

  update(carro: Carro, id: number): Observable<String> {
    return this.http.put<String>(this.API+"/update/"+id, carro, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API+"/findById/"+id);
  }
}
