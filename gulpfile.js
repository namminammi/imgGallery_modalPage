var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('styles', function(){
	return gulp.src('./public/sass/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('./public/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./public/css'))	
});

gulp.task('scripts', function(){
	return gulp.src('./public/js/*.js')
	.pipe(concat('bundles.js'))
	.pipe(rename({ suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('./public/scripts'))
})

gulp.task('watch', function(){
	gulp.watch('./public/sass/*.scss', ['styles']);
	gulp.watch('./public/js/*.js', ['scripts']);
})


	