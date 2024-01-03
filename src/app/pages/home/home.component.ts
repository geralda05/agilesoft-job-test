
import {Component} from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { NewMoviesCarouselComponent } from '../../components/new-movies-carousel/new-movies-carousel.component';
import { PopularMoviesListComponent } from '../../components/popular-movies-list/popular-movies-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NewMoviesCarouselComponent, SidebarComponent, PopularMoviesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(public data: DataService) {

  }
  
}
