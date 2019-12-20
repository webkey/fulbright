import gulp from 'gulp';
import uglify from 'gulp-uglify';
import minifyCSS from 'gulp-minify-css';
import {libsJsLink, libsCssLink} from '../libs-links';

gulp.task('libsJs', () => {
	gulp.src(libsJsLink)
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/libs/js'));
});

gulp.task('libsCss', () => {
	gulp.src(libsCssLink)
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/assets/libs/css'));
});
