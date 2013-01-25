fs = require 'fs'
watch = require 'node-watch'
{exec} = require 'child_process'

appFiles = [
  'model/item'
  'collection/list'
  'view/list'
  'view/package'
  'view/root'
  'view/html/div'
  'view/base/container'
  'view/base/row'
  'view/base/span'
  'view/components/alert'
  'app'
]

libFiles = [
  'underscore'
  'jquery'
  'backbone'
  'json2'
  'handlebars'
  'bootstrap'
  'bootria'
]

task 'watch', 'Watch the source directory and recompile on change', ->
  console.log "Watching for changes in './src'"
  for file in appFiles then do (file) ->
    fs.watchFile "./src/#{file}.coffee", { persistent: true, interval: 200 }, (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        console.log "./src/#{file}.coffee changed"
        invoke 'build' 

task 'build', 'Build single application file from source files', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "./src/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0

  process = ->
    fs.writeFile 'lib/bootria.coffee', 'jQuery ->\n\n' + appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile -l lib/bootria.coffee', (err, stdout, stderr) ->
        throw err if err
        fs.unlink 'lib/bootria.coffee', (err) ->
          throw err if err
        console.log ' > BootRIA successfully compiled to lib/bootria.js'

task 'minify', 'Minify/optimize BootRIA', ->
  exec 'java -jar "/Users/tobi/bin/compiler.jar" --js lib/bootria.js --js_output_file lib/bootria.min.js', (err, stdout, stderr) ->
    throw err if err
    console.log ' > BootRIA successfully optimized to lib/bootria.min.js'

task 'buildall', 'Build single application file from source files and libraries', ->
  libContents = new Array remaining = libFiles.length
  for file, index in libFiles then do (file, index) ->
    fs.readFile "./lib/#{file}.min.js", 'utf8', (err, fileContents) ->
      throw err if err
      libContents[index] = fileContents
      process() if --remaining is 0

  process = ->
    fs.writeFile './bootria-all.js', libContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      console.log ' > BootRIA successfully combined to ./bootria-all.js'
