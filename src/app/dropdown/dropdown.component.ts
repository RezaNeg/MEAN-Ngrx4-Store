import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DropdownValue } from './../models/dropdownValue';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  
  @Input() label: String;
  @Input() icon: String;
  @Input() items: DropdownValue[];

  visible: boolean = false;
  constructor(
    private _eref: ElementRef
  ) { }

  ngOnInit() {
  }

  toggle(){
    this.visible = !this.visible
  }

  onclick(event){
    if (!this._eref.nativeElement.contains(event.target)){
      this.visible = true
    }
  }

}
