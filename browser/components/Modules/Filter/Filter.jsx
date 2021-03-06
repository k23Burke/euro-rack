import React from 'react'
import { connect } from 'react-redux'
import Tone from 'tone'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import KnobAndAmount from '../../ModuleComponents/KnobAndAmount'
import Jack from '../../ModuleComponents/Jack'
import {
  removeFilter,
  changeFilType,
  changeFilFreq,
  changeFilRolloff,
  changeFilResonace
} from './FilterActions'

export class Filter extends React.Component {
  constructor(props){
    super(props)
    this.state = { active: false }
  }

  onChangeInputActive() {
    this.setState({active: !this.state.active})
  }

  render(){
    const order = this.props.fil.get('flexOrder') ? this.props.fil.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='Filter'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
        removeModule={this.props.removeModule}
        removeModuleFunction={() => this.props.removeFilter(this.props.id)}
      >
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('typeOptions')}
          changeType={(v) => this.props.changeFilType(this.props.id, v)}
        />
        <DisplayTypeDropdown
          optionTypes={this.props.fil.get('rolloffOptions')}
          changeType={(v) => this.props.changeFilRolloff(this.props.id, v)}
        />
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='freq cv'
              attention={this.props.fil.getIn(['input', 'frequency', 'attention'])}
              color={this.props.fil.getIn(['input', 'frequency', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'frequency', this.props.fil.get('toneComponent').frequency, this.props.fil.getIn(['input', 'frequency', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Frequency'
              min={this.props.fil.get('min')}
              max={this.props.fil.get('max')}
              value={this.props.fil.get('frequency')}
              suffix='Hz'
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeFilFreq(this.props.id, v)}
            />
          </div>
        </div>
        <div className='jack-knob-pair clearfix no-amount-pair'>
          <div className='paired-jack'>
            <Jack name='res cv'
              attention={this.props.fil.getIn(['input', 'resonance', 'attention'])}
              color={this.props.fil.getIn(['input', 'resonance', 'color'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'resonance', this.props.fil.get('toneComponent').Q, this.props.fil.getIn(['input', 'resonance', 'color']))}
            />
          </div>
          <div className='paired-knob'>
            <KnobAndAmount
              name='Resonance'
              min={this.props.fil.get('minQ')}
              max={this.props.fil.get('maxQ')}
              value={this.props.fil.get('q')}
              hideDisplay={true}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeFilResonace(this.props.id, (v))}
            />
          </div>
        </div>
        <div className='filter-in-jack'>
          <Jack name='audio in'
            attention={this.props.fil.getIn(['input', 'sound', 'attention'])}
            color={this.props.fil.getIn(['input', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'sound', this.props.fil.get('toneComponent'), this.props.fil.getIn(['input', 'sound', 'color']))}
          />
        </div>
        <div className='filter-out-jack'>
          <Jack name='out'
            attention={this.props.fil.getIn(['output', 'sound', 'attention'])}
            color={this.props.fil.getIn(['output', 'sound', 'color'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'sound', this.props.fil.get('toneComponent'), this.props.fil.getIn(['output', 'sound', 'color']))}
          />
        </div>
      </ModuleContainer>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    fil: state.filters.get(props.id),
    removeModule: state.eurorack.get('addModules')
  }
}

export default connect(
  mapStateToProps,
  {
    removeFilter,
    changeFilType,
    changeFilFreq,
    changeFilRolloff,
    changeFilResonace
  }
)(Filter)
