module.exports = {
    css: {
        files: [
					'src/**/*.scss'
        ],
        tasks: ['compass:dev']
    },
    js: {
      files: [
            'src/js/**/*.js'
        ],
        tasks: ['browserify:dev']
    }
}
