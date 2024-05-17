import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [SearchbarComponent, MatButtonModule],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.scss'
})
export class FrontpageComponent {

}
