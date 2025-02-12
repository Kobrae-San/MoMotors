import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  imports: [ButtonModule, CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {}
