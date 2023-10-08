import { Routes } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { AutosizeCdkComponent } from './cdk/autosize-cdk.component';
import { DynamicSizeCdkComponent } from './cdk/dynamic-size-cdk.component';
import { FixedSizeCdkComponent } from './cdk/fixed-size-cdk.component';
import { ContentVisibilityComponent } from './native/content-visibility.component';
import { DefaultComponent } from './native/default.component';
import { AutosizeComponent } from './rxa/autosize.component';
import { DynamicSizeComponent } from './rxa/dynamic-size.component';
import { FixedSizeComponent } from './rxa/fixed-size.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
  },
  {
    path: 'native/default',
    component: DefaultComponent,
  },
  {
    path: 'native/content-visibility',
    component: ContentVisibilityComponent,
  },
  {
    path: 'rxa/fixed-size',
    component: FixedSizeComponent,
  },
  {
    path: 'cdk/fixed-size',
    component: FixedSizeCdkComponent
  },
  {
    path: 'compare/fixed-size-cdk-compare',
    loadChildren: () =>
      import(
        './compare/fixed-size-cdk-compare/fixed-size-cdk-compare.component'
        ).then((m) => m.FixedSizeCdkCompareModule),
  },
  {
    path: 'rxa/dynamic-size',
    component: DynamicSizeComponent,
  },
  {
    path: 'cdk/dynamic-size',
    component: DynamicSizeCdkComponent
  },
  {
    path: 'compare/dynamic-size-cdk-compare',
    loadChildren: () =>
      import(
        './compare/dynamic-size-cdk-compare/dynamic-size-cdk-compare.component'
        ).then((m) => m.DynamicSizeCdkCompareModule),
  },
  {
    path: 'rxa/autosize',
    component: AutosizeComponent,
  },
  {
    path: 'cdk/autosize',
    component: AutosizeCdkComponent
  },
  {
    path: 'compare/autosize-cdk-compare',
    loadChildren: () =>
      import(
        './compare/auto-size-cdk-compare/autosize-cdk-compare.component'
        ).then((m) => m.AutosizeCdkCompareModule),
  },
  {
    path: '',
    redirectTo: 'demos/fixed-size',
    pathMatch: 'full',
  },
];
