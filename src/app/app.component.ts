import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { User, IUserResponse } from './user.class';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AppService } from './app.service';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MatAutocompleteSelectedEvent,  MatAutocompleteTrigger,  VERSION} from '@angular/material';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
// export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
export class AppComponent implements AfterViewInit, OnDestroy {
  // filteredUsers: User[] = [];
   filteredStates: User[] = [];
  usersForm: FormGroup;
  isLoading = false;

  version = VERSION;
  stateCtrl: FormControl;
  // filteredStates: Observable<string[] | null>;
  // filteredStates: Observable<any[] | null>;

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  subscription: Subscription;
  
  constructor(private fb: FormBuilder, private appService: AppService) {

    this.stateCtrl = new FormControl();
    console.log('this.stateCtrl = ' +this.stateCtrl);

    // this.filteredStates = this.stateCtrl.valueChanges.pipe(
        this.stateCtrl.valueChanges.pipe(
      // startWith(null),
      // map(name => this.filterStates(name))
      debounceTime(300),
          tap(() => this.isLoading = true),
          switchMap(value => this.appService.search({name: value}, 1)
          .pipe(
            finalize(() => this.isLoading = false),
            )
          )
    ).
    subscribe(users => this.filteredStates = users.results);

    //   this.usersForm = this.fb.group({
    //   userInput: null,
    //   stateName: null
    // })
    //  // this.usersForm.get('userInput').valueChanges
    //    this.usersForm.get('stateName').valueChanges
    //    .pipe(
    //       debounceTime(300),
    //       tap(() => this.isLoading = true),
    //       switchMap(value => this.appService.search({name: value}, 1)
    //       .pipe(
    //         finalize(() => this.isLoading = false),
    //         )
    //       )
    //     )
    //     .subscribe(users => this.filteredUsers = users.results);

   }

  // ngOnInit() {
  //   this.usersForm = this.fb.group({
  //     userInput: null,
  //     stateName: null
  //   })

  //     // this.usersForm.get('userInput').valueChanges
  //      this.usersForm.get('stateName').valueChanges
  //      .pipe(
  //         debounceTime(300),
  //         tap(() => this.isLoading = true),
  //         switchMap(value => this.appService.search({name: value}, 1)
  //         .pipe(
  //           finalize(() => this.isLoading = false),
  //           )
  //         )
  //       )
  //       .subscribe(users => this.filteredUsers = users.results);
  // }

  displayFn(user: User) {
    if (user) { return user.name; }
  }

  ////

  ngAfterViewInit() {
    this._subscribeToClosingActions();
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private _subscribeToClosingActions(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.trigger.panelClosingActions
      .subscribe(e => {
        if (!e || !e.source) {
          this.stateCtrl.setValue(null);
        }
      },
      err => this._subscribeToClosingActions(),
      () => this._subscribeToClosingActions());
  }

  handler(event: MatAutocompleteSelectedEvent): void {
    this.stateCtrl.setValue(event.option.value);
  }

  
}
