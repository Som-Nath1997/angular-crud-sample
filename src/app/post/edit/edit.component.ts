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
import * as data from '../country.json'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  products: any = (data as any).default;
  public urlToBlob:any
  public imageUrl! : SafeResourceUrl;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  message: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id, this.firstname).subscribe((data: Post) => {
      console.log( data);
      this.form.patchValue({
        firstname: data.firstname,
        email: data.email,
        dob: data.dob,
        country: data.country,
        imageUpload:data.imageUpload
      });
    });

    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      dob: new FormControl ('',[ Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      imageUpload: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      country: new FormControl('', Validators.required),
    });
     this.fb.array([
      this.fb.control('')
    ])
  }
  get f() {
    return this.form.controls;
  }
  upload(list:any) {
    this.urlToBlob = window.URL.createObjectURL(list.files.item(0))
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.urlToBlob);
    console.log(list.files.item(0).name)
  }
  submit() {
    const channels:any = [
      {
      firstname : this.form.controls.firstname.value,
      country : this.form.controls.country.value,
      email : this.form.controls.email.value,
      dob : this.form.controls.dob.value,
      imageUpload:this.urlToBlob
      }
    ]
    this.postService.update(this.id, channels[0]).subscribe((res) => {
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

}
