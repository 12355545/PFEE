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

import { BodyUploadImageFsUploadFsIdPost } from '../models/body-upload-image-fs-upload-fs-id-post';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadImageFsUploadFsIdPost()` */
  static readonly UploadImageFsUploadFsIdPostPath = '/uploadFS/{id}';

  /**
   * Upload Image Fs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadImageFsUploadFsIdPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImageFsUploadFsIdPost$Response(
    params: {
      id: number;
      body: BodyUploadImageFsUploadFsIdPost
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UploadImageFsUploadFsIdPostPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
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
   * Upload Image Fs.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadImageFsUploadFsIdPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadImageFsUploadFsIdPost(
    params: {
      id: number;
      body: BodyUploadImageFsUploadFsIdPost
    },
    context?: HttpContext
  ): Observable<any> {
    return this.uploadImageFsUploadFsIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `getImageGetImageIdGet()` */
  static readonly GetImageGetImageIdGetPath = '/getImage/{id}';

  /**
   * Get Image.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageGetImageIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageGetImageIdGet$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.GetImageGetImageIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * Get Image.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getImageGetImageIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageGetImageIdGet(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.getImageGetImageIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `readStatusStatusGet()` */
  static readonly ReadStatusStatusGetPath = '/status';

  /**
   * Read Status.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readStatusStatusGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  readStatusStatusGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.ReadStatusStatusGetPath, 'get');
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
   * Read Status.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readStatusStatusGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readStatusStatusGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<any> {
    return this.readStatusStatusGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
