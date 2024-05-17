import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citypage',
  standalone: true,
  imports: [],
  templateUrl: './citypage.component.html',
  styleUrl: './citypage.component.scss'
})
export class CitypageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {}


  data = "";

  ngOnInit(): void {
      this.data = this.route.snapshot.params['query'];
  }
}
