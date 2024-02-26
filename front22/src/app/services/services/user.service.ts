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

import { Profil } from '../models/profil';
import { TodOut } from '../models/tod-out';
import { TodoDbIn } from '../models/todo-db-in';
import { TodoList } from '../models/todo-list';
import { TodoUpdate } from '../models/todo-update';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `readUsersUsersIdGet()` */
  static readonly ReadUsersUsersIdGetPath = '/Users/{id}';

  /**
   * Read Users.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readUsersUsersIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUsersUsersIdGet$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Profil>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.ReadUsersUsersIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Profil>;
      })
    );
  }

  /**
   * Read Users.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readUsersUsersIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUsersUsersIdGet(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<Profil> {
    return this.readUsersUsersIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Profil>): Profil => r.body)
    );
  }

  /** Path part for operation `createTodoTodoPost()` */
  static readonly CreateTodoTodoPostPath = '/todo/';

  /**
   * Create Todo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTodoTodoPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTodoTodoPost$Response(
    params: {
      body: TodoDbIn
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.CreateTodoTodoPostPath, 'post');
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
   * Create Todo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTodoTodoPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTodoTodoPost(
    params: {
      body: TodoDbIn
    },
    context?: HttpContext
  ): Observable<any> {
    return this.createTodoTodoPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `readTodosTodoGet()` */
  static readonly ReadTodosTodoGetPath = '/TODO';

  /**
   * Read Todos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readTodosTodoGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTodosTodoGet$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TodoList>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.ReadTodosTodoGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TodoList>;
      })
    );
  }

  /**
   * Read Todos.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readTodosTodoGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTodosTodoGet(
    params?: {
    },
    context?: HttpContext
  ): Observable<TodoList> {
    return this.readTodosTodoGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TodoList>): TodoList => r.body)
    );
  }

  /** Path part for operation `readTodoByIdTodoIdGet()` */
  static readonly ReadTodoByIdTodoIdGetPath = '/TODO/{id}';

  /**
   * Read Todo By Id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readTodoByIdTodoIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTodoByIdTodoIdGet$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TodOut>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.ReadTodoByIdTodoIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TodOut>;
      })
    );
  }

  /**
   * Read Todo By Id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readTodoByIdTodoIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTodoByIdTodoIdGet(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<TodOut> {
    return this.readTodoByIdTodoIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<TodOut>): TodOut => r.body)
    );
  }

  /** Path part for operation `deleteTodoTodoIdDelete()` */
  static readonly DeleteTodoTodoIdDeletePath = '/todo/{id}';

  /**
   * Delete Todo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTodoTodoIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTodoTodoIdDelete$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.DeleteTodoTodoIdDeletePath, 'delete');
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
   * Delete Todo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTodoTodoIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTodoTodoIdDelete(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.deleteTodoTodoIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `completeTodoCompleteIdPut()` */
  static readonly CompleteTodoCompleteIdPutPath = '/complete/{id}';

  /**
   * Complete Todo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeTodoCompleteIdPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeTodoCompleteIdPut$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<any>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.CompleteTodoCompleteIdPutPath, 'put');
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
   * Complete Todo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeTodoCompleteIdPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeTodoCompleteIdPut(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<any> {
    return this.completeTodoCompleteIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `updateTodoUpdateIdPut()` */
  static readonly UpdateTodoUpdateIdPutPath = '/update/{id}';

  /**
   * Update Todo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTodoUpdateIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTodoUpdateIdPut$Response(
    params: {
      id: number;
      body: TodoUpdate
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<TodoUpdate>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UpdateTodoUpdateIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TodoUpdate>;
      })
    );
  }

  /**
   * Update Todo.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTodoUpdateIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTodoUpdateIdPut(
    params: {
      id: number;
      body: TodoUpdate
    },
    context?: HttpContext
  ): Observable<TodoUpdate> {
    return this.updateTodoUpdateIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<TodoUpdate>): TodoUpdate => r.body)
    );
  }

}
