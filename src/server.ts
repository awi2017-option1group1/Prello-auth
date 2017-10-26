import { createConnection } from 'typeorm'
import  { fromConfig } from './database'

import { app } from './app'

createConnection(fromConfig())
.then(async connection => {
    app.listen(app.get('port'), () => {
        console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'))
        console.log('Press CTRL-C to stop\n')
    })
}).catch(error => console.log(error))
