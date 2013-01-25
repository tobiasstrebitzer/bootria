fs = require 'fs'
watch = require 'node-watch'
{exec} = require 'child_process'

coreFiles = [
  'model/item'
  'collection/list'
  'view/list'
  'view/package'
  'view/root'
  'view/html/div'
  'app'
]

moduleFiles = [
  'component/navbar'
  'component/alert'
  'component/dropdown'
  'component/hero'
]

libFiles = [
  'underscore'
  'jquery'
  'backbone'
  'bootstrap'
  'bootria'
]

combine = (files, dir, extension, callback)->
  contentsArray = []
  remaining = files.length
  for file, index in files then do (file, index) ->
    fs.readFile "./#{dir}/#{file}.#{extension}", 'utf8', (err, fileContents) ->
      throw err if err
      contentsArray[index] = fileContents
      if --remaining is 0
        callback contentsArray.join('\n\n')

compile = (contents, output, callback)->
  fs.writeFile "#{output}.coffee", "jQuery ->\n\n#{contents}", 'utf8', (err) ->
    throw err if err
    exec "coffee --compile -l #{output}.coffee", (err, stdout, stderr) ->
      throw err if err
      fs.unlink "#{output}.coffee", (err) ->
        throw err if err
      callback true

# Build all core and module sources to javascript file
task 'build', 'Build single application file from source files', ->
  combine coreFiles, "src", "coffee", (coreContents)->
    combine moduleFiles, "module", "coffee", (moduleContents)->
      compile "#{coreContents}\n\n#{moduleContents}", "lib/bootria", ->
        console.log ' > BootRIA successfully compiled to lib/bootria.js'

task 'minify', 'Minify/optimize BootRIA', ->
  exec 'java -jar "/Users/tobi/bin/compiler.jar" --js lib/bootria.js --js_output_file lib/bootria.min.js', (err, stdout, stderr) ->
    throw err if err
    console.log ' > BootRIA successfully optimized to lib/bootria.min.js'

task 'buildall', 'Build single application file from source files and libraries', ->
  combine coreFiles, "src", "coffee", (coreContents)->
    combine moduleFiles, "module", "coffee", (moduleContents)->
      compile "#{coreContents}\n\n#{moduleContents}", "lib/bootria", ->
        combine libFiles, "lib", "min.js", (libContents)->
          fs.writeFile './bootria-all.js', libContents, 'utf8', (err) ->
            throw err if err
            console.log ' > Libraries successfully combined to bootria-all.js'

task 'watch', 'Watch the source directory and recompile on change', ->
  console.log "Watching for changes in './src' and './module'"
  for file in coreFiles then do (file) ->
    fs.watchFile "./src/#{file}.coffee", { persistent: true, interval: 200 }, (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        console.log "./src/#{file}.coffee changed"
        invoke 'build'
  for file in moduleFiles then do (file) ->
    fs.watchFile "./module/#{file}.coffee", { persistent: true, interval: 200 }, (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        console.log "./module/#{file}.coffee changed"
        invoke 'build'