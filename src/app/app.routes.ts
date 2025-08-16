import { Routes } from '@angular/router';
import {Form} from "./routes/form/form";
import {ProfileEditor} from "./routes/profile-editor/profile-editor";
import {PostzegelVisualizer} from "./routes/postzegel-visualizer/postzegel-visualizer";
import {PostzegelVisualizerList} from "./routes/postzegel-visualizer-list/postzegel-visualizer-list";

export const routes: Routes = [
    { path: 'form', component: Form },
    { path: 'profile-editor', component: ProfileEditor},
    { path: 'postzegel-visualizer', component: PostzegelVisualizer },
    { path: 'postzegel-visualizer-list', component: PostzegelVisualizerList }
];
