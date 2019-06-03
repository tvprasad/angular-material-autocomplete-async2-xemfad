import { Component, OnInit,ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { User, IUserResponse } from './user.class';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AppService } from './app.service';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MatAutocompleteSelectedEvent,  MatAutocompleteTrigger,  VERSION} from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;

  version = VERSION;
  stateCtrl: FormControl;
  filteredStates: Observable<string[] | null>;

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  subscription: Subscription;
  
  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    })

      this.usersForm.get('userInput').valueChanges
       .pipe(
          debounceTime(300),
          tap(() => this.isLoading = true),
          switchMap(value => this.appService.search({name: value}, 1)
          .pipe(
            finalize(() => this.isLoading = false),
            )
          )
        )
        .subscribe(users => this.filteredUsers = users.results);
  }

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
