import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingMessageComponent } from '../loading-message/loading-message.component';
import { WarningMessageComponent } from '../warning-message/warning-message.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'popular-movies-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, LoadingMessageComponent, WarningMessageComponent, RouterLink, RouterLinkActive],
  templateUrl: './popular-movies-list.component.html',
  styleUrl: './popular-movies-list.component.scss'
})

export class PopularMoviesListComponent {
  public popularMovies : any = []
  public popularPage = 0;
  public baseURL = '';
  public loading = false;
  public error = false;

  constructor(public data: DataService) {}

  ngOnInit() {
    this.getPopularMovies()
  }

  public async getPopularMovies() {

    try {

      if(this.popularPage === 0){
        this.loading = true; 
      }
  
      this.popularPage++;
      this.error = false;
  
      const response = await this.data.getPopularMovies(this.popularPage)
      
      this.popularMovies = this.popularMovies.concat(response.data.data);
      this.baseURL = response.data.imageBaseUrl;
      this.loading = false;

    } catch (error) {

      this.loading = false;
      this.error = true;

    }
  
  }

  public onScroll () {
    this.getPopularMovies();
  }

  public formatSlide(value : any) {
    if(value){
      return `background-image: url('${this.baseURL+value.backdrop_path}'); background-position: center;`
    } else {
      return ''
    }
  }

}
