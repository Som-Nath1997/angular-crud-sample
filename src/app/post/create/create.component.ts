import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  hobbies!: FormArray;

  constructor(public postService: PostService, private router: Router) {}
  message: boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      jobtitle: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      address: new FormControl('', Validators.required),
      hobbies: new FormArray([
        
      ]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res) => {
      this.message = true;
      console.log('Employee created successfully!');
      this.form.reset({});
      this.form.disable();
      this.router.navigateByUrl('post/index');
    });
  }
  remove() {
    this.message = false;
    this.router.navigateByUrl('post/index');
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.form.get('hobbies') as FormArray).push(control);
  
  }
  getHobbies() {
    return (this.form.get('hobbies') as FormArray).controls;
  }
  deletehobbies(i:number){
    const control = <FormArray>this.form.controls['hobbies'];
    control.removeAt(i);
  }
  
}
