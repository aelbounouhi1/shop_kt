import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from "primeng/inputtext";
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from "primeng/button";
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  standalone: true,
  imports: [InputTextModule, NgIf, FloatLabelModule, ReactiveFormsModule, EditorModule, ButtonModule, ToastModule]
})

export class ContactFormComponent {
  form!: FormGroup;
  fb = inject(FormBuilder);
  messageService = inject(MessageService)

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  get email() {
    return this.form.controls['email'];
  }

  get message() {
    return this.form.controls['message'];
  }

  submit() {
    this.form.reset();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Demande de contact envoyée avec succès' });
  }
}
