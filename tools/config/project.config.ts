import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';
import { ExtendPackages } from './seed.config.interfaces';

// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/admin-lte/bootstrap/fonts/**',
    'node_modules/font-awesome/fonts/**'
  ];

  constructor() {
    super();
    this.APP_TITLE = 'Eve Supply Chain';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs'},
      {src: 'bootstrap-datepicker/dist/js/bootstrap-datepicker.js', inject: 'libs'},
      {src: 'datatables.net/js/jquery.dataTables.js', inject: 'libs'},
      {src: 'fastclick/lib/fastclick.js', inject: 'libs'},
      {src: 'moment/moment.js', inject: 'libs'},
      {src: 'select2/dist/js/select2.js', inject: 'libs'},
      {src: 'slimscroll/example/ssmaster/jquery.slimscroll.js', inject: 'libs'},
      {src: 'admin-lte/dist/js/adminlte.js', inject: 'libs'},
      {src: 'admin-lte/plugins/iCheck/icheck.min.js', inject: 'libs'},

      {src: 'bootstrap/dist/css/bootstrap.css', inject: true},
      {src: 'admin-lte/dist/css/AdminLTE.css', inject: true},
      {src: 'admin-lte/dist/css/skins/skin-blue.css', inject: true},
      {src: 'admin-lte/plugins/iCheck/square/blue.css', inject: true},
      {src: 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css', inject: true},
      {src: 'font-awesome/css/font-awesome.css', inject: true},
      {src: 'select2/dist/css/select2.css', inject: true},
      {src: 'datatables.net-dt/css/jquery.dataTables.css', inject: true},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
    // ng2-translate is already added with the advanced seed - here for example only
    let additionalPackages: ExtendPackages[] = [
      {
        name: '@angular/common/http',
        path: 'node_modules/@angular/common',
        packageMeta: {
          main: 'bundles/common-http.umd.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'tslib',
        path: 'node_modules/tslib',
        packageMeta: {
          main: 'tslib.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'ngx-toastr',
        path: 'node_modules/ngx-toastr/toastr.umd.js'
      },
      {
        name: 'lodash',
        path: 'node_modules/lodash',
        packageMeta: {
          main: 'index.js',
          defaultExtension: 'js'
        }
      },
      {
        name: 'ng-select',
        path: 'node_modules/ng-select',
        packageMeta: {
          main: 'index.js',
          defaultExtension: 'js'
        }
      }
    ];

    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
