import { Component, inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isHandset = false;
  sidenavOpened = true;

  readonly navGroups: NavGroup[] = [
    {
      items: [
        { label: 'Home', icon: 'home', route: '/' },
      ],
    },
    {
      label: 'Features',
      items: [
        { label: 'Forms', icon: 'description', route: '/forms' },
        { label: 'Data Table', icon: 'table_chart', route: '/table' },
      ],
    },
    {
      label: 'Account',
      items: [
        { label: 'Profile', icon: 'person', route: '/forms' },
        { label: 'Settings', icon: 'tune', route: '/table' },
      ],
    },
  ];

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isHandset = result.matches;
      this.sidenavOpened = !result.matches;
    });
  }

  onNavItemClick(): void {
    if (this.isHandset) {
      this.sidenav.close();
    }
  }
}
