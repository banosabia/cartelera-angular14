import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable, of, catchError } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';
import { CreditsResponse } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando : boolean = false;

  constructor(private http:HttpClient) { }

  get params() {
    return {
      api_key: 'cde9a9f15035fa9855c5be4b9a543f55',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<CarteleraResponse> {

    if (this.cargando) {
      return of();
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    })
    .pipe(
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPelicula(texto:string) {
    const params = {...this.params, page: '1', query: texto}
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/multi`, {
      params
    })
    .pipe(
      map(resp => resp.results)
    );
  }

  getPeliculaDetalle(id:string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    );
  }

  getCast(id:string) {
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(err => of([]))
    );
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }
}
