import { Routes } from '@angular/router';
import {Form} from "./routes/form/form";
import {ProfileEditor} from "./routes/profile-editor/profile-editor";

export const routes: Routes = [
    { path: 'form', component: Form },
    { path: 'profile-editor', component: ProfileEditor}
];
