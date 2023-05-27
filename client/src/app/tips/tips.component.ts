import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, mergeMap } from 'rxjs';
import { Package } from '../_interfaces/package';
import { PackageService } from '../_services/package.service';
import { TipService } from '../_services/tip.service';
import { Tip } from '../_interfaces/tip';

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
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,
    private tipService: TipService
  ) {}

  ngOnInit(): void {
    this.getPackage();
    this.getPackageTips();
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
    this.packageSubscription.unsubscribe();
    this.tipsSubscription.unsubscribe();
  }
}
