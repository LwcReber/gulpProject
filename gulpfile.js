let gulp = require('gulp');
// 直接显示原始代码，用于调试
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel"); // babel es6转换
let uglify = require('gulp-uglify');
let concat = require('gulp-concat'); // 合拼
let rename = require('gulp-rename');
let clean = require('gulp-clean');
let cssmin = require('gulp-minify-css');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let autoreset = require('postcss-autoreset');
let shortColor = require('postcss-short-color');
let shortcss = require('postcss-short');
let sass = require('gulp-sass');
let del = require('del');
let htmlmin = require('gulp-htmlmin');
let rev = require('gulp-rev'); //- 对文件名加MD5后缀
let revCollector = require('gulp-rev-collector'); //- 路径替换
let livereload = require('gulp-livereload'); // 浏览器自动刷新， 浏览器需要安装liverreload插件

let plugins = [
  shortcss,
  autoprefixer({
    browsers: ['> 1%'],
    cascade: false
  }), // css浏览器兼容性
  autoreset({
    // 重置所有样式
    reset: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  })
];

// html文件打包配置
let htmlOptions = {
  removeComments: true, //清除HTML注释
  collapseWhitespace: true, //压缩HTML
  collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
  minifyJS: true, //压缩页面JS
  minifyCSS: true //压缩页面CSS
};
gulp.task('htmlmin', function() {
  gulp.src('./src/page/*.html') // 本地html文件
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/page')); // 输出的目标文件夹
})


gulp.task('presass', function() {
  // 读取scss文件
  gulp.src('./src/styles/**/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(cssmin({
      //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      //类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist/css')) // 打包到dist中
})

gulp.task('cssmin', function() {
  gulp.src('./src/styles/**/*.css')
    // .pipe(concat('common.min.css'))// 是否合拼所有的css文件
    .pipe(postcss(plugins))
    .pipe(cssmin({
      //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      //类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(rev())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest('rev/css')); //- 将 rev-manifest.json 保存到 rev 目录内
})


// 压缩所有js
gulp.task('jsmin', function() {
  gulp.src(['./src/js/**/*.js', './src/util/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    // .pipe(concat('app.min.js')) // 是否合拼所有的js文件，单页面应用合拼，多页面不需要合拼
    .pipe(uglify({
      mangle: true, //类型：Boolean 默认：true 是否修改变量名
      compress: true, //类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'all' //保留所有注释
    }))
    .pipe(rev())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/js'))
    //生成rev.json文件
    .pipe(rev.manifest())
    //输出json文件
    .pipe(gulp.dest('rev/js'));
})

// 复制公共文件到dist中 比如：放置框架的文件jquery.min.js
gulp.task('copyPub', function() {
  gulp.src('./src/lib/*')
    .pipe(gulp.dest('./dist/lib/'))
  gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images/'))
})

/**
 * 删除掉上一次构建时创建的资源
 */
gulp.task('clean', function() {
  // gulp.src([
  //     'rev/**/*.json',
  //     './dist/**'
  //     // // 清除所有的js
  //     // './dist/js/**/*.js',
  //     // './dist/js/**/*.map',
  //     // // 清除所有的css
  //     // './dist/styles/**/*.css'
  //   ])
  //   .pipe(clean())
  del(['dist'])
});

/**
 * 替换路径
 */
gulp.task('versionPath', function() {
  gulp.src(['rev/**/*.json', './src/page/**/*.html'])
    //将html文件中的js，css文件替换成压缩生成MD5戳的js、css文件
    .pipe(revCollector())
    //输出路径
    .pipe(gulp.dest('./dist/page'))
});

// 监听所有任务
gulp.task('gulpwatch', ['clean', 'copyPub'], () => {
  gulp.watch(['./src/js/**/*.js', './src/util/**/*.js','./src/page/**/*.html', './src/styles/**/*.scss', './src/styles/**/*.css'],
  ['jsmin', 'htmlmin', 'presass', 'cssmin', 'versionPath'],
  (event) => {
    console.log(`${event.path} was ${event.type} , running tasks...`);
  })
})
