import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(
    private router: Router,
    private mainTitle: Title,
    private meta: Meta
  ) {
    this.getDataFromRouter()
    .subscribe(
      (data) => {
        this.title = data;
        this.mainTitle.setTitle(data);
        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.title
        };
        this.meta.updateTag(metaTag);
      }
    );
  }

  ngOnInit() {
  }

  getDataFromRouter(): Observable<string> {
    return this.router.events
    .pipe(
      filter(data => data instanceof ActivationEnd),
      filter((data: ActivationEnd) => data.snapshot.firstChild === null),
      map((data: ActivationEnd) => data.snapshot.data.title)
    );
  }

}
