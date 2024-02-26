import { ChartsService } from '../../services/services/charts.service';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { DateSelectionService } from '../calender/calender.service';
import { Calender1Service } from '../calender1/calender1.service';
import { TopPayResponse } from 'src/app/services/models';
import { Calender4Service } from '../calender4/calender4.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  mapOption: EChartsOption = {};



  selectedYear: any;
  private yearSubscription: Subscription = new Subscription();
  


  constructor(private ChartsService:ChartsService,private dateSelectionService: DateSelectionService,private Calender4Service: Calender4Service,private http: HttpClient) {}


    ngOnInit(): void {
      this.http
      .get<any>('assets/custom-geo.json')
      .subscribe((worldJson) => {
        echarts.registerMap('world', worldJson);
        this.mapOption = {
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
              map: 'world',
              emphasis: {
                label: {
                  show: true
                }
              },


          }
          ]
        };
      });
      this.yearSubscription = this.Calender4Service.getYear().subscribe((year) => {
        this.selectedYear = year;
        this.mapFunction();
      });

  }

  mapFunction(): void {
    this.http
      .get<any>('assets/custom-geo.json')
      .subscribe((worldJson) => {
        echarts.registerMap('world', worldJson);
        this.ChartsService.getGlobalsalesGlobalsalesYearGet$Response({year: this.selectedYear}).subscribe((response) => {
          const pays = response.body.pays;

          this.mapOption = {
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
                map: 'world',
                emphasis: {
                  label: {
                    show: true
                  }
                },

                data:pays.map((item: { pays: any, ventes_totales:any }) => ({name:item.pays,value:item. ventes_totales})),

            }
            ]
          };
        });

  }
  )};
}
