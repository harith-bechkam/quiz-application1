
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  
  MatSidenavModule,
 
  MatToolbarModule,

} from '@angular/material';
import { NgModule } from '@angular/core';
const MATERIAL_MODULES = [

  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  
  
]

@NgModule({
  imports: [
    
    MATERIAL_MODULES
  ],
  exports: [
    
    MATERIAL_MODULES
  ]
})
export class MaterialModule { }