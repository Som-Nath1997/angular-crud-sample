import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  public iconUrl:any


  constructor(public postService: PostService ,
    private sanitizer: DomSanitizer ) {
  }
  message: boolean = false;

  ngOnInit(): void {

    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
    // this.iconUrl = this.sanitizer.bypassSecurityTrustUrl( window .URL.createObjectURL(this.posts));
  }
  remove() {
    // auto close alert if required
    this.message = false;
  }
}
