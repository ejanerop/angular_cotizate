import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { New } from 'src/app/models/new.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  form : FormGroup;
  id : string | null = '1';
  isNew : boolean = true;
  loading : boolean = true;
  new : New = new New(0, '', '', '');
  url : string | ArrayBuffer | null | undefined = '';

  constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : ClientsService) {
    this.form = this.fb.group({
      'id' : ['', Validators.required],
      'title' : ['', Validators.required],
      'description' : ['', Validators.required],
      'image' : [null],
      'image2' : [null]

    });
    this.form.get('title')?.valueChanges.subscribe(val => {
      this.new.title = val;
    });
    this.form.get('description')?.valueChanges.subscribe(val => {
      this.new.description = val;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == 'new' || this.id == null ) {
      this.new.id = 0;
      this.loading = false;
      this.reset();
      this.form.get('image')?.setValidators(Validators.required);
    } else if(Number(this.id) != null && Number(this.id) > 0) {
      this.service.getNew(this.id).subscribe((resp : any) => {
        this.new.id = resp.id;
        this.new.title = resp.title;
        this.new.description = resp.description;
        this.new.src = resp.src;
        this.loading = false;
        this.isNew = false;
        this.reset();
      });
    }else{
      this.router.navigateByUrl('/users');
    }

  }

  public invalid(control : string){
    return this.form.get(control)?.invalid && this.form.get(control)?.touched;
  }

  reset() {

    this.form.reset({
      'id' : this.new.id.toString(),
      'title' : this.new.title,
      'description' : this.new.description,
      'image' : null,
    });
  }

  save() {

    if (this.form.invalid) {
      this.form.get('title')?.markAsTouched();
      this.form.get('description')?.markAsTouched();
      this.form.get('image')?.markAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('id', this.new.id.toString());
    formData.append('title', this.new.title);
    formData.append('description', this.new.description);
    formData.append('image', this.form.get('image2')?.value);

    this.service.editNew(formData).subscribe((resp : any) => {

      if (resp.status == 204) {
        this.router.navigateByUrl('/news');
        this.fireToast(true, 'Noticia modificada con éxito!');
      }
      if (resp.status == 201) {
        this.router.navigateByUrl('/news');
        this.fireToast(true, 'Noticia creada con éxito!');
      }
    });

  }

  imagePath(portalNew : New){
    return this.service.getImagePath(portalNew);
  }


  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
      const file = event.target.files[0];
      this.form.patchValue({
        image2: file
      });
    }
  }

  private fireToast(success : boolean , text : string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: success ? 'success' : 'error',
      title: text
    });
  }
}
