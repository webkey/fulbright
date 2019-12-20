import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import noop from 'gulp-noop';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import eslint from 'gulp-eslint';

const {NODE_ENV} = process.env;
const isDebug = NODE_ENV !== 'production';
const keepDebug = true;
const uglifyParams = {mangle: false, compress: {hoist_funs: true, hoist_vars: false, drop_debugger: !keepDebug}};

const jsFiles = [
	'app/scripts/app.js',
	'app/blocks/**/*.js',
	'app/scripts/common/**/*.js',
	'app/scripts/init.js'
];

gulp.task('scripts', () => {
	gulp.src(jsFiles)
		.pipe(plumber({
			errorHandler: function(err) {
				notify.onError({
					title: "Error ---> JS",
					message: "<%= error.message %>"
				})(err);
			}
		}))
		.pipe(babel())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(isDebug ? noop() : uglify(uglifyParams))
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/assets/scripts/'));
});

gulp.task('scripts:lint', () => {
	gulp.src(jsFiles)
		.pipe(eslint({ configFile: '.eslintrc'}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
