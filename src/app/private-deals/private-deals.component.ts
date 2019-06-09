import { AuthService } from './../auth/auth.service';
import { DealService } from './../deal.service';
import { Deal } from './../deal';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.scss']
})
export class PrivateDealsComponent implements OnInit, OnDestroy {
  dealsSub: Subscription;
  privateDeals: Deal[];
  error: any;

  constructor(
    public dealService: DealService,
    public authService: AuthService) { }

  ngOnInit() {
    this.dealsSub = this.dealService.getPrivateDeals().subscribe(
      result => this.privateDeals = result,
      err => this.error = err
    );
  }

  ngOnDestroy() {
    this.dealsSub.unsubscribe();
  }

}
