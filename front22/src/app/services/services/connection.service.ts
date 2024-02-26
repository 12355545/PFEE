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

import { ConnectionRequest } from '../models/connection-request';

@Injectable({ providedIn: 'root' })
export class ConnectionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `connectDatabaseDatabaseNamePut()` */
  static readonly ConnectDatabaseDatabaseNamePutPath = '/database-name';

  /**
   * Connect Database.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `connectDatabaseDatabaseNamePut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  connectDatabaseDatabaseNamePut$Response(
    params: {
      body: ConnectionRequest
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ConnectionService.ConnectDatabaseDatabaseNamePutPath, 'put');
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
   * Connect Database.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `connectDatabaseDatabaseNamePut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  connectDatabaseDatabaseNamePut(
    params: {
      body: ConnectionRequest
    },
    context?: HttpContext
  ): Observable<any> {
    return this.connectDatabaseDatabaseNamePut$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
