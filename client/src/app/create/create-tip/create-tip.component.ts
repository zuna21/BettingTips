import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, take } from 'rxjs';
import { Package } from 'src/app/_interfaces/package';
import { Tip } from 'src/app/_interfaces/tip';
import { TipCreate } from 'src/app/_interfaces/tipCreate';
import { PackageService } from 'src/app/_services/package.service';
import { TipService } from 'src/app/_services/tip.service';

const URL = 'htadkfjas;df';

@Component({
  selector: 'app-create-tip',
  templateUrl: './create-tip.component.html',
  styleUrls: ['./create-tip.component.css']
})
export class CreateTipComponent implements OnInit {
  private tips = new BehaviorSubject<Tip[]>([]);
  tips$ = this.tips.asObservable();
  createTipForm: FormGroup;
  selectedPackages: Package[] = [];
  tipToCreate: TipCreate = {
    homeTeam: '',
    awayTeam: '',
    packages: []
  };
  selectedFile: File | null = null;


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
      photo: [null]
    });
  }

  private setTips(newTips: Tip[]) {
    this.tips.next(newTips)
  }

  private getTips() {
    return this.tips.getValue();
  }

  loadTips() {
    this.tipService.getAllActiveTips().pipe(take(1))
      .subscribe({
        next: fetchedTips => this.setTips(fetchedTips)
      });
  }

  onCheckPackage(e, selectedPackage: Package) {
    const isChecked: boolean = e.target.checked;
    if (isChecked) 
      this.selectedPackages.push(selectedPackage);
    else 
      this.selectedPackages.splice(
        this.selectedPackages.indexOf(selectedPackage), 1
      );
    
    this.tipToCreate.packages = [...this.selectedPackages];
  }

  onSubmitForm() {
    if (this.selectedPackages.length === 0) return;
    if (this.createTipForm.invalid) return;
    this.tipToCreate.homeTeam = this.createTipForm.get('homeTeam').value;
    this.tipToCreate.awayTeam = this.createTipForm.get('awayTeam').value;
    this.tipService.createTip(this.tipToCreate).pipe(take(1))
      .subscribe({
        next: newTip => {
          const currentTips: Tip[] = this.getTips();
          const updatedTips: Tip[] = [...currentTips, newTip];
          this.setTips(updatedTips);
          this.createTipForm.reset();
        }
      });
  }

  onMakeTipsInactive() {
    const currentTips = this.getTips();
    if (currentTips.length === 0) return;
    this.tipService.makeTipsInactive().pipe(take(1))
      .subscribe({
        next: _ => {
          this.setTips([]);
        }
      });
  }


 selectFileToUpload(event) {  
     this.selectedFile = event.target.files[0];
 }  

 uploadFile() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('photo', this.selectedFile);
    this.tipService.createPhoto(formData)
      .pipe(take(1))
      .subscribe({next: response => console.log(response)});
 }

}
