
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent {
    isLoading = false;
    errorMessage: string = null;

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }


    onSubmit(form: NgForm) {
        this.errorMessage = null;
        console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = false;
        this.authService.signup(email, password).subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
            },
            errorMessage => {
                console.log(errorMessage);
                this.errorMessage = errorMessage;
                this.isLoading = false;
            }
        );
        form.reset();
    }

    switchToLogin() {
        this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
    }
}
