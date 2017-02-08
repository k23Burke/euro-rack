import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  changeCurve,
  changeValue
} from './EnvelopeActions'

export class EnvelopeGenerator extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const order = this.props.env.get('flexOrder') ? this.props.env.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='Envelope'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.env.get('curveOptions')}
          changeType={(v) => this.onChangeType(this.props.id, v)}
        />
        <Knob
          name='attack'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('attack')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'attack', v)}
        />
        <Knob
          name='decay'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('decay')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'decay', v)}
        />
        <Knob
          name='sustain'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('sustain')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'sustain', v)}
        />
        <Knob
          name='release'
          min={this.props.env.get('min')}
          max={this.props.env.get('max')}
          value={this.props.env.get('release')}
          degreesTotal={180}
          sensitivity={100}
          onNewValue={(v) => this.props.changeValue(this.props.id, 'release', v)}
        />
        <div className='envelope-in-jack'>
          <Jack name='trigger'
            color={this.props.env.getIn(['input', 'trigger'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'trigger', this.props.env.get('toneComponent'), this.props.env.getIn(['input', 'trigger']))}
          />
          <Jack name='in'
            color={this.props.env.getIn(['input', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.env.get('toneComponent'), this.props.env.getIn(['input', 'sound']))}
          />
        </div>
        <div className='envelope-out-jack'>
          <Jack name='out'
            color={this.props.env.getIn(['output', 'amplitude1'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'amplitude1', this.props.env.get('toneComponent'), this.props.env.getIn(['output', 'amplitude1']))}
          />
          <Jack name='out'
            color={this.props.env.getIn(['output', 'amplitude2'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'amplitude2', this.props.env.get('toneComponent'), this.props.env.getIn(['output', 'amplitude2']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    env: state.envelopes.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    changeCurve,
    changeValue
  }
)(EnvelopeGenerator)
