import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'ranking',
    loadComponent: () => import('./ranking/ranking.page').then( m => m.RankingPage)
  },
  {
    path: 'competitions',
    loadComponent: () => import('./competitions/competitions.page').then( m => m.CompetitionsPage)
  },
  {
    path: 'videoplayer',
    loadComponent: () => import('./videoplayer/videoplayer.page').then( m => m.VideoplayerPage)
  },
];
