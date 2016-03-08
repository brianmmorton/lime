
class Provider {
  constructor (skeleton) {
    this.deps = skeleton.slice(0, skeleton.length - 1)
    this.fn = skeleton[skeleton.length - 1]
  }
}

class Injector {

  constructor () {
    this.providers = new Map()
  }

  add (token, skeleton) {
    this.providers.set(token, new Provider(skeleton))
  }

  get (token) {
    let p = this.providers.get(token)
    if (!p) {
      throw "Provider not found"
    }
    else {
      return p
    }
  }

  run (token) {
    let provider = this.get(token)
    let deps = provider.deps

    let args = []
    for (let dep of deps) {
      let result = Promise.resolve(this.run(dep))
      args.push(result)
    }

    return Promise.all(args).then(resArgs => {
      return provider.fn(...resArgs)
    })
  }

}

export {
  Injector
}
