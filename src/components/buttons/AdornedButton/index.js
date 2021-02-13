import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
const styles =(theme) => ({
  root: {
    marginLeft: 15
  },

})
const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={20}
  />
))
export default function AdornedButton(props) {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <Button {...rest} >
      {!loading&&children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  )
}