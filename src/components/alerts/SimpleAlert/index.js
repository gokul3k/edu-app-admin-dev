import React from 'react'
import Alert from '@material-ui/lab/Alert';

export default function SimpleAlert({severity,msg}) {

    return (
        <div>
              <Alert severity={severity}>{msg}</Alert>
        </div>
    )
}
