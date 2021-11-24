import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
 

  constructor(public postService: PostService , ) {
  }
  message: boolean = false;

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deletePost(id: number, firstname: string) {
    if (
      confirm(
        'Do you really want to delete :  Id is => ' +
          id +
          ' First-Name =>' +
          firstname
      )
    ) {
      this.postService.delete(id).subscribe((res) => {
        this.posts = this.posts.filter((item) => item.id !== id);
        if ((this.message = true)) {
          setTimeout(() => this.remove(), 3000);
        
        console.log('Post deleted successfully!');
        this.message = true;
        }
      });
    }
  }
  remove() {
    // auto close alert if required
    this.message = false;
  }
}
