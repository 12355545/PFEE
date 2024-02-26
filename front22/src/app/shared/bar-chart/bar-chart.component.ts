
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption , SeriesOption } from 'echarts';


import { ChartsService } from 'src/app/services/services';


import { Dashborad2Service } from '../dashborad2/dashborad2.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {

  selectedYear: any;

   // Define optionsArray as an array of any
  options: EChartsOption = {};
  loading = true;


  revvvv: any;


  constructor(



    private ChartsService: ChartsService,
    private dashboard1Service:Dashborad2Service,

  ) {}


  ngOnInit(): void {

    this.dashboard1Service.GetSelectedChoixObservable().subscribe((choix) => {
      // Call loadData1() when choices change
      this.loadData1();
    });
  }




  loadData(): void {
    this.ChartsService.getTotalrevenueTotalrevenueYearGet$Response({ year1: this.selectedYear }).subscribe((Response) => {
          const revenueData = Response.body.rev;
          this.revvvv =Response.body.total_revenue_yearly
           this.options = {
            title: {
              text: "Total sales of year"+ this.selectedYear +":"+this.revvvv,
              subtext: '',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['', '']
            },
            toolbox: {
              show: true,
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                // prettier-ignore
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: ' year 2017',
                type: 'bar',
                color: '#007bff',
                data: revenueData.map((item: { total_revenue_N: any; }) => item.total_revenue_N),
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                  ]
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }]
                }
              },

            ]
          };
          this.loading = false;
        },
        (error) => {
          console.error('Failed to load revenue data:', error);
          this.loading = false;
        }
      );
  }
  loadBothYearsData(): void {
    this.loading = true;
    this.ChartsService.getTotalrevenueSalesGet$Response({}).subscribe((Response) => {
      const revenueData = Response.body.sales;
      this.options = {
        title: {
          text: ' year 2018 vs year 2017',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['year 2017', ' year 2018']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'year 2017',
            type: 'bar',
            color: '#56A874',
            data: revenueData.map((item: { total_revenue_N: any; }) => item.total_revenue_N),
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: ' year 2018',
            type: 'bar',
            color: '#007bff',
            data: revenueData.map((item: { total_revenue_Nplus: any; }) => item.total_revenue_Nplus) ,
            markPoint: {
              data: [
                { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      };
      this.loading = false;
    },
    (error) => {
      console.error('Failed to load both years\' data:', error);
      this.loading = false;
    });
  }


  loadData1(): void {
    this.loading = true;
    const list = this.dashboard1Service.Getselectedyears();
    const choix = this.dashboard1Service.Getselectedchoix();
    const concatenatedString = choix.join(', ');
    const yearString = list.join(', ');

    // Define an array of colors
    const yearColors: string[] = ['#56A874', '#FF5733', '#337DFF', '#FF337D']; // Add more colors as needed

    // Fetch data from the backend
    this.ChartsService.getTotalMontanteachyearListyearChoixGet({ listyear: yearString, choix: concatenatedString }).subscribe((Response) => {
      const revenueData = Response.sales;

      // Split revenueData based on the selected choix (month or trimester)
      const series: SeriesOption[] = [];
      const categories: string[] = [];
      const numRowsToCollect = choix.includes('month') ? 12 : 4;

      if (choix.includes('month')) {
        // Split data into 12 months
        categories.push(...['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      } else if (choix.includes('trimester')) {
        // Split data into 4 trimesters
        categories.push(...['trimester 1', 'trimester 2', 'trimester 3', 'trimester 4']);
      }

      let currentYearData: number[] = [];

      for (let i = 0; i < revenueData.length; i++) {
        const item = revenueData[i];

        // Push data to the currentYearData array
        currentYearData.push(item.total_revenue_N);

        // Check if we have collected data for the specified number of rows or if we have reached the end of the data
        if (currentYearData.length === numRowsToCollect || i === revenueData.length - 1) {
          // Assign a color based on the index of the series
          const colorIndex = series.length % yearColors.length;

          // Add currentYearData to the series with the assigned color
          series.push({
            name: `Year ${list[series.length]}`,
            type: 'bar',
            color: yearColors[colorIndex],
            data: currentYearData,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          });

          // Reset currentYearData for the next set of rows
          currentYearData = [];
        }
      }

      this.options = {
        title: {
          text: 'Yearly Sales Comparison',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: list.map(year => `Year ${year}`)
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: categories
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      };

      this.loading = false;
    });
  }











  ngOnDestroy(): void {
    // Clean up any subscriptions or resources if needed
  }

}
