import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @Input() imageFirst : Boolean = false;
  @Input() url : string | ArrayBuffer | null | undefined  = '';
  @Input() title : string = '';
  @Input() description : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
