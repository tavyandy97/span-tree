import gulp from "gulp";
import webpack from "webpack";
import rimraf from "rimraf";
import log from "fancy-log";
import PluginError from "plugin-error";
import rename from "gulp-rename";

import popupWebpackConfig from "./popup/webpack.config";
import eventWebpackConfig from "./event/webpack.config";
import contentWebpackConfig from "./content/webpack.config";

const popupJs = (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if (err) throw new PluginError("webpack", err);

    log("[webpack]", stats.toString());

    cb();
  });
};

const eventJs = (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if (err) throw new PluginError("webpack", err);

    log("[webpack]", stats.toString());

    cb();
  });
};

const contentJs = (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if (err) throw new PluginError("webpack", err);

    log("[webpack]", stats.toString());

    cb();
  });
};

const popupHtml = () => {
  return gulp
    .src("popup/src/index.html")
    .pipe(rename("popup.html"))
    .pipe(gulp.dest("./build"));
};

const copyManifest = () => {
  return gulp.src("manifest.json").pipe(gulp.dest("./build"));
};

const clean = (cb) => {
  rimraf("./build", cb);
};

const copyLibs = () => {
  return gulp
    .src("./content/src/scripts/libs/**/*")
    .pipe(gulp.dest("./build/libs"));
};

const copyIcons = () => {
  return gulp.src("./icons/**/*").pipe(gulp.dest("./build/icons"));
};

const build = gulp.series(
  clean,
  gulp.parallel(
    copyLibs,
    copyIcons,
    copyManifest,
    popupJs,
    popupHtml,
    eventJs,
    contentJs
  )
);

gulp.task("watch", () =>
  gulp.watch(["popup/**/*", "content/**/*", "event/**/*"], build)
);

gulp.task("default", build);
