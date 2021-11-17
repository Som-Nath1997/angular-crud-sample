import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://localhost:3000";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/posts/')
  }
   
  create(post:any): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
  }  
   
  find(id:number , firstname :string ): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/posts/' + id)
  }
   
  update(id: number, post: any): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
  }
   
  delete(id: number){
    return this.httpClient.delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
  }
  
}