import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-heder',
  templateUrl: './search-heder.component.html',
  styleUrls: ['./search-heder.component.scss']
})
export class SearchHederComponent implements OnInit {

  @ViewChild('search', {static: false}) search: ElementRef;
  
  @Output() searched = new EventEmitter<string>();
  @Output() reseted = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {
  }

  onSearch(){
    this.searched.emit(this.search.nativeElement.value);
  }
  onReset(){
    this.search.nativeElement.value = '';
    this.reseted.emit('reseteo');
  }

}
