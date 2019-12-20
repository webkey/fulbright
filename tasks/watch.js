import gulp from 'gulp';
import runSequence from 'run-sequence';
import {get as browserSync} from 'browser-sync';
import watch from 'gulp-watch';

const bs = browserSync('server');

gulp.task('watch', () => {
	global.watch = true;

	watch(['app/libs/css/*.js', 'libs-links.js'], () => runSequence('libsCss', bs.reload));
	watch(['app/libs/js/*.js', 'libs-links.js'], () => runSequence('libsJs', bs.reload));
	watch('app/images/icons/**/*.svg', () => runSequence('sprites'));
	watch('app/{styles,blocks}/**/*.scss', () => {
		runSequence(['styles', 'styles:lint'], () => bs.reload('assets/styles/app.min.css'));
	});
	watch(['app/blocks/**/*.js', 'app/scripts/**/**.js'], () => {
		runSequence(['scripts'], () => bs.reload('assets/scripts/app.min.js'));
	});
	watch(['app/{pages,blocks}/**/*.html', 'app/svg/**/*.svg'], () => runSequence('templates', bs.reload));
	watch('app/resources/**/*', () => runSequence('copy', bs.reload));
	watch(['app/images/**/*'], () => runSequence('images', bs.reload));
});
