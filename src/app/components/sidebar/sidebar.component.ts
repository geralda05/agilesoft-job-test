import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit, ContentChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'Sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  @ContentChild(TemplateRef) public inputElement: TemplateRef<any>;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getUserData()
  }

  public async getUserData () {
    await this.authService.userInfo()
  }

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 3}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
