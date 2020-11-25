import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = environment.baseUrl;
  validationError: any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get500Error(){
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(r => {
      console.log(r);
    }, error => {
      console.log(error);
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(r => {
      console.log(r);
    }, error => {
      console.log(error);
    });
  }

  get404Error(){
    this.http.get(this.baseUrl + 'products/44').subscribe(r => {
      console.log(r);
    }, error => {
      console.log(error);
    });
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'products/dos').subscribe(r => {
      console.log(r);
    }, error => {
      console.log(error);
      this.validationError = error.errors;
    });
  }

}
