# lime
A simple dependency injection module 

The purpose of this is to resolve functions (both sync and async) in an on demand fashion (ie lazy). 

# Try

var Injector = require('lime').Injector;

let app = new Injector()
app.add('multiply', [() => (a, b) => a * b])

app.add('la', ['multiply', (multiply) => {
  console.log(multiply); // outputs multiply function above
  return multiply(11,12)
}])

app.add('user', ['http', http => http.get('/api/user/1')])
app.add('username', ['user', user => user.username])
