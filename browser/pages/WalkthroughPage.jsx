import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import EuroRack from '../components/EuroRack/EuroRack'
import WalkthroughText from '../components/Walkthrough/WalkthroughText'
import { addOscillator } from '../components/Modules/Oscillator/OscillatorActions'
import { addLFO } from '../components/Modules/LFO/LFOActions'
import { addEnvelope } from '../components/Modules/Envelope/EnvelopeActions'
import { addFilter } from '../components/Modules/Filter/FilterActions'
import { addVCA } from '../components/Modules/VCA/VCAActions'
import { walkthrough, walkthroughStep } from '../components/Walkthrough/WalkthroughActions'

export class WalkthroughPage extends React.Component {
  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      walkthrough: new walkthrough('Initial Introduction', props.walkthroughStep)
    }
  }

  componentWillMount() {
    this.props.addOscillator()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.oscillators && !prevProps.oscillators.size) {
      this.state.walkthrough.nextStep()
    }
    if (this.state.walkthrough.currentStep > -1 &&
        this.state.walkthrough.steps[this.state.walkthrough.currentStep].stepCompleted(this.props.state)
      ) {
      console.log('completed?', this.state.walkthrough.steps[this.state.walkthrough.currentStep].stepCompleted(this.props.state))
      this.state.walkthrough.nextStep()
    }
  }

  render () {
    return (
      <div>
        <EuroRack AddModules={false} />
        <WalkthroughText/>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    state: state,
    oscillators: state.oscillators
  }
}

export default connect(
  mapStateToProps,
  {
    walkthroughStep,
    addOscillator,
    addLFO,
    addEnvelope,
    addFilter,
    addVCA
 }
)(WalkthroughPage)
