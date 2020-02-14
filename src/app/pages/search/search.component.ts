import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { SEARCH_SERVICES } from '../../config/search/search-config.index';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor(
    private routes: ActivatedRoute,
    private http: HttpClient
  ) {
    this.routes.params.subscribe(
      params => {
        const term: string = params.termino;
        this.searchByTerm(term);
      }
    );
  }

  ngOnInit() {
  }

  // Método usado únicamente en este componente. Hacemos aquí la petición HTTP
  searchByTerm(term: string): void {
    const URL: string = URL_SERVICES + SEARCH_SERVICES.genericSearch + '/' + term;
    this.http.get(URL).subscribe(
      (resp: any) => {
        this.users = resp.users;
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
      }
    );
  }

}
