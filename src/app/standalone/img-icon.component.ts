import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'img-icon',
  standalone: true,
  imports: [CommonModule],
  template: '<img *ngIf="imgConfig[type] && imgConfig[type][name]" [src]="imgConfig[type][name]" [ngStyle]="{width:size+sizeUnit,height:size+sizeUnit}" />',
  styles: []
})
export class ImgIconComponent {
  @Input() name:any;
  @Input() type:any;
  @Input() size:number=100;
  @Input() sizeUnit:string='px'
  imgConfig:any={
    login:{
      loginThumnail:'assets/login-img/login-thumnail.png',
      logo:'assets/login-img/automateazyLogo.png'
    },
    tableView:{
      gmail:'assets/table-icons/icons8-gmail.svg'
    }
  }
}
