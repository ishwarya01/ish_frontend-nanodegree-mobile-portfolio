/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      /* Clear out the images directory if it exists */
      clean: {
        dev: {
          src: ['img/compressed']
        },
      },

      /* Generate the images and js directory if it is missing */
      mkdir: {
        dev: {
          options: {
            create: ['img/compressed']
          },
        },
      },

      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'css/',    //css file directory
            src: ['*.css'], //select all css files
            dest: 'css/',   //save it in specified directory
            ext: '.min.css'
          }]
        }
      },

      uglify: {
        build: {
          src: 'js/perfmatters.js',      //js file directory
          dest: 'js/perfmatters.min.js'  //save it in specified directory
        }
      },
      responsive_images: {
        dev: {
          options: {
            engine: 'im',
            sizes: [{
              name: 'small',
              width: 100,
              quality: 100
            },{
              name: 'medium',
              width: 320,
              quality: 100
            },{
              width: 640,
              suffix: "_large_2x",
              quality: 100
              }]
          },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
          files: [{
            expand: true,
            src: ['*.{gif,jpg,png}'],
            cwd: 'img/',
            dest: 'img/img_responsive/'
          }]
        }
      },
       imagemin: {
         dynamic: {
           files: [{
             expand: true,
             cwd: 'img/',
             src: ['**/*.{png,jpg,gif}'],
             dest: 'img/compressed/'
           }]
         }
       },
   });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['clean', 'mkdir', 'cssmin', 'uglify', 'responsive_images','imagemin']);
};
