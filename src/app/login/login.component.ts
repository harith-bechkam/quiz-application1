import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";

import { FormGroup, FormControl } from "@angular/forms";


import * as uuid from "uuid";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})

export class LoginComponent implements OnInit 
{
  Username: string =  "Dummy"
  form: FormGroup = new FormGroup({
    username: new FormControl("")
  });
  constructor(private router:Router,private store:StorageService) {}
  
  ngOnInit() {
    sessionStorage[this.Username] = "harith";
  }


  submit() {
    if (this.form.valid) {
      const guid = uuid.v4();
      this.store.sessionId = guid;
      this.store.sessionUsername = this.form.value.username;
      this.router.navigate(["/quiz"]);
    }
  }
}
