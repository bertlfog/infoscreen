import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),

  },
  {
    path: 'ranking/:competition',
    loadComponent: () => import('./ranking/ranking.page').then( m => m.RankingPage),
    
  },
  {
    path: 'competitions',
    loadComponent: () => import('./competitions/competitions.page').then( m => m.CompetitionsPage),
    

  },
  {
    path: 'videoplayer',
    loadComponent: () => import('./videoplayer/videoplayer.page').then( m => m.VideoplayerPage),
    
  },
  {
    path: 'videoplayer/:competition',
    loadComponent: () => import('./videoplayer/videoplayer.page').then( m => m.VideoplayerPage),
 
  },
  {
    path: 'editcomp/:competition',
    loadComponent: () => import('./comp-editor/comp-editor.page').then( m => m.CompEditorPage),

  },
  {
    path: 'beer-editor',
    loadComponent: () => import('./beer-editor/beer-editor.page').then( m => m.BeerEditorPage),

  },
  {
    path: 'donations',
    loadComponent: () => import('./donations/donations.page').then( m => m.DonationsPage),
    
  },
  {
    path: 'player',
    loadComponent: () => import('./player/player.page').then( m => m.PlayerPage)
  },
  {
    path: 'player-config',
    loadComponent: () => import('./player-config/player-config.page').then( m => m.PlayerConfigPage)
  },

];
