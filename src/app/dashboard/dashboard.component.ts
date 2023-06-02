import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BarData } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  barChartData: BarData[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(): void {
    this.dataService.getChartData().subscribe(
      (data: BarData[]) => {
        this.barChartData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    
  }
  
  
}
