import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  
  id!: number;
  post!: Post;
  form!: FormGroup;
  firstname!: string;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}
  message: boolean = false;

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id, this.firstname).subscribe((data: Post) => {
      this.post = data;
      this.form.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        jobtitle: data.jobtitle,
        email: data.email,
        address: data.address,
      });
    });

    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      jobtitle: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      address: new FormControl('', Validators.required),
      hobbies: new FormArray([]),
    });
     this.fb.array([
      this.fb.control('')
    ])
  }
  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res) => {
      console.log('Employee updated successfully!');
      this.form.reset({});
      this.form.disable();
      this.message = true;
    });
  }
  remove() {
    this.message = false;
    this.router.navigateByUrl('post/index');
  }
  getHobbies() {
    return (this.form.get('hobbies') as FormArray);
  }
  addAlias() {
    this.hobbies.push(this.fb.control(''));
  }
}
