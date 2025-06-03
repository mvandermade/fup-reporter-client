import {Component} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-form',
    templateUrl: './form.html',
    imports: [ReactiveFormsModule],
})
export class Form {
    favoriteColorControl = new FormControl('');
}