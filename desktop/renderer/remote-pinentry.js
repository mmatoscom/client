// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import RemoteComponent from './remote-component'
import {registerPinentryListener, onCancel, onSubmit} from '../shared/actions/pinentry'

import type {TypedState} from '../shared/constants/reducer'
import type {PinentryState} from '../shared/reducers/pinentry'
import type {GUIEntryFeatures} from '../shared/constants/types/flow-types'

type Props = {
  registerPinentryListener: () => void,
  onCancel: (sessionID: number) => void,
  onSubmit: (sessionID: number, passphrase: string, features: GUIEntryFeatures) => void,
  pinentryStates: {[key: string]: PinentryState}
}

class RemotePinentry extends Component<void, Props, void> {
  componentWillMount () {
    this.props.registerPinentryListener()
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.pinentryStates !== this.props.pinentryStates
  }

  render () {
    const {pinentryStates} = this.props

    return (
      <div>
        {Object.keys(pinentryStates).filter(sid => !pinentryStates[sid].closed).map(pSessionID => {
          const sid = parseInt(pSessionID, 10)
          return (
            <RemoteComponent
              title='Pinentry'
              windowsOpts={{width: 500, height: 260}}
              waitForState={true}
              onRemoteClose={() => this.props.onCancel(sid)}
              component='pinentry'
              key={'pinentry:' + pSessionID}
              onSubmit={(passphrase, features) => this.props.onSubmit(sid, passphrase, features)}
              onCancel={() => this.props.onCancel(sid)}
              sessionID={sid} />
          )
        })}
      </div>
    )
  }
}

export default connect(
  (state: TypedState, ownProps: {}) => ({
    pinentryStates: state.pinentry.pinentryStates || {},
  }),
  (dispatch: any, ownProps: {}) => ({
    registerPinentryListener: () => dispatch(registerPinentryListener()),
    onCancel: (sid: number) => dispatch(onCancel(sid)),
    onSubmit: (sid: number, passphrase: string, features: GUIEntryFeatures) => dispatch(onSubmit(sid, passphrase, features)),
  })
)(RemotePinentry)

