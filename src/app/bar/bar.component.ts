import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import * as d3 from 'd3';


interface BarData {
 label: string;
 value: number;
}


@Component({
 selector: 'app-bar',
 templateUrl: './bar.component.html',
 styleUrls: ['./bar.component.css'],
// imports:[MatFormFieldModule, MatSelectModule, NgFor, MatInputModule ]
})
export class BarComponent implements OnInit {
 @Input()
 data: BarData[] = [];


 private ascendingSort!: boolean;
 constructor(){
   this.ascendingSort = true;
 }
 private svg: any;
 private margin = 50;
 private width = 750 - this.margin * 2;
 private height = 400 - this.margin * 2;


 ngOnInit(): void {
   this.createSvg();
   this.drawBars();
   this.ResetData();
   this.drawBars();
   this.redrawBars();
 }


 private createSvg(): void {
   this.svg = d3
     .select('figure#bar')
     .append('svg')
     .attr('width', this.width + this.margin * 2)
     .attr('height', this.height + this.margin * 2)
     .append('g')
     .attr('transform', `translate(${this.margin}, ${this.margin})`);
 }




 filteredData: BarData[] = [];
 title:any
 xvalue:any;
 yvalue:any;
 getHoverData(title:any,x:any,y:any){
   this.title = title
   this.xvalue = x
   this.yvalue = y
   console.log(this.title ,this.xvalue,this.yvalue);
  
 }


 filterData(): void {
   //this.filteredData = this.data.filter((d: BarData) => d.value > 150 && !/^S-Z/i.test(d.label));
   this.svg.selectAll('rect').remove()
 this.redrawBars();
 }
 redrawBars(): void {
   // Remove the existing bars
 //  this.svg.selectAll('rect').remove()
 const tooltip = d3
     .select('body')
     .append('div')
     .attr('class', 'tooltip')
     .style('opacity', 0);


   // Create the X-axis band scale
   const x = d3
     .scaleBand()
     .range([0, this.width])
     .domain(this.data.map((d) => d.label))
     .padding(0.2);


   // Draw the X-axis on the DOM
   this.svg
     .append('g')
     .attr('transform', `translate(0, ${this.height})`)
     .call(d3.axisBottom(x))
     .selectAll('text')
     .attr('transform', 'translate(-10,0)rotate(-45)')
     .style('text-anchor', 'end')
     .text();


   // Create the Y-axis linear scale
   const y = d3
     .scaleLinear()
     .domain([0, d3.max(this.data, (d) => d.value) || 0])
     .range([this.height, 0]);


   // Draw the Y-axis on the DOM
   this.svg.append('g').call(d3.axisLeft(y));
 this.svg
 .selectAll('rect')
 .data(this.data)
 .enter()
 .append('rect')
 .attr('x', (d: { label: string }) => x(d.label) || 0)
 .attr('y', (d: { value: d3.NumberValue }) => y(d.value))
 .attr('width', x.bandwidth())
 .attr(
   'height',
   (d: { value: d3.NumberValue }) => this.height - y(d.value)
 )
  .attr('fill', (d: { value: number }) => {
   if (d.value > 44) {
     return 'green';
   } else if (d.value < 44) {
     return 'white';
   } else {
     return '#d04a35';
   }
 })






 .on('mouseover', (event: any, d: BarData) => {
   const [x, y] = d3.pointer(event);
   tooltip.transition().duration(200).style('opacity', 0.9);
   tooltip
     .html(`<strong>${d.label}</strong><br/>Value: ${d.value}`)
     .style('left', `${x}px`)
     .style('top', `${y}px`);
     this.getHoverData(d.label,x,y)
 })
 .on('mouseout', () => {
   tooltip.transition().duration(500).style('opacity', 0);
 })
};
ResetData(): void {
 //this.data = []; // Reset the data array to an empty array or assign it a new set of data
 this.svg.selectAll('rect').remove(); // Remove the existing bars
 this.drawBars(); // Redraw the bars with the updated data
}
// from here


   //for sorting and filtering






 private drawBars(): void {
   const tooltip = d3
     .select('body')
     .append('div')
     .attr('class', 'tooltip')
     .style('opacity', 0);


   // Create the X-axis band scale
   const x = d3
     .scaleBand()
     .range([0, this.width])
     .domain(this.data.map((d) => d.label))
     .padding(0.2);


   // Draw the X-axis on the DOM
   this.svg
     .append('g')
     .attr('transform', `translate(0, ${this.height})`)
     .call(d3.axisBottom(x))
     .selectAll('text')
     .attr('transform', 'translate(-10,0)rotate(-45)')
     .style('text-anchor', 'end')
     .text();


   // Create the Y-axis linear scale
   const y = d3
     .scaleLinear()
     .domain([0, d3.max(this.data, (d) => d.value) || 0])
     .range([this.height, 0]);


   // Draw the Y-axis on the DOM
   this.svg.append('g').call(d3.axisLeft(y));


   // Create and fill the bars
   this.svg
     .selectAll('rect')
     .data(this.data)
     .enter()
     .append('rect')
     .attr('x', (d: { label: string }) => x(d.label) || 0)
     .attr('y', (d: { value: d3.NumberValue }) => y(d.value))
     .attr('width', x.bandwidth())
     .attr(
       'height',
       (d: { value: d3.NumberValue }) => this.height - y(d.value)
     )
    
     .attr('fill', (d: { value: number }) => {
       if (d.value > 44) {
         return 'green';
       } else if (d.value <= 44) {
         return 'red';
       } else {
         return '#d04a35';
       }
      
     })
     .on('mouseover', (event: any, d: BarData) => {
       const [x, y] = d3.pointer(event);
       tooltip.transition().duration(200).style('opacity', 0.9);
       tooltip
         .html(`<strong>${d.label}</strong><br/>Value: ${d.value}`)
         .style('right', `${x}px`)
         .style('top', `${y}px`);
         this.getHoverData(d.label,x,y)
     })
     .on('mouseout', () => {
       tooltip.transition().duration(500).style('opacity', 0);
     })


    
 
 }
  sortData(ascending: boolean): void {
   if (ascending) {
     this.data.sort((a, b) => a.value - b.value);
   } else {
     this.data.sort((a, b) => b.value - a.value);
   }


   this.svg.selectAll('rect').remove();
   this.drawBars();
 }
}