import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import sassGlob from 'gulp-sass-glob';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import sassLint from 'gulp-sass-lint';
import nano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
import rename from 'gulp-rename';
import gulpStylelint from 'gulp-stylelint';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/*.scss')
		.pipe(plumber({errorHandler: errorHandler('Error in \'styles\' task')}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
));

gulp.task('styles:lint', () => (
	gulp.src('app/**/*.scss')
		.pipe(sassLint())
		.pipe(gulpStylelint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}))
));
