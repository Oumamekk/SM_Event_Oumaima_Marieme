import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {

  constructor(private router: Router) {
  }

  onSearch(form: NgForm): void {
    this.router.navigate(['/search', form.value.search]);
  }
}
