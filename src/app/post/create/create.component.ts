import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  hobbies!: FormArray;
  public dataget:any
  products: any = (data as any).default;
  @ViewChild('fileInput') el!: ElementRef;
  public imageUrl! : SafeResourceUrl;
  public urlToBlob:any

  constructor(public postService: PostService, private router: Router
    ,private cd: ChangeDetectorRef , private sanitizer: DomSanitizer) {}
  message: boolean = false;

  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      dob: new FormControl ('',[ Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    });

  }
  get f() {
    return this.form.controls;
  }
  public upload(list:any) {
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
    this.postService.create(channels[0]).subscribe((res) => {
      console.log(res)
      this.message = true;
      console.log('Employee created successfully!');
      this.form.reset({});
      this.form.disable();
      // this.router.navigateByUrl('post/index');
    });
  }
  remove() {
    this.message = false;
    this.router.navigateByUrl('post/index');
  }


change(event:any){

  console.log(event.target.value)
}


}
