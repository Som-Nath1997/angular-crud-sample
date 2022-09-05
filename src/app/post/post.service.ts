import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('https://crudcrud.com/api/e6b3939112b64880879559ced591cd11/unicorns')
  }

  create(post:any): Observable<Post> {
    return this.httpClient.post<Post>('https://crudcrud.com/api/e6b3939112b64880879559ced591cd11/unicorns',(post))
  }

  find(id:number , firstname :string ): Observable<Post> {
    return this.httpClient.get<Post>('https://crudcrud.com/api/e6b3939112b64880879559ced591cd11/unicorns/' + id)
  }

  update(id: number, post: any): Observable<Post> {
    return this.httpClient.put<Post>('https://crudcrud.com/api/e6b3939112b64880879559ced591cd11/unicorns/' + id,(post))
  }

}
