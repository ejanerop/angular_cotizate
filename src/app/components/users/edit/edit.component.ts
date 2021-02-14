import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form : FormGroup;
  id : string | null = '2';
  new : boolean = true;
  loading : boolean = true;
  user : Client = new Client(0, '', '');

  constructor(private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private service : ClientsService) {
    this.form = this.fb.group({
      'nick' : ['', Validators.required],
      'ip_address' : ['', [Validators.required, Validators.pattern('10\.66\.67\.(25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9])')]]
    });
  }

  ngOnInit(): void {
   this.id = this.route.snapshot.paramMap.get('id');
   if (this.id == 'new' || this.id == null ) {
     this.loading = false;
   } else if(Number(this.id) != null && Number(this.id) > 0) {
      this.service.getClient(this.id).subscribe((resp : any) => {
        this.user.id = resp.id;
        this.user.nick = resp.nick;
        this.user.ip_address = resp.ip_address;
        this.loading = false;
        this.new = false;
        this.reset();
      });
   }else{
    this.router.navigateByUrl('/users');
   }
  }


  public get invalidNick() {
    return this.form.get('nick')?.invalid && this.form.get('nick')?.touched;
  }

  public get invalidIpAddress() {
    return this.form.get('ip_address')?.invalid && this.form.get('ip_address')?.touched;
  }

  reset() {

    this.form.reset({
      'nick' : this.user.nick,
      'ip_address' : this.user.ip_address
    });
  }


  save() {
    console.log(this.form.value);
    console.log(this.form.status);

    if (this.form.invalid) {
      this.form.get('nick')?.markAsTouched();
      this.form.get('ip_address')?.markAsTouched();
      return;
    }
    const old_ip = this.user.ip_address;

    this.user.nick = this.form.value.nick;
    this.user.ip_address = this.form.value.ip_address;

    this.service.editUser(this.user).subscribe( (resp : any)=> {
      console.log(resp)
      if (resp.status == 204) {
        this.router.navigateByUrl('/users');
        this.fireToast(true, 'Usuario modificado con éxito!');
      }
      if (resp.status == 201) {
        this.router.navigateByUrl('/users');
        this.fireToast(true, 'Usuario creado con éxito!');
      }

    }, (error : any)=> {
      console.log(error)
      if (error.status == 422) {
        Swal.fire({
          icon : 'error',
          title : 'IP existente!',
          text : 'La dirección IP introducida ya existe.',
          timer : 4000
        });
        this.form.reset({
          'nick' : this.user.nick,
          'ip_address' : old_ip
        });
        this.user.ip_address = old_ip;
        return;
      }
    });

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
