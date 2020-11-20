import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../modes/Product';
import { IPagination } from '../modes/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Skinet';
  products: IProduct[];

  constructor(private http: HttpClient){}

  ngOnInit(): void {

    this.http.get('https://localhost:5001/api/products?pageSize=50')
      .subscribe((res: IPagination) => {
        this.products = res.data;
        console.log(res);
      }, error => console.log(error));

  }
}
