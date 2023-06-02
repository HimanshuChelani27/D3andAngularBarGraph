import { Component } from '@angular/core';

export interface BarData {
  label: string;
  value: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  public barChartData: BarData[] = [
    { label: 'Framework 1', value: 100 },
    { label: 'Framework 2', value: 200 },
    { label: 'Framework 3', value: 500 },
    { label: 'Framework 4', value: 100 },
    { label: 'Framework 5', value: 100 },
    { label: 'Framework 6', value: 700 },
    { label: 'Framework 7', value: 650 },
    // Add more data objects as needed
  ];
}
