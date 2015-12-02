var exec = require('child_process').exec;
var util = require('util');

module.exports = function (grunt) {
  grunt.registerTask("make", "build c++", function () {
    var done = this.async();
    var filename = '000listMake';
    exec(util.format("cd ./c++ && make -f %s", filename), function (err, stdout, stderr) {
      console.log('done')
      if (err) {
        console.log(err);
      }
      console.log(stdout)
      console.error(stderr);
      exec(util.format("%s/c++/%s-res.out", __dirname, filename), function (err, stdout, stderr) {
        if (err) {
          console.log("error")
          console.log(err);
        }
        console.error(stderr);
        console.log(stdout)
        done();
      });
    });
  });

  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['c++/**/*.cpp', 'c++/**/*.h', 'c++/*.cpp'],
        tasks: ["make"],
        options: {
          interrupt: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
};
