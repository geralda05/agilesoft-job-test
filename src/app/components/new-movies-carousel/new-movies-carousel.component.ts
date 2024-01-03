import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingMessageComponent } from '../loading-message/loading-message.component';
import { WarningMessageComponent } from '../warning-message/warning-message.component';

@Component({
  selector: 'new-movies-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterLink, RouterLinkActive, LoadingMessageComponent, WarningMessageComponent],
  templateUrl: './new-movies-carousel.component.html',
  styleUrl: './new-movies-carousel.component.scss'
})
export class NewMoviesCarouselComponent {
  public page = 0;
  public images : any = [];
  public baseURL = '';
  public loading = false;
  public error = false;

  constructor(public data: DataService) {}

  ngOnInit() {
    this.getNewMovies()
  }

  public testEvent(event:any){
    if(event.current === `ngb-slide-${this.images.length-2}`){
      this.getNewMovies()
    }
  }

  public async getNewMovies() {
    try{

      if(this.page === 0){
       this.loading = true; 
      }

      this.page++;
      this.error = false;

      const response = await this.data.getNewMovies(this.page)
      
      this.images = this.images.concat(response.data.data);
      this.baseURL = response.data.imageBaseUrl;
      this.loading = false;

    }catch(error){

      this.loading = false;
      this.error = true;

    }

  }

  public formatSlide(value : any) {
    if(value){
      return `background-image: url('${this.baseURL+value.backdrop_path}'); background-position: center;`
    } else {
      return ''
    }
  }
}
