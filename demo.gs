const demo = () => {
  // trivial example gets all files on drive at given folder
  // strict means it will fail if unhandled events are emitted and also self clean
  // normal value is false if you don't intend to handle all emitted events
  const strict = false

  // we'll use this to be signalled on intersting happenings
  const emitter = Exports.newEmitter(strict)

  // set up events
  emitter.on('start', (folder) => {
    console.log('starting listing at', folder.getName())
  })

  emitter.on('file', (file, folder) => {
    console.log(`..found file ${file.getName()} in folder ${folder.getName()}`)
  })


  emitter.on('end', () => {
    console.log(`...finished`)
  })

  // what we get back is an emitter
  lister({
    folder: DriveApp.getRootFolder(),
    emitter
  })

  // all the code is in the event handlers - no need to write anything else

}
/**
 * find all the files in a folder structure
 * @param {object} p params
 * @param {Drive.File} p.folder the folder to start looking at
 * @param {BmEmitter} p.emitter instance of an emitter
 * @returns void
 */
const lister = ({ emitter, folder }) => {

  // we're starting
  emitter.emit('start', folder)

  // get all the files in the folder
  const files = folder.getFiles()


  while (files.hasNext()) {
    const file = files.next()
    // signal that we found a file
    emitter.emit('file', file, folder)
  }
  emitter.emit('end')

}


