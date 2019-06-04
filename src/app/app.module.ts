import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemDataService} from './in-memory-data.service';
import {AppService} from './app.service';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemDataService, { dataEncapsulation: false, delay: 1000 }),
    ],
  declarations: [ AppComponent, HelloComponent ],
  providers: [AppService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


//////////////

// import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import {
//   MatAutocompleteSelectedEvent,
//   MatAutocompleteTrigger,
//   VERSION,
// } from '@angular/material';

// import { Observable } from 'rxjs/Observable';
// import { catchError } from 'rxjs/operators/catchError';
// import { map } from 'rxjs/operators/map';
// import { startWith } from 'rxjs/operators/startWith';
// import { Subscription } from 'rxjs/Subscription';
// import { FormBuilder, FormGroup} from '@angular/forms';

// @Component({
//   selector: 'material-app',
//   templateUrl: 'app.component.html'
// })
// export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

//   version = VERSION;
//   stateCtrl: FormControl;
//   filteredStates: Observable<string[] | null>;

//   @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
//   subscription: Subscription;

//   usersForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     // this.stateCtrl = new FormControl();
//     // console.log('this.stateCtrl = ' +this.stateCtrl);
//     // console.log('this.stateCtrl stateCtrl = ' +this.stateCtrl.get('stateCtrl'));

//     // this.filteredStates = this.stateCtrl.valueChanges.pipe(
//     //   startWith(null),
//     //   map(name => this.filterStates(name))
//     // );
//   }

//   ngOnInit() {

//     this.usersForm = this.fb.group({
//       userInput: null,
//       firstName: null
//     })

//     this.stateCtrl = new FormControl();
//     console.log('this.stateCtrl = ' +this.stateCtrl);
//     console.log('this.stateCtrl stateCtrl = ' +this.stateCtrl.get('stateCtrl'));

//     this.filteredStates = this.stateCtrl.valueChanges.pipe(
//       startWith(null),
//       map(name => this.filterStates(name))
//     );
//   } 

//   ngAfterViewInit() {
//     this._subscribeToClosingActions();
//   }

//   ngOnDestroy() {
//     if (this.subscription && !this.subscription.closed) {
//       this.subscription.unsubscribe();
//     }
//   }

//   private _subscribeToClosingActions(): void {
//     if (this.subscription && !this.subscription.closed) {
//       this.subscription.unsubscribe();
//     }

//     this.subscription = this.trigger.panelClosingActions
//       .subscribe(e => {
//         if (!e || !e.source) {
//           this.stateCtrl.setValue(null);
//         }
//       },
//       err => this._subscribeToClosingActions(),
//       () => this._subscribeToClosingActions());
//   }

//   handler(event: MatAutocompleteSelectedEvent): void {
//     this.stateCtrl.setValue(event.option.value);
//   }

//   filterStates(val: string): string[] {
//     return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) > -1)
//       : this.states;
//   }


  
//   states = [
//     'Alabama',
//     'Alaska',
//     'Arizona',
//     'Arkansas',
//     'California',
//     'Colorado',
//     'Connecticut',
//     'Delaware',
//     'Florida',
//     'Georgia',
//     'Hawaii',
//     'Idaho',
//     'Illinois',
//     'Indiana',
//     'Iowa',
//     'Kansas',
//     'Kentucky',
//     'Louisiana',
//     'Maine',
//     'Maryland',
//     'Massachusetts',
//     'Michigan',
//     'Minnesota',
//     'Mississippi',
//     'Missouri',
//     'Montana',
//     'Nebraska',
//     'Nevada',
//     'New Hampshire',
//     'New Jersey',
//     'New Mexico',
//     'New York',
//     'North Carolina',
//     'North Dakota',
//     'Ohio',
//     'Oklahoma',
//     'Oregon',
//     'Pennsylvania',
//     'Rhode Island',
//     'South Carolina',
//     'South Dakota',
//     'Tennessee',
//     'Texas',
//     'Utah',
//     'Vermont',
//     'Virginia',
//     'Washington',
//     'West Virginia',
//     'Wisconsin',
//     'Wyoming',
//   ];
// }

// /**
//  * Copyright Google LLC All Rights Reserved.
//  *
//  * Use of this source code is governed by an MIT-style license that can be
//  * found in the LICENSE file at https://angular.io/license
//  */
 
 
//  <form class="example-form" [formGroup]='usersForm'>

// <mat-toolbar color="primary">
// 	Angular Material 2 App
// </mat-toolbar>
// <div class="basic-container" tabindex="-1" #focusMe>
// 	<mat-form-field>
// 		<input matInput placeholder="State" [matAutocomplete]="auto" [formControl]="stateCtrl">
// 		<mat-autocomplete #auto="matAutocomplete" (optionSelected)="handler($event)">
// 			<mat-option *ngFor="let state of filteredStates | async" [value]="state">
// 				{{ state }}
// 			</mat-option>
// 		</mat-autocomplete>
// 	</mat-form-field>
// 	<span class="version-info">Current build: {{version.full}}</span>
// </div>

// </form>
