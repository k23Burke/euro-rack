import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  changeOscType,
  changeOscFreq,
  changeOscModFreq
} from './OscillatorActions'

export class Oscillator extends React.Component {
  constructor(props){
    super(props)
   // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      active: false
    }
  }

  onChangeInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
    const order = this.props.vco.get('flexOrder') ? this.props.vco.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='VCO'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.vco.get('typeOptions')}
          changeType={(v) => this.props.changeOscType(v, this.props.id)}
        />
        <DisplayAmount
          type='number'
          min={this.props.vco.get('min')}
          changeActive={() => this.onChangeInputActive()}
          max={this.props.vco.get('max')}
          value={this.props.vco.get('frequency')}
          changeValue={(v) => this.props.changeOscFreq(v, this.props.id, this.props.vco.getIn(['input', 'frequency']), this.props.vco.getIn(['input', 'cv']))}
          active={this.state.active}
          changeActive={() => this.onChangeInputActive()}
        />
        <Knob
          name='Frequency'
          min={this.props.vco.get('min')}
          max={this.props.vco.get('max')}
          value={this.props.vco.get('frequency')}
          degreesTotal={270}
          sensitivity={100}
          onNewValue={(v) => this.props.changeOscFreq(v, this.props.id, this.props.vco.getIn(['input', 'frequency']), this.props.vco.getIn(['input', 'cv']))}
        />
        {this.props.vco.get('type') === 'pwm'
          ?
            <Knob
              name='Modulation'
              min={0}
              max={200}
              value={this.props.vco.get('modulationFrequency')}
              degreesTotal={270}
              sensitivity={1000}
              onNewValue={(v) => this.props.changeOscModFreq(v, this.props.id)}
            />
          : null
        }
        <div className='oscillator-in-jack'>
          <Jack name='in to freq'
            color={this.props.vco.getIn(['input', 'frequency'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', this.props.vco.get('toneComponent').frequency, this.props.vco.getIn(['input', 'frequency']))}
          />
          <Jack name='cv'
            color={this.props.vco.getIn(['input', 'cvFrequency'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cvFrequency', this.props.vco.get('toneComponent').frequency, this.props.vco.getIn(['input', 'cvFrequency']))}
          />
          {this.props.vco.get('type') === 'pwm'
            ?
              <Jack name='pulse modulation'
                color={this.props.vco.getIn(['input', 'pwModulation'])}
                onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'pwModulation', this.props.vco.get('toneComponent').modulationFrequency, this.props.vco.getIn(['input', 'pwModulation']))}
              />
            : null
          }
        </div>
        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.vco.getIn(['output', 'sound'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.vco.get('toneComponent'), this.props.vco.getIn(['output', 'sound']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    vco: state.oscillators.get(props.id),
    currentJackColor: state.eurorack.get()
  }
}

export default connect(
  mapStateToProps,
  {
    changeOscType,
    changeOscFreq,
    changeOscModFreq
  }
)(Oscillator)