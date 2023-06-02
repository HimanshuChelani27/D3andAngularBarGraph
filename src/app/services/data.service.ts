import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BarData } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getChartData(): Observable<BarData[]> {
    // Simulate fetching data from a mock API endpoint
    const mockData: BarData[] = [
      
      
      { label: 'SQL', value: 49.43 },
   
      
      { label: 'TYPESCRIPT', value: 34.83 },
      { label: 'JAVA', value: 33.27 },
      { label: 'JavaScript',value: 65.36 },
      
      { label: 'BASH/SHELL', value: 29.07 },
      { label: 'HTML/CSS', value: 55.08 },
      { label: 'C#', value: 27.98 },
      { label: 'PYTHON', value: 48.07 },
   
      { label: 'C++', value: 22.55 },
      { label: 'PYTHON', value: 48.07 },
      { label: 'TYPESCRIPT', value: 34.83 },
      { label: 'PHP',value: 20.66 },
      // Add more data objects as needed
    ];

    

    return of(mockData);
  }
}