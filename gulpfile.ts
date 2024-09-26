const gulp = require("gulp");
const jsonEditor = require("gulp-json-editor");
import { expo } from "./app.json";

gulp.task("change-build-number", async () => {
  let versionNumber: number = expo.android.versionCode;
  versionNumber = versionNumber + 1;

  const androidVersionNumber = versionNumber;
  let iosVersionNumber: string = "";

  for (let index = 0; index < versionNumber.toString().length; index++) {
    if (index === 0) {
      iosVersionNumber = versionNumber.toString().charAt(index);
    } else {
      iosVersionNumber =
        iosVersionNumber + "." + versionNumber.toString().charAt(index);
    }
  }

  gulp
    .src("./app.json")
    .pipe(
      jsonEditor({
        expo: {
          ios: {
            buildNumber: iosVersionNumber,
          },
          android: {
            versionCode: androidVersionNumber,
          },
        },
      })
    )
    .pipe(gulp.dest("./"));

  return false;
});
