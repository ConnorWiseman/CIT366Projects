import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = "CMS";
  selectedFeature: string = "documents";

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
