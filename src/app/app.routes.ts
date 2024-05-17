import { Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { CitypageComponent } from './citypage/citypage.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: FrontpageComponent
    },
    {
        path: 'city/:query',
        title: 'Weather',
        component: CitypageComponent
    }
];
