import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'sprites',
		'styles'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'libsCss',
			'libsJs',
			'scripts',
			'styles:dependencies',
			'images',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	runSequence(
		'libsCss',
		'libsJs',
		'styles:dependencies',
		'imagesBuild',
		'scripts:lint',
		'scripts',
		'copy',
		'templates'
	)
));
