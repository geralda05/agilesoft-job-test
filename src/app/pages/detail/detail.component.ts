import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { WarningMessageComponent } from '../../components/warning-message/warning-message.component';
import { LoadingMessageComponent } from '../../components/loading-message/loading-message.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, SidebarComponent, WarningMessageComponent, LoadingMessageComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  constructor(private route: ActivatedRoute, public router: Router, public data: DataService) {
    this.receiveParameters()
  }

  public movieInfo : {[k: string]: any} = {};
  public movieId : string = '';
  public baseURL: string = '';
  public actors : any = [];
  public actorsBase : string = '';
  public loading = false;
  public error = false;

  receiveParameters() {
    const params = this.router.getCurrentNavigation()?.extras.state;
    if(params){
      this.movieInfo = params['movie'];
      this.baseURL = params['baseURL'];
    }
  }

  public formatSlide(value : any) {
    if(value){
      return `background-image: url('${this.actorsBase+value.profile_path}'); background-position: center;`
    } else {
      return ''
    }
  }

  public handleActors(index: number) {
    return  window.innerWidth < 700 ? true : (index === 0 || ( (index) % 3 ) == 0)
  }

  public getWidth () {
    return window.innerWidth > 700
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idMovie');
    if(typeof id === 'string'){
      this.movieId = id;
    }
    
    this.getDetailMovie()
  }


  public async getDetailMovie() {
    try {
      this.loading = true;
      const response = await this.data.getDetailMovie(this.movieId)
      this.actors = response.data.data;
      this.actorsBase = response.data.imageBaseUrl;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }
  }
}
