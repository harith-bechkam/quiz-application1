import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JAVASCRIPT } from "../../data/javascript.data";
import { ASPNET } from "../../data/aspnet.data";
import { CSHARP } from "../../data/csharp.data";
import { DESIGNPATTERNS } from "../../data/designPatterns.data";
@Injectable()
export class QuizService {
  constructor(private http: HttpClient) {}

  get(type: string): any {
    let data: any;
    switch (type) {
      case "javascript":
        return JAVASCRIPT;
      case "aspnet":
        return ASPNET;
      case "csharp":
        return CSHARP;
      case "designPatterns":
        return DESIGNPATTERNS;
    }
  }

  getAll() {
    return [
      { id: "javascript", name: "JavaScript" },
      { id: "aspnet", name: "Asp.Net" },
      { id: "csharp", name: "C Sharp" },
      { id: "designPatterns", name: "Design Patterns" }
    ];
  }
}
