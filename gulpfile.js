let gulp = require('gulp');
// 直接显示原始代码，用于调试
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel"); // babel es6转换
let uglify = require('gulp-uglify');
let concat = require('gulp-concat'); // 合拼
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
let cache = require('gulp-cache');
let imagemin = require('gulp-imagemin'); // 压缩图片
let rev = require('gulp-rev'); // 对文件名加MD5后缀
let revCollector = require('gulp-rev-collector'); // 路径替换
let livereload = require('gulp-livereload'); // 浏览器自动刷新， 浏览器需要安装liverreload插件

let runSequence = require('run-sequence');
let filterConf = require('./filter.config.js');
let proxy = require('http-proxy-middleware');


let browserSync = require('browser-sync').create();

let cssPlugins = [
  shortcss,
  autoprefixer({
    browsers: ['last 100 versions', 'Android >= 4.0', 'iOS 7'],
    cascade: false
  }) // css浏览器兼容性
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
// 压缩html
gulp.task('htmlmin', function() {
  gulp.src('./src/page/*.html') // 本地html文件
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/page')) // 输出的目标文件夹
})


gulp.task('presass', function() {
  // 读取scss文件
  gulp.src('./src/styles/**/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(cssPlugins))
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
    .pipe(gulp.dest('./dist/styles')) // 打包到dist中
})

gulp.task('cssmin', function() {
  gulp.src('./src/styles/**/*.css')
    // .pipe(concat('common.min.css'))// 是否合拼所有的css文件
    .pipe(postcss(cssPlugins))
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
    .pipe(gulp.dest('./dist/styles'))
})

// 压缩所有js,包括util文件夹里面的js
gulp.task('jsmin', function() {
  gulp.src(['./src/js/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    // .pipe(concat('app.min.js')) // 是否合拼所有的js文件，单页面应用合拼，多页面不需要合拼
    .pipe(uglify({
      mangle: true, //类型：Boolean 默认：true 是否修改变量名
      compress: true, //类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'all' //保留所有注释
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/js'))

  gulp.src(['./src/util/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    // .pipe(concat('app.min.js')) // 是否合拼所有的js文件，单页面应用合拼，多页面不需要合拼
    .pipe(uglify({
      mangle: true, //类型：Boolean 默认：true 是否修改变量名
      compress: true, //类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'all' //保留所有注释
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/util'))
})

// 压缩图片
gulp.task('imgmin', function() {
  gulp.src('./src/imgs/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest('./dist/imgs'))
});

// 复制公共文件到dist中 比如：放置框架的文件jquery.min.js
gulp.task('copyPub', function() {
  gulp.src('./src/assets/*')
    .pipe(gulp.dest('./dist/assets/'))
})

/**
 * 删除掉上一次构建时创建的资源， 删除的文件在电脑回收站是不会出现的，请不要把src文件夹的源码路径加到该处
 */
gulp.task('clean', function() {
  del([
    'dist/imgs/*',
    'dist/js/*',
    'dist/assets/*',
    'dist/page/*',
    'dist/styles/*',
    'dist/util/*'
  ])
});


// 监听对应文件，执行对应任务
gulp.task('watch', ['browserSync'] ,function() {
  // 分开各个任务有自身的watch，修改一个文件时只执行对应的任务。如果把所有任务都放到一个watch里面，一个文件变化将需要执行所有的任务，
  // 有些文件没有变化的，并不需要执行任务。利于加快打包时间
  // Watch .js files
  gulp.watch(['./src/js/**/*.js', './src/util/**/*.js'], ['jsmin']);
  // Watch .css files
  gulp.watch(['./src/styles/**/*.css'], ['cssmin']);
  // wacth assets file
  gulp.watch(['./src/assets/*'], ['copyPub']);

  // wacth html files
  gulp.watch(['./src/page/*.html'], ['htmlmin']);
  // Watch imgs file
  gulp.watch(['src/imgs/**/*'], ['imgmin']);
})

// 反向代理，解决跨域问题
// 文件筛选器，dist目录文件夹的文件不需要代理
var folder = function() {
  let str = '';
  filterConf.map(function(val, idx) {
    str += `^(?!/${val})`;
  })
  return str;
}

let filter = function(pathname, req) {
  let str = folder();
  return (pathname.match(str));
};

let proxyConfi = proxy(filter, {
  target: 'http://192.168.0.181:10083', // 后台接口环境
  changeOrigin: true
})

// 浏览器自动刷新
gulp.task('browserSync', function() {
  browserSync.init({
    port: 8081, // 本地开发环境端口
    open: true,
    startPath: '/page/index.html', // 默认打开页
    server: {
      baseDir: './dist',
      //中间件 - 需要V2.1.0, 反向代理
      middleware: [proxyConfi]
    }
  });
  // 监听所有开发源文件，实时刷新浏览器
  gulp.watch(['./src/**'])
    .on('change', browserSync.reload);
});

// 开发环境
gulp.task('dev', () => {
  runSequence('clean',
    'copyPub', ['jsmin', 'cssmin', 'imgmin', 'htmlmin'], // 开启时先执行一次任务，避免需要监听的文件保存一下才执行对应的任务
    'watch',
    (event) => {
      console.log(`dev start...`);
    });
})

// 生产环境
/**
 * 修改引用路径
 */
gulp.task('versionPath', function() {
  gulp.src(['rev/**/*.json', './src/page/*.html'])
    //将html文件中的js，css,img,文件替换成压缩生成MD5戳的js、css文件
    .pipe(revCollector())
    // 压缩html
    .pipe(htmlmin(htmlOptions))
    //输出路径
    .pipe(gulp.dest('./dist/page'))
    .pipe(livereload())
});

gulp.task('cssmin_prod', function() {
  gulp.src('./src/styles/**/*.css')
    // .pipe(concat('common.min.css'))// 是否合拼所有的css文件
    .pipe(postcss(cssPlugins))
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
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest('rev/css')); //- 将 rev-manifest.json 保存到 rev 目录内
})

// 压缩所有js,包括util文件夹里面的js
gulp.task('jsmin_prod', function() {
  gulp.src(['./src/js/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    // .pipe(concat('app.min.js')) // 是否合拼所有的js文件，单页面应用合拼，多页面不需要合拼
    .pipe(uglify({
      mangle: true, //类型：Boolean 默认：true 是否修改变量名
      compress: true, //类型：Boolean 默认：true 是否完全压缩
      // preserveComments: 'all' //保留所有注释
    }))
    // 添加文件版本号
    .pipe(rev())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/js'))
    //生成rev.json文件
    .pipe(rev.manifest())
    //输出json文件
    .pipe(gulp.dest('rev/js'));

  gulp.src(['./src/util/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    // .pipe(concat('app.min.js')) // 是否合拼所有的js文件，单页面应用合拼，多页面不需要合拼
    .pipe(uglify({
      mangle: true, //类型：Boolean 默认：true 是否修改变量名
      compress: true, //类型：Boolean 默认：true 是否完全压缩
      // preserveComments: 'all' //保留所有注释
    }))
    // 添加文件版本号
    .pipe(rev())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/util'))
    //生成rev.json文件
    .pipe(rev.manifest())
    //输出json文件
    .pipe(gulp.dest('rev/util'));
})

// 压缩图片
gulp.task('imgmin_prod', function() {
  gulp.src('./src/imgs/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    })))
    .pipe(rev())
    .pipe(gulp.dest('./dist/imgs'))
    .pipe(rev.manifest()) // 生成一个rev-manifest.json
    .pipe(gulp.dest('rev/img')); //- 将 rev-manifest.json 保存到 rev 目录内

});

gulp.task('build', () => {
  runSequence('clean', ['jsmin_prod', 'cssmin_prod', 'imgmin_prod'],
    'versionPath',
    'copyPub',
    (event) => {
      console.log(`build end...`);
    });
})
