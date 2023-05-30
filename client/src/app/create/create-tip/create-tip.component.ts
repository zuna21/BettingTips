import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { Package } from 'src/app/_interfaces/package';
import { Tip } from 'src/app/_interfaces/tip';
import { PackageService } from 'src/app/_services/package.service';
import { TipService } from 'src/app/_services/tip.service';

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.component.html',
  styleUrls: ['./create-tip.component.css']
})
export class CreateTipComponent implements OnInit {
  private tips = new BehaviorSubject<Tip[]>([]);
  tips$ = this.tips.asObservable();
  createTipForm: FormGroup;

  constructor(
    private tipService: TipService,
    public packageService: PackageService,
    private fb: FormBuilder
  ) {}



  ngOnInit(): void {
    this.loadTips();
    this.initializeForm();
  }

  initializeForm() {
    this.createTipForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      packages: this.fb.array([])
    });
  }

  private setTips(newTips: Tip[]) {
    this.tips.next(newTips)
  }

  loadTips() {
    this.tipService.getAllActiveTips().pipe(take(1))
      .subscribe({
        next: fetchedTips => this.setTips(fetchedTips)
      });
  }

  onCheckPackage(e, selectedPackage: Package) {
    console.log(e.target.checked);
    console.log(selectedPackage);
  }

}
