import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, SidebarComponent],
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idMovie');
    if(typeof id === 'string'){
      this.movieId = id;
    }
    
    this.getDetailMovie()
  }

  public async getDetailMovie() {
    const response = await this.data.getDetailMovie(this.movieId)
    if(response.data) {
      this.actors = response.data.data;
      console.log(this.actors);
      this.actorsBase = response.data.imageBaseUrl;
    }
    console.log(response.data);
  }
}
