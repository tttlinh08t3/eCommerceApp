import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute) {
        // if (!this.location.path() || this.location.path() === '/auth') {
        //     this.router.navigate(['login'], { relativeTo: this.activatedRoute });
        // }
  }

  ngOnInit() {
  }
}
