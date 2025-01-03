function test() {

  const t = Exports.newUnit({
    showErrorsOnly: true
  })

  t.section(() => {
    const e = Exports.newEmitter()
    t.is(e instanceof Exports.libExports.BmEmitter, true)
    t.is(e.eventNames.length, 0)
  }, {
    description: 'make new emitter'
  })

  t.section(() => {
    const e = Exports.newEmitter()
    e.on('coo', () => {
    })
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('coo'), 1)
  }, {
    description: "make an event and listener"
  });

  t.section(() => {
    const e = Exports.newEmitter()
    let x = 0
    e.on('foo', () => {
      x++
    })
    e.on('foo', () => {
      x++
    })
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('foo'), 2)
    e.emit('foo')
    t.is(x, 2)
  }, {
    description: "add listener to existing event"
  });

  t.section(() => {
    const e = Exports.newEmitter()
    let x = 0
    const func = () => {
      x++
    }
    e.on('bar', func)
    e.on('bar', func)
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('bar'), 1)
    e.emit('bar')
    t.is(x, 1)
  }, {
    description: 'add same listener to existing event'
  });

  t.section(() => {
    const e = Exports.newEmitter()
    let x = 0
    const func = (y) => {
      x += y
    }
    e.on('far', func)
    e.emit('far', 10)
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('far'), 1)
    t.is(x, 10)
  }, {
    description: 'check emit takes args'
  });

  t.section(() => {
    const e = Exports.newEmitter(true)
    let x = 0
    const func = () => {
      x++
    }
    e.on('rar', func)
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('rar'), 1)

    // check it fails if we omit the listener code
    t.is(t.threw(() => e.off('rar', null)).toString(), "Error: value is not a function - it's object")
    e.off('rar', func)

    // check it fails now as its gone
    t.is(t.threw(() => e.emit('rar')).toString(), "Error: event rar doesn't exist")
    t.is(e.eventNames.length, 0)
    t.is(t.threw(() => e.listenerCount('rar')).toString(), "Error: event rar doesn't exist")
  }, {
    description: 'remove an event with strict'
  });

  t.section(() => {
    const e = Exports.newEmitter(true)
    let x = 0
    const func = () => {
      x++
    }
    e.once('oar', func)
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('oar'), 1)

    e.emit('oar')

    // check it fails now as its gone
    t.is(t.threw(() => e.emit('oar')).toString(), "Error: event oar doesn't exist")
    t.is(e.eventNames.length, 0)
    t.is(t.threw(() => e.listenerCount('oar')).toString(), "Error: event oar doesn't exist")


  }, {
    description: 'event fires only once with strict'
  });

  t.section(() => {
    const e = Exports.newEmitter(true)
    let x = 0
    const func = () => {
      x++
    }
    e.on('tar', func)
    t.is(e.eventNames.length, 1)
    t.is(e.listenerCount('tar'), 1)

    // also removes the event
    e.removeAllListeners('tar')

    // check it fails now as its gone
    t.is(t.threw(() => e.emit('tar')).toString(), "Error: event tar doesn't exist")
    t.is(e.eventNames.length, 0)
    t.is(t.threw(() => e.listenerCount('tar')).toString(), "Error: event tar doesn't exist")


  }, {
    description: 'remove all listeners with strict'
  });

  t.report()
}

/*




test('remove all listeners with strict', t => {
  const e = new BmEmitter(true)
  let x = 0
  const func = ()=> {
    x++
  }
  e.on ('tar', func)
  t.is (e.eventNames.length, 1)
  t.is (e.listenerCount('tar'), 1)

  // also removes the event
  e.removeAllListeners ('tar')

  // check it fails now as its gone
  t.throws (()=>e.emit ('tar') )
  t.is (e.eventNames.length, 0)
  t.throws (()=>e.listenerCount('tar'))
 
});


}
*/