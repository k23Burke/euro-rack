import React from 'react'
import { connect } from 'react-redux'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import ModuleContainer from '../../ModuleComponents/ModuleContainer'
import DisplayAmount from '../../ModuleComponents/DisplayAmount'
import DisplayTypeDropdown from '../../ModuleComponents/DisplayTypeDropdown'
import Knob from '../../ModuleComponents/Knob'
import Jack from '../../ModuleComponents/Jack'
import {
  changeVCAGain,
  initializeVCA
} from './VCAActions'

export class VCA extends React.Component {
  constructor(props){
    super(props)
   // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      activeOutput: false,
      activeInput1: false,
      activeInput2: false
    }
  }

  componentDidMount() {
    this.props.initializeVCA(this.props.id)
  }

  onChangeInputActive(which) {
    this.setState({[which]: !this.state[which]})
  }

  render(){
    const order = this.props.vca.get('flexOrder') ? this.props.vca.get('flexOrder') : this.props.order
    return (
      <ModuleContainer
        name='VCA'
        id={this.props.id}
        order={order}
        changeOrder={(n) => this.props.changeOrder(n)}
      >
        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='cv1'
              color={this.props.vca.getIn(['input', 'cv1'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cv1', this.props.vca.get('outputToneComponent').gain, this.props.vca.getIn(['input', 'cv1']))}
            />
          </div>
          <div className='paired-knob'>
            <DisplayAmount
              type='number'
              min={this.props.vca.get('min')}
              changeActive={() => this.onChangeInputActive()}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('outputValue') / 1000}
              changeValue={(v) => this.props.changeVCAGain(v, this.props.id, 'outputValue')}
              active={this.state.activeOutput}
              changeActive={() => this.onChangeInputActive('activeOutput')}
            />
            <Knob
              name='Gain'
              min={this.props.vca.get('min')}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('outputValue')}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeVCAGain(v, this.props.id, 'outputValue')}
            />
          </div>
        </div>

        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='Audio In 1'
              color={this.props.vca.getIn(['input', 'audioIn1'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'audioIn1', this.props.vca.get('input1ToneComponent'), this.props.vca.getIn(['input', 'audioIn1']))}
            />
          </div>
          <div className='paired-knob'>
            <DisplayAmount
              type='number'
              min={this.props.vca.get('min')}
              changeActive={() => this.onChangeInputActive()}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('input1Value') / 1000}
              changeValue={(v) => this.props.changeVCAGain(v, this.props.id, 'input1Value')}
              active={this.state.activeInput1}
              changeActive={() => this.onChangeInputActive('activeInput1')}
            />
            <Knob
              name='Gain'
              min={this.props.vca.get('min')}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('input1Value')}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeVCAGain(v, this.props.id, 'input1Value')}
            />
          </div>
        </div>

        <div className='jack-knob-pair clearfix'>
          <div className='paired-jack'>
            <Jack name='Audio In 2'
              color={this.props.vca.getIn(['input', 'audioIn2'])}
              onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'audioIn2', this.props.vca.get('input2ToneComponent'), this.props.vca.getIn(['input', 'audioIn2']))}
            />
          </div>
          <div className='paired-knob'>
            <DisplayAmount
              type='number'
              min={this.props.vca.get('min')}
              changeActive={() => this.onChangeInputActive()}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('input2Value') / 1000}
              changeValue={(v) => this.props.changeVCAGain(v, this.props.id, 'input2Value')}
              active={this.state.activeInput2}
              changeActive={() => this.onChangeInputActive('activeInput2')}
            />
            <Knob
              name='Gain'
              min={this.props.vca.get('min')}
              max={this.props.vca.get('max')}
              value={this.props.vca.get('input2Value')}
              degreesTotal={270}
              sensitivity={100}
              onNewValue={(v) => this.props.changeVCAGain(v, this.props.id, 'input2Value')}
            />
          </div>
        </div>

        <div className='oscillator-out-jack'>
          <Jack name='out'
            color={this.props.vca.getIn(['output', 'audio'])}
            onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'output', 'audio', this.props.vca.get('outputToneComponent'), this.props.vca.getIn(['output', 'audio']))}
          />
        </div>
      </ModuleContainer>
    )
  }
        // <div className='oscillator-in-jack'>
        //   <Jack name='cv2'
        //     color={this.props.vca.getIn(['input', 'cv2'])}
        //     onJackClick={(e) => this.props.onJackClick(e, this.props.id, 'input', 'cv2', this.props.vca.get('outputToneComponent').gain, this.props.vca.getIn(['input', 'cv2']))}
        //   />
        // </div>
}

function mapStateToProps(state, props) {
  return {
    vca: state.vcas.get(props.id)
  }
}

export default connect(
  mapStateToProps,
  {
    changeVCAGain,
    initializeVCA
  }
)(VCA)