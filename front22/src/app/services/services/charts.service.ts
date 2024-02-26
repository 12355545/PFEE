/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { TopClientsResponse } from '../models/top-clients-response';
import { TopCusrsResponse } from '../models/top-cusrs-response';
import { TopCustomersResponse } from '../models/top-customers-response';
import { TopPaysResponse } from '../models/top-pays-response';
import { TopRegionsResponse } from '../models/top-regions-response';
import { TopclsResponse } from '../models/topcls-response';
import { TopproductsResponse } from '../models/topproducts-response';
import { TopprosResponse } from '../models/toppros-response';
import { TransactionsResponse } from '../models/transactions-response';
import { EcartsResponse } from '../models/ecarts-response';
import { RevenuesResponse } from '../models/revenues-response';
import { SalesResponse } from '../models/sales-response';
import { SasResponse } from '../models/sas-response';

@Injectable({ providedIn: 'root' })
export class ChartsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getComparaisonComparaisonFilterDateGet()` */
  static readonly GetComparaisonComparaisonFilterDateGetPath = '/comparaison/{filter_date}';

  /**
   * Get Comparaison.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComparaisonComparaisonFilterDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComparaisonComparaisonFilterDateGet$Response(
    params: {
      filter_date: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetComparaisonComparaisonFilterDateGetPath, 'get');
    if (params) {
      rb.path('filter_date', params.filter_date, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get Comparaison.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getComparaisonComparaisonFilterDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComparaisonComparaisonFilterDateGet(
    params: {
      filter_date: string;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.getComparaisonComparaisonFilterDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `getRevthisyearRevthisyearGet()` */
  static readonly GetRevthisyearRevthisyearGetPath = '/revthisyear';

  /**
   * Get Revthisyear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRevthisyearRevthisyearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRevthisyearRevthisyearGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetRevthisyearRevthisyearGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get Revthisyear.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRevthisyearRevthisyearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRevthisyearRevthisyearGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<any> {
    return this.getRevthisyearRevthisyearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `getRevyearRevyearsListyearsGet()` */
  static readonly GetRevyearRevyearsListyearsGetPath = '/revyears/{listyears}';

  /**
   * Get Revyear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRevyearRevyearsListyearsGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getRevyearRevyearsListyearsGet$Response(
    params: {
      body: Array<any>
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetRevyearRevyearsListyearsGetPath, 'get');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get Revyear.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRevyearRevyearsListyearsGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getRevyearRevyearsListyearsGet(
    params: {
      body: Array<any>
    },
    context?: HttpContext
  ): Observable<any> {
    return this.getRevyearRevyearsListyearsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `getTotalrevenueTotalrevenueYearGet()` */
  static readonly GetTotalrevenueTotalrevenueYearGetPath = '/totalrevenue/{year}';

  /**
   * Get Totalrevenue.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTotalrevenueTotalrevenueYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalrevenueTotalrevenueYearGet$Response(
    params: {
      year1: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<RevenuesResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetTotalrevenueTotalrevenueYearGetPath, 'get');
    if (params) {
      rb.query('year1', params.year1, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RevenuesResponse>;
      })
    );
  }

  /**
   * Get Totalrevenue.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTotalrevenueTotalrevenueYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalrevenueTotalrevenueYearGet(
    params: {
      year1: number;
    },
    context?: HttpContext
  ): Observable<RevenuesResponse> {
    return this.getTotalrevenueTotalrevenueYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<RevenuesResponse>): RevenuesResponse => r.body)
    );
  }

  /** Path part for operation `getTotalrevenueSalesGet()` */
  static readonly GetTotalrevenueSalesGetPath = '/sales';

  /**
   * Get Totalrevenue.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTotalrevenueSalesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalrevenueSalesGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<SalesResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetTotalrevenueSalesGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SalesResponse>;
      })
    );
  }

  /**
   * Get Totalrevenue.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTotalrevenueSalesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalrevenueSalesGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<SalesResponse> {
    return this.getTotalrevenueSalesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<SalesResponse>): SalesResponse => r.body)
    );
  }

  /** Path part for operation `getTotalMontanteachyearListyearChoixGet()` */
  static readonly GetTotalMontanteachyearListyearChoixGetPath = '/montanteachyear/{listyear}/{choix}';

  /**
   * Get Total.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTotalMontanteachyearListyearChoixGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalMontanteachyearListyearChoixGet$Response(
    params: {
      listyear: string;
      choix: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<SasResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetTotalMontanteachyearListyearChoixGetPath, 'get');
    if (params) {
      rb.path('listyear', params.listyear, {});
      rb.path('choix', params.choix, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SasResponse>;
      })
    );
  }

  /**
   * Get Total.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTotalMontanteachyearListyearChoixGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTotalMontanteachyearListyearChoixGet(
    params: {
      listyear: string;
      choix: string;
    },
    context?: HttpContext
  ): Observable<SasResponse> {
    return this.getTotalMontanteachyearListyearChoixGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<SasResponse>): SasResponse => r.body)
    );
  }

  /** Path part for operation `calculateEcartTypeEcarttypeListyearGet()` */
  static readonly CalculateEcartTypeEcarttypeListyearGetPath = '/ecarttype/{listyear}';

  /**
   * Calculate Ecart Type.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `calculateEcartTypeEcarttypeListyearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  calculateEcartTypeEcarttypeListyearGet$Response(
    params: {
      listyear: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<EcartsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.CalculateEcartTypeEcarttypeListyearGetPath, 'get');
    if (params) {
      rb.path('listyear', params.listyear, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EcartsResponse>;
      })
    );
  }

  /**
   * Calculate Ecart Type.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `calculateEcartTypeEcarttypeListyearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  calculateEcartTypeEcarttypeListyearGet(
    params: {
      listyear: string;
    },
    context?: HttpContext
  ): Observable<EcartsResponse> {
    return this.calculateEcartTypeEcarttypeListyearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<EcartsResponse>): EcartsResponse => r.body)
    );
  }

  /** Path part for operation `getRegionRegYearGet()` */
  static readonly GetRegionRegYearGetPath = '/reg/{year}';

  /**
   * Get Region.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRegionRegYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRegionRegYearGet$Response(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopRegionsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetRegionRegYearGetPath, 'get');
    if (params) {
      rb.path('year', params.year, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopRegionsResponse>;
      })
    );
  }

  /**
   * Get Region.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRegionRegYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRegionRegYearGet(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<TopRegionsResponse> {
    return this.getRegionRegYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopRegionsResponse>): TopRegionsResponse => r.body)
    );
  }

  /** Path part for operation `getGlobalsalesGlobalsalesYearGet()` */
  static readonly GetGlobalsalesGlobalsalesYearGetPath = '/globalsales/{year}';

  /**
   * Get Globalsales.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGlobalsalesGlobalsalesYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGlobalsalesGlobalsalesYearGet$Response(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopPaysResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetGlobalsalesGlobalsalesYearGetPath, 'get');
    if (params) {
      rb.path('year', params.year, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopPaysResponse>;
      })
    );
  }

  /**
   * Get Globalsales.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGlobalsalesGlobalsalesYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGlobalsalesGlobalsalesYearGet(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<TopPaysResponse> {
    return this.getGlobalsalesGlobalsalesYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopPaysResponse>): TopPaysResponse => r.body)
    );
  }

  /** Path part for operation `getTopproductsTopproYearGet()` */
  static readonly GetTopproductsTopproYearGetPath = '/toppro/{year}';

  /**
   * Get Topproducts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopproductsTopproYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopproductsTopproYearGet$Response(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopprosResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetTopproductsTopproYearGetPath, 'get');
    if (params) {
      rb.path('year', params.year, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopprosResponse>;
      })
    );
  }

  /**
   * Get Topproducts.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTopproductsTopproYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopproductsTopproYearGet(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<TopprosResponse> {
    return this.getTopproductsTopproYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopprosResponse>): TopprosResponse => r.body)
    );
  }

  /** Path part for operation `getComparaisonClYearGet()` */
  static readonly GetComparaisonClYearGetPath = '/cl/{year}';

  /**
   * Get Comparaison.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getComparaisonClYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComparaisonClYearGet$Response(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopclsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetComparaisonClYearGetPath, 'get');
    if (params) {
      rb.path('year', params.year, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopclsResponse>;
      })
    );
  }

  /**
   * Get Comparaison.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getComparaisonClYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getComparaisonClYearGet(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<TopclsResponse> {
    return this.getComparaisonClYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopclsResponse>): TopclsResponse => r.body)
    );
  }

  /** Path part for operation `getTransctionsTransctionsCodeclientStartDateEndDateGet()` */
  static readonly GetTransctionsTransctionsCodeclientStartDateEndDateGetPath = '/transctions/{codeclient}/{start_date}/{end_date}';

  /**
   * Get Transctions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTransctionsTransctionsCodeclientStartDateEndDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransctionsTransctionsCodeclientStartDateEndDateGet$Response(
    params: {
      codeclient: number;
      start_date: string;
      end_date: string;
      article_code?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TransactionsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetTransctionsTransctionsCodeclientStartDateEndDateGetPath, 'get');
    if (params) {
      rb.path('codeclient', params.codeclient, {});
      rb.path('start_date', params.start_date, {});
      rb.path('end_date', params.end_date, {});
      rb.query('article_code', params.article_code, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TransactionsResponse>;
      })
    );
  }

  /**
   * Get Transctions.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTransctionsTransctionsCodeclientStartDateEndDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransctionsTransctionsCodeclientStartDateEndDateGet(
    params: {
      codeclient: number;
      start_date: string;
      end_date: string;
      article_code?: number;
    },
    context?: HttpContext
  ): Observable<TransactionsResponse> {
    return this.getTransctionsTransctionsCodeclientStartDateEndDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TransactionsResponse>): TransactionsResponse => r.body)
    );
  }

  /** Path part for operation `getTransTransCodeclientStartDateGet()` */
  static readonly GetTransTransCodeclientStartDateGetPath = '/trans/{codeclient}/{start_date}';

  /**
   * Get Trans.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTransTransCodeclientStartDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransTransCodeclientStartDateGet$Response(
    params: {
      codeclient: number;
      start_date: string;
      article_code?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TransactionsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetTransTransCodeclientStartDateGetPath, 'get');
    if (params) {
      rb.path('codeclient', params.codeclient, {});
      rb.path('start_date', params.start_date, {});
      rb.query('article_code', params.article_code, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TransactionsResponse>;
      })
    );
  }

  /**
   * Get Trans.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTransTransCodeclientStartDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTransTransCodeclientStartDateGet(
    params: {
      codeclient: number;
      start_date: string;
      article_code?: number;
    },
    context?: HttpContext
  ): Observable<TransactionsResponse> {
    return this.getTransTransCodeclientStartDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TransactionsResponse>): TransactionsResponse => r.body)
    );
  }

  /** Path part for operation `getCustsTopcusStartDateEndDateGet()` */
  static readonly GetCustsTopcusStartDateEndDateGetPath = '/topcus/{start_date}/{end_date}';

  /**
   * Get Custs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustsTopcusStartDateEndDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustsTopcusStartDateEndDateGet$Response(
    params: {
      start_date: string;
      end_date: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopCusrsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetCustsTopcusStartDateEndDateGetPath, 'get');
    if (params) {
      rb.path('start_date', params.start_date, {});
      rb.path('end_date', params.end_date, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopCusrsResponse>;
      })
    );
  }

  /**
   * Get Custs.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustsTopcusStartDateEndDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustsTopcusStartDateEndDateGet(
    params: {
      start_date: string;
      end_date: string;
    },
    context?: HttpContext
  ): Observable<TopCusrsResponse> {
    return this.getCustsTopcusStartDateEndDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopCusrsResponse>): TopCusrsResponse => r.body)
    );
  }

  /** Path part for operation `getCustomersTopcustomersStartDateGet()` */
  static readonly GetCustomersTopcustomersStartDateGetPath = '/topcustomers/{start_date}';

  /**
   * Get Customers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomersTopcustomersStartDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomersTopcustomersStartDateGet$Response(
    params: {
      start_date: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopCustomersResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetCustomersTopcustomersStartDateGetPath, 'get');
    if (params) {
      rb.path('start_date', params.start_date, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopCustomersResponse>;
      })
    );
  }

  /**
   * Get Customers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustomersTopcustomersStartDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomersTopcustomersStartDateGet(
    params: {
      start_date: string;
    },
    context?: HttpContext
  ): Observable<TopCustomersResponse> {
    return this.getCustomersTopcustomersStartDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopCustomersResponse>): TopCustomersResponse => r.body)
    );
  }

  /** Path part for operation `getClientsTopclientsYearGet()` */
  static readonly GetClientsTopclientsYearGetPath = '/topclients/{year}';

  /**
   * Get Clients.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getClientsTopclientsYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClientsTopclientsYearGet$Response(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopClientsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetClientsTopclientsYearGetPath, 'get');
    if (params) {
      rb.path('year', params.year, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopClientsResponse>;
      })
    );
  }

  /**
   * Get Clients.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getClientsTopclientsYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClientsTopclientsYearGet(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<TopClientsResponse> {
    return this.getClientsTopclientsYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopClientsResponse>): TopClientsResponse => r.body)
    );
  }

  /** Path part for operation `getProductsTopproductsStartDateGet()` */
  static readonly GetProductsTopproductsStartDateGetPath = '/topproducts/{start_date}';

  /**
   * Get Products.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsTopproductsStartDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsTopproductsStartDateGet$Response(
    params: {
      start_date: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopproductsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetProductsTopproductsStartDateGetPath, 'get');
    if (params) {
      rb.path('start_date', params.start_date, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopproductsResponse>;
      })
    );
  }

  /**
   * Get Products.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductsTopproductsStartDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsTopproductsStartDateGet(
    params: {
      start_date: string;
    },
    context?: HttpContext
  ): Observable<TopproductsResponse> {
    return this.getProductsTopproductsStartDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopproductsResponse>): TopproductsResponse => r.body)
    );
  }

  /** Path part for operation `getPrsTopprsStartDateEndDateGet()` */
  static readonly GetPrsTopprsStartDateEndDateGetPath = '/topprs/{start_date}/{end_date}';

  /**
   * Get Prs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPrsTopprsStartDateEndDateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrsTopprsStartDateEndDateGet$Response(
    params: {
      start_date: string;
      end_date: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopproductsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetPrsTopprsStartDateEndDateGetPath, 'get');
    if (params) {
      rb.path('start_date', params.start_date, {});
      rb.path('end_date', params.end_date, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopproductsResponse>;
      })
    );
  }

  /**
   * Get Prs.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPrsTopprsStartDateEndDateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPrsTopprsStartDateEndDateGet(
    params: {
      start_date: string;
      end_date: string;
    },
    context?: HttpContext
  ): Observable<TopproductsResponse> {
    return this.getPrsTopprsStartDateEndDateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopproductsResponse>): TopproductsResponse => r.body)
    );
  }

  /** Path part for operation `getProduitsTopproduitsYearGet()` */
  static readonly GetProduitsTopproduitsYearGetPath = '/topproduits/{year}';

  /**
   * Get Produits.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProduitsTopproduitsYearGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProduitsTopproduitsYearGet$Response(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TopproductsResponse>> {
    const rb = new RequestBuilder(this.rootUrl, ChartsService.GetProduitsTopproduitsYearGetPath, 'get');
    if (params) {
      rb.path('year', params.year, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopproductsResponse>;
      })
    );
  }

  /**
   * Get Produits.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProduitsTopproduitsYearGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProduitsTopproduitsYearGet(
    params: {
      year: number;
    },
    context?: HttpContext
  ): Observable<TopproductsResponse> {
    return this.getProduitsTopproduitsYearGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TopproductsResponse>): TopproductsResponse => r.body)
    );
  }

}
