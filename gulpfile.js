var gulp = require('gulp'),
    os = require('os'),
    fs = require('fs-extra');

var isWin = os.type().toString().match('Windows') !== null;

function removeResource() {
    var files = [
        './mobile_android_lib/src/main/res/raw',
        './mobile_android_sample/app/src/main/assets/maps',
        './mobile_android_sample/app/src/main/assets/tiles',
        './mobile_android_sample_kotlin/app/src/main/assets/maps',
        './mobile_android_sample_kotlin/app/src/main/assets/tiles'
    ];
    for (var i=0; i<files.length; i++) {
        var file = files[i];
        try {
            fs.removeSync(file);
        } catch (e) {
        }
    }
}

var resourceCopy = [
    ['node_modules/maplat_core/dist/maplat_core.css', 'dist_maplat_core_css'],
    ['node_modules/maplat_core/dist/maplat_core.js', 'dist_maplat_core_js'],
    ['node_modules/maplat_mobile_gw/dist/maplatBridge.js', 'dist_maplatBridge_js'],
    ['node_modules/maplat_mobile_gw/mobile.html', 'mobile_html'],
    ['node_modules/maplat_core/parts/bluedot.png', 'parts_bluedot_png'],
];

function copyResource(files) {
    for (var i=0; i<files.length; i++) {
        var copy = files[i];
        var copyTo = copy.replace(/[\/\.\-]/g, '_').toLowerCase();
        fs.copySync(copy, './mobile_android/mobile_android_lib/src/main/res/raw/' + copyTo);
        fs.copySync(copy, './mobile_ios/mobile_ios_lib/MaplatView/Maplat.bundle/' + copy);
    }
}

function copyAssets() {
    for (var i=0; i<assetsCopy.length; i++) {
        var copy = assetsCopy[i];
        fs.copySync(copy, './mobile_android/mobile_android_sample/app/src/main/assets/' + copy);
        fs.copySync(copy, './mobile_android/mobile_android_sample_kotlin/app/src/main/assets/' + copy);
        fs.copySync(copy, './mobile_ios/mobile_ios_sample/mobile_ios_sample/' + copy);
        fs.copySync(copy, './mobile_ios/mobile_ios_sample_swift/mobile_ios_sample_swift/' + copy);
    }
}

gulp.task('assets_copy', gulp.parallel('config', 'less'), function() {
    removeResource();
    copyResource(mobileTestCopy);
    copyResource(mobileBaseCopy);
    fs.copySync('mobile_test.html', './mobile_android/mobile_android_lib/src/main/res/raw/mobile_html');
    fs.copySync('mobile_test.html', './mobile_ios/mobile_ios_lib/MaplatView/Maplat.bundle/mobile.html');
    copyAssets();
    return Promise.resolve();
});





