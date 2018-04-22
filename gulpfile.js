var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),  
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    emailBuilder = require('gulp-email-builder');



// Scss > CSS > MinCSS
gulp.task('styles', function() {
  return sass('scss', { style: 'expanded' })
    .pipe(gulp.dest('mailer/css'));
});


//Optimize Images
gulp.task('optimize-img', () =>
    gulp.src('./img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('mailer/img/'))
);

//Style Inliner
gulp.task('emailBuilder', function() {
    return gulp.src(['./mailer/*.html'])
      .pipe(emailBuilder().build())
      .pipe(gulp.dest('./mailer/inlined'));
  });

//Watch Scss for changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('img/**/*', ['optimize-img']);
    gulp.watch('mailer/*.html', ['emailBuilder']);
    
});

//Default task
gulp.task('default', ['watch'], function() {

});