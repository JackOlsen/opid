/// <binding BeforeBuild='build' ProjectOpened='project:opened' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    ngAnnotate = require("gulp-ng-annotate"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
	templatecache = require("gulp-angular-templatecache"),
    ts = require("gulp-typescript"),
	rm = require("gulp-rm"),
	shell = require("gulp-shell"),
	del = require("del"),
	iife = require("gulp-iife"),
	merge = require("merge-stream"),
	sass = require("gulp-sass");
var runSequence = require("run-sequence").use(gulp);

var webroot = "./wwwroot/";
var scriptsRoot = "./Scripts/";
var stylesRoot = "./Styles/";
var paths = {
	src: {
		ts: scriptsRoot + "**/*.ts",
		js: scriptsRoot + "**/*.js",
		scss: stylesRoot + "**/*.scss",
		templates: scriptsRoot + "**/*.html"
	},
	dev: {
		js: webroot + "dev/js",
		css: webroot + "dev/css"
	},
	prod: {
		js: webroot + "prod/js",
		css: webroot + "prod/css"
	}
};

gulp.task("install:typings", shell.task(["typings install"]));

gulp.task("clean:src:js", function (cb) {
	return gulp.src(paths.src.js).pipe(rm());
});

gulp.task("ts:compile", ["clean:src:js"], function () {
	return gulp.src(paths.src.ts)
        .pipe(ts("tsconfig.json"))
        .pipe(gulp.dest(scriptsRoot));
});

gulp.task("build:js", ["ts:compile"], function () {
	return del([paths.dev.js, paths.prod.js]).then(function () {
		var js = gulp.src([paths.src.js], { base: scriptsRoot })
			.pipe(ngAnnotate())
			.pipe(gulp.dest(paths.dev.js));

		var templates = gulp.src(paths.src.templates)
			.pipe(templatecache("templates.js", {
				module: "opidApp",
				root: "/app"
			}))
			.pipe(iife())
			.pipe(gulp.dest(paths.dev.js));

		return merge(js, templates)
			.pipe(uglify())
			.pipe(concat("opidApp.min.js"))
			.pipe(gulp.dest(paths.prod.js));
	});
});

gulp.task("build:css", function () {
	return del([paths.dev.css, paths.prod.css]).then(function () {
		var css = gulp.src([paths.src.scss], { base: stylesRoot })
			.pipe(sass())
			.pipe(gulp.dest(stylesRoot))
			.pipe(gulp.dest(paths.dev.css))
			.pipe(concat("opid.min.css"))
			.pipe(cssmin())
			.pipe(gulp.dest(paths.prod.css));
	});
});

gulp.task("build", ["build:js", "build:css"]);

gulp.task("watch:js", function () {
	return gulp.watch([paths.src.ts, paths.src.templates], ["build:js"]);
});
gulp.task("watch:scss", function () {
	return gulp.watch([paths.src.scss], ["build:css"]);
});

gulp.task("project:opened", function (cb) {
	return runSequence("install:typings", ["watch:js", "watch:scss"], cb);
});

/********** Bootstrap **********/
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");

var bsPaths = {
	webroot: "./wwwroot/"
};
bsPaths.bsSourceRoot = bsPaths.webroot + "lib/bootstrap/";
bsPaths.dist = bsPaths.bsSourceRoot + "dist/";
bsPaths.distToolkitJs = bsPaths.dist + "toolkit.js";
bsPaths.lessToolkitSources = bsPaths.bsSourceRoot + "less/toolkit*";
bsPaths.lessSources = bsPaths.bsSourceRoot + "less/**/**";
bsPaths.jsSources = [
      bsPaths.bsSourceRoot + "js/bootstrap/transition.js",
      bsPaths.bsSourceRoot + "js/bootstrap/alert.js",
      bsPaths.bsSourceRoot + "js/bootstrap/affix.js",
      bsPaths.bsSourceRoot + "js/bootstrap/button.js",
      bsPaths.bsSourceRoot + "js/bootstrap/carousel.js",
      bsPaths.bsSourceRoot + "js/bootstrap/collapse.js",
      bsPaths.bsSourceRoot + "js/bootstrap/dropdown.js",
      bsPaths.bsSourceRoot + "js/bootstrap/modal.js",
      bsPaths.bsSourceRoot + "js/bootstrap/tooltip.js",
      bsPaths.bsSourceRoot + "js/bootstrap/popover.js",
      bsPaths.bsSourceRoot + "js/bootstrap/scrollspy.js",
      bsPaths.bsSourceRoot + "js/bootstrap/tab.js",
      bsPaths.bsSourceRoot + "js/custom/*"
];
//bsPaths.bsSourceRoot + "js/**/*.js"

gulp.task("bootstrap-build", ["bootstrap-less-min", "bootstrap-js-min"]);

gulp.task("bootstrap-less", function () {
	return gulp.src(bsPaths.lessToolkitSources)
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest(bsPaths.dist));
});

gulp.task("bootstrap-less-min", ["bootstrap-less"], function () {
	return gulp.src(bsPaths.lessToolkitSources)
		.pipe(less())
		.pipe(cssmin())
		.pipe(autoprefixer())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(bsPaths.dist));
});

gulp.task("bootstrap-js", function () {
	return gulp.src(bsPaths.jsSources)
		.pipe(concat("toolkit.js"))
		.pipe(gulp.dest(bsPaths.dist));
});

gulp.task("bootstrap-js-min", ["bootstrap-js"], function () {
	return gulp.src(bsPaths.dist + "toolkit.js")
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(bsPaths.dist));
});