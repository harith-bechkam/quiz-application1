import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";


@Component({
  selector: "app-master-layout",
  templateUrl: "./master-layout.component.html",
  styleUrls: ["./master-layout.component.scss"]
})

export class MasterLayoutComponent implements OnInit 
{
  Username: string;
  constructor(private router:Router,private store: StorageService) 
  {
    this.Username = this.store.sessionUsername;
  }
  ngOnInit() {}






  logout()
   {
    this.store.deleteSession();
    this.router.navigate([""]);
  }
}
