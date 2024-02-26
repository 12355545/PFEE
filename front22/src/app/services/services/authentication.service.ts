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

import { Login } from '../models/login';
import { LoginResponse } from '../models/login-response';
import { NamepasswordChangeRequest } from '../models/namepassword-change-request';
import { PasswordChangeRequest } from '../models/password-change-request';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';
import { ResponseModel } from '../models/response-model';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerRegisterPost()` */
  static readonly RegisterRegisterPostPath = '/register/';

  /**
   * Register.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerRegisterPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerRegisterPost$Response(
    params: {
      body: User
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ResponseModel>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.RegisterRegisterPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResponseModel>;
      })
    );
  }

  /**
   * Register.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerRegisterPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerRegisterPost(
    params: {
      body: User
    },
    context?: HttpContext
  ): Observable<ResponseModel> {
    return this.registerRegisterPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<ResponseModel>): ResponseModel => r.body)
    );
  }

  /** Path part for operation `loginSignUpPost()` */
  static readonly LoginSignUpPostPath = '/sign-up';

  /**
   * Login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginSignUpPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginSignUpPost$Response(
    params: {
      body: Login
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LoginResponse>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.LoginSignUpPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * Login.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginSignUpPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginSignUpPost(
    params: {
      body: Login
    },
    context?: HttpContext
  ): Observable<LoginResponse> {
    return this.loginSignUpPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
    );
  }

  /** Path part for operation `changePasswordChangePasswordIdPost()` */
  static readonly ChangePasswordChangePasswordIdPostPath = '/change-password/{id}';

  /**
   * Change Password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePasswordChangePasswordIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePasswordChangePasswordIdPost$Response(
    params: {
      id: number;
      body: PasswordChangeRequest
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.ChangePasswordChangePasswordIdPostPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Change Password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePasswordChangePasswordIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePasswordChangePasswordIdPost(
    params: {
      id: number;
      body: PasswordChangeRequest
    },
    context?: HttpContext
  ): Observable<any> {
    return this.changePasswordChangePasswordIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `changePasswordChangeNameEmailIdPost()` */
  static readonly ChangePasswordChangeNameEmailIdPostPath = '/change-name-email/{id}';

  /**
   * Change Password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePasswordChangeNameEmailIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePasswordChangeNameEmailIdPost$Response(
    params: {
      id: number;
      body: NamepasswordChangeRequest
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.ChangePasswordChangeNameEmailIdPostPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
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
   * Change Password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePasswordChangeNameEmailIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePasswordChangeNameEmailIdPost(
    params: {
      id: number;
      body: NamepasswordChangeRequest
    },
    context?: HttpContext
  ): Observable<any> {
    return this.changePasswordChangeNameEmailIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `resetRequestRequestPost()` */
  static readonly ResetRequestRequestPostPath = '/request';

  /**
   * Reset Request.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetRequestRequestPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetRequestRequestPost$Response(
    params: {
      body: PasswordResetRequest
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.ResetRequestRequestPostPath, 'post');
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
   * Reset Request.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetRequestRequestPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetRequestRequestPost(
    params: {
      body: PasswordResetRequest
    },
    context?: HttpContext
  ): Observable<any> {
    return this.resetRequestRequestPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `resetResetPut()` */
  static readonly ResetResetPutPath = '/reset';

  /**
   * Reset.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetResetPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetResetPut$Response(
    params: {
      token: string;
      body: PasswordReset
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.ResetResetPutPath, 'put');
    if (params) {
      rb.query('token', params.token, {});
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
   * Reset.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetResetPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetResetPut(
    params: {
      token: string;
      body: PasswordReset
    },
    context?: HttpContext
  ): Observable<any> {
    return this.resetResetPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
