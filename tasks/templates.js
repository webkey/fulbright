import gulp from 'gulp';
import plumber from 'gulp-plumber';
import fileinclude from 'gulp-file-include';
import notify from "gulp-notify";

gulp.task('templates', () => (
	gulp.src('app/pages/*.html')
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist/'))
));
