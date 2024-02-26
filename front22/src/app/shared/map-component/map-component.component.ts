
import { ChartsService } from '../../services/services/charts.service';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';


import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { DateSelectionService } from './DateSelectionService.service';

import { Calender4Service } from '../calender4/calender4.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {
  private dateSubscription: Subscription = new Subscription;
  selectedYear: any;
  private yearSubscription: Subscription = new Subscription();



  chart: any;

  mapoption: EChartsOption = {};
  barOption: EChartsOption = {}; // add this line
  isMapView: boolean = true;
  loading = true;
  filterdate: string | undefined;

  constructor(private dateSelectionService: DateSelectionService,private Calender4Service: Calender4Service, private datePipe: DatePipe,private ChartsService: ChartsService,private http: HttpClient) {}

  ngOnInit(): void {

    this.http
    .get<any>('../../assets/geoBoundaries-TUN-ADM1_simplified.json')
    .subscribe((worldJson) => {
      echarts.registerMap('Tunisia', worldJson);

        this.mapoption = {
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
          },
          visualMap: {
            left: 'right',
            min: 500000,
            max: 38000000,
            inRange: {
              color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026'
              ]
            },
            text: ['High', 'Low'],
            calculable: true
          },
          toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: 'Sales',
              type: 'map',
              roam: true,
              map: 'Tunisia',
              emphasis: {
                label: {
                  show: true
                }
              },

            }
          ]
        };


    });



    this.dateSubscription = this.dateSelectionService.selectedDate$.subscribe((date: Date | undefined) => {
      this.filterdate = date ? this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')! : undefined;
      this.yearSubscription = this.Calender4Service.getYear().subscribe((year) => {
        this.selectedYear = year;

        this.mapFunction();
      });
    });
  }

  toggleView(): void { // add this method
    this.isMapView = !this.isMapView;
  }

  mapFunction(): void {
    this.http
      .get<any>('../../assets/geoBoundaries-TUN-ADM1_simplified.json')
      .subscribe((worldJson) => {
        echarts.registerMap('Tunisia', worldJson);
        this.ChartsService.getRegionRegYearGet$Response({year: this.selectedYear})


        .subscribe(response => {
          const regions = response.body.regions;
          this.mapoption = {
            tooltip: {
              trigger: 'item',
              showDelay: 0,
              transitionDuration: 0.2
            },
            visualMap: {
              left: 'right',
              min: 500000,
              max: 38000000,
              inRange: {
                color: [
                  '#313695',
                  '#4575b4',
                  '#74add1',
                  '#abd9e9',
                  '#e0f3f8',
                  '#ffffbf',
                  '#fee090',
                  '#fdae61',
                  '#f46d43',
                  '#d73027',
                  '#a50026'
                ]
              },
              text: ['High', 'Low'],
              calculable: true
            },
            toolbox: {
              show: true,
              //orient: 'vertical',
              left: 'left',
              top: 'top',
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            series: [
              {
                name: 'Sales',
                type: 'map',
                roam: true,
                map: 'Tunisia',
                emphasis: {
                  label: {
                    show: true
                  }
                },
                data: regions.map((item: { gouvernorat: any;TotalRevenue:any }) => ({name:item.gouvernorat,value:item.TotalRevenue}))
              }
            ]
          };

          this.barOption = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: regions.map((item: any) => item.gouvernorat)
            },
            series: [

              {
                name: '',
                type: 'bar',
                data:  regions.map((item: any) => item.TotalRevenue),
              }
            ]



          };
        });
      });
  }
}
