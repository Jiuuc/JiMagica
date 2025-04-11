const gulp = require('gulp')
const ts = require('gulp-typescript');
const project = ts.createProject('tsconfig.json')


gulp.task('compile', () => {
  return gulp.src('src/**/*.ts')
    .pipe(project())
    .pipe(gulp.dest('C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/'))
})

gulp.task('copy', async () => {
  return new Promise((resolve,reject) => {
    gulp.src('README.md').pipe(gulp.dest("C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/"))
    gulp.src("src/module.json").pipe(gulp.dest('C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/'))
    gulp.src("src/lang/**").pipe(gulp.dest('C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/lang/'))
    gulp.src("src/templates/**").pipe(gulp.dest('C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/templates/'))
    gulp.src("src/styles/**").pipe(gulp.dest('C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/styles/'))
    gulp.src("src/assets/**").pipe(gulp.dest('C:/Users/marat/AppData/Roaming/FoundryVTT/Data/modules/ji-magica/assets/'))
    resolve();
  })
})

gulp.task('build', gulp.parallel('compile', 'copy'));


/*
// This is supposed to copy the dist folder into the modules directory for testing. Only works if you've set it up the right way
//This works if development path is FoundryVTT/Data/dev/modules/swade-item-macros
const MODULEPATH = "../../../modules/swade-item-macros/"

gulp.task('foundry', () => {
  return gulp.src('dist/**').pipe(gulp.dest(MODULEPATH))
})

gulp.task("update", gulp.series('build', 'foundry'))
*/
