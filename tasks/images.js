import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

gulp.task('images', () =>
	gulp.src('app/images/**/*').pipe(gulp.dest('dist/assets/images/'))
);

gulp.task('imagesBuild', () =>
	gulp
		.src('app/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/images/'))
);
