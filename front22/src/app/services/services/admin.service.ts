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

import { UserOut } from '../models/user-out';

@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUsersUsersGet()` */
  static readonly GetUsersUsersGetPath = '/users';

  /**
   * Get Users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersUsersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersUsersGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<UserOut>>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.GetUsersUsersGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserOut>>;
      })
    );
  }

  /**
   * Get Users.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersUsersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersUsersGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<UserOut>> {
    return this.getUsersUsersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserOut>>): Array<UserOut> => r.body)
    );
  }

  /** Path part for operation `updateValidateaccountUserIdPut()` */
  static readonly UpdateValidateaccountUserIdPutPath = '/validateaccount/{user_id}';

  /**
   * Update.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateValidateaccountUserIdPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateValidateaccountUserIdPut$Response(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.UpdateValidateaccountUserIdPutPath, 'put');
    if (params) {
      rb.path('user_id', params.user_id, {});
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
   * Update.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateValidateaccountUserIdPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateValidateaccountUserIdPut(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.updateValidateaccountUserIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `updateInvalidateaccountUserIdPut()` */
  static readonly UpdateInvalidateaccountUserIdPutPath = '/invalidateaccount/{user_id}';

  /**
   * Update.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInvalidateaccountUserIdPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInvalidateaccountUserIdPut$Response(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, AdminService.UpdateInvalidateaccountUserIdPutPath, 'put');
    if (params) {
      rb.path('user_id', params.user_id, {});
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
   * Update.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateInvalidateaccountUserIdPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInvalidateaccountUserIdPut(
    params: {
      user_id: number;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.updateInvalidateaccountUserIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
