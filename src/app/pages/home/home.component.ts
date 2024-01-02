
import {Component, OnInit} from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, SidebarComponent, InfiniteScrollModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(public data: DataService) {

  }

  public onScroll () {
    console.log('scrolled');
    this.getPopularMovies();
  }

  public images : any = []
  public popularMovies : any = []
  public page = 0;
  public popularPage = 0;
  public baseURL = '';
  public formatSlide(value : any) {
    if(value){
      return `background-image: url('${this.baseURL+value.backdrop_path}'); background-position: center;`
    } else {
      return ''
    }
  }

  public testEvent(event:any){
    if(event.current === `ngb-slide-${this.images.length-2}`){
      this.getNewMovies()
    }
  }

  ngOnInit() {
    this.getNewMovies()
    this.getPopularMovies()
  }

  public consoleLOGG(v:any) {
    console.log(v)
  }

  public async getNewMovies() {
    this.page++;
    const response = await this.data.getNewMovies(this.page)
    this.images = this.images.concat(response.data.data);
    this.baseURL = response.data.imageBaseUrl;
    console.log(response.data);
  }

  public async getPopularMovies() {
    this.popularPage++;
    const response = await this.data.getPopularMovies(this.popularPage)
    this.popularMovies = this.popularMovies.concat(response.data.data);
    this.baseURL = response.data.imageBaseUrl;
    console.log(response.data);
  }
}
