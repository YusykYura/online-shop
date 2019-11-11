import { Component } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { DataService } from '../_services/data.service';
import { data } from '../assets/data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = data;
  searchText: any;
  configUrl = 'assets/config.json';
  constructor(
      private dataService: DataService,
      private http: HttpClient
  ) {
    //this.showConfig();
    this.saveProducts();
  }

  share() {
    window.alert('Продукт добавлено в кошик!');
  }

  ngOnInit() {

  }

  saveProducts() {

  }

  showConfig() {
    this.getConfig()
        .subscribe((data: any) =>
            console.log(data)
        );
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }

}