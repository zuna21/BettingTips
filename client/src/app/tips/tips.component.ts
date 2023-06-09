import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { Package } from '../_interfaces/package';
import { PackageService } from '../_services/package.service';
import { TipService } from '../_services/tip.service';
import { Tip } from '../_interfaces/tip';
import { UserService } from '../_services/user.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit, OnDestroy {
  packageId: string = '';
  private package = new BehaviorSubject<Package | null>(null);
  private tips = new BehaviorSubject<Tip[]>([])
  package$ = this.package.asObservable();
  tips$ = this.tips.asObservable();
  packageSubscription: Subscription;
  tipsSubscription: Subscription;
  userServiceSubscription: Subscription;
  gettingData: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,
    private tipService: TipService,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserSubscription();
  }

  checkUserSubscription() {
    this.userServiceSubscription = this.userService.checkUserSubscription()
      .subscribe({
        next: user => {
          localStorage.removeItem('userToken');
          localStorage.setItem('userToken', JSON.stringify(user.token));
          this.accountService.setUser(user);
          if (user.hasSubscription || user.isAdmin) {
            this.gettingData = true;
            this.getPackage();
            this.getPackageTips();
          } else {
            this.router.navigateByUrl('/waiting');
          }
        }
      });
  }

  getPackage() {
    this.packageSubscription = this.activatedRoute.paramMap.pipe(
      mergeMap((resp) => this.packageService.getPackageById(resp.get('id')))
    ).subscribe({
      next: (resp: Package) => this.package.next(resp)
    });
  }

  getPackageTips() {
    this.tipsSubscription = this.activatedRoute.paramMap.pipe(
      mergeMap((resp) => this.tipService.getTipsByPackageId(resp.get('id')))
    ).subscribe({
      next: (resp: Tip[]) => this.tips.next(resp)
    });
  }

  ngOnDestroy(): void {
    if (this.gettingData) {
      this.packageSubscription.unsubscribe();
      this.tipsSubscription.unsubscribe();
    }
    this.userServiceSubscription.unsubscribe();
  }
}
