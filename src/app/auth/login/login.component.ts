
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    isLoading = false;
    errorMessage: string = null;

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        this.authService.login(email, password).subscribe(
            resData => {
                this.isLoading = false;
                this.router.navigate(['/home']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.errorMessage = errorMessage;
                this.isLoading = false;
            }
        );
        form.reset();
    }

    switchToSignUp() {
        this.router.navigate(['../signup'], { relativeTo: this.activatedRoute });
    }
}
