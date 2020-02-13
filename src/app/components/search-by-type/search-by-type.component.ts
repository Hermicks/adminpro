import { Component, OnInit, Input } from '@angular/core';
import { SearchByTypeService } from './search-by-type.service';

@Component({
  selector: 'app-search-by-type',
  templateUrl: './search-by-type.component.html',
  styles: []
})
export class SearchByTypeComponent implements OnInit {

  @Input() type = 'usuarios';

  constructor(
    private searchByType: SearchByTypeService
  ) { }

  ngOnInit() {
  }

  search(value: string): void {
    if (value.length <= 0) {
      this.searchByType.searchByType('xxx', value);
      return;
    }
    this.searchByType.searchByType(this.type, value);
  }

}
