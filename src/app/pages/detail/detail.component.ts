import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
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

  receiveParameters() {
    const params = this.router.getCurrentNavigation()?.extras.state;
    if(params){
      this.movieInfo = params['movie'];
      this.baseURL = params['baseURL'];
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
    console.log(response.data);
  }
}
