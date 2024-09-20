import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board/board.component';
import { TableComponent } from '../views/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgIconComponent } from '../standalone/img-icon.component';


@NgModule({
  declarations: [
    BoardComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    ImgIconComponent,
    FormsModule
  ]
})
export class BoardModule { }
