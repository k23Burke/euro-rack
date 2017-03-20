import uuid from 'uuid'
import { fromJS } from 'immutable'

import MIDIInitialStateCreator from './MIDIInitialState'


export default (state = {}, action) => {
	switch(action.type) {
		case 'ADD_MIDI' :
			const newID = uuid.v4()
			return state.set(newID, fromJS(MIDIInitialStateCreator()))

		case 'CONNECT_JACK' :
			if (action.module === 'midis') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'midis') {
				return state.setIn([action.inputId, 'input', action.inputCvName], null)
			} else if (action.outputModule === 'midis') {
				return state.setIn([action.outputId, 'output', action.outputCvName], null)
			} else {
				return state
			}
		case 'MIDI_CONNECTION_ERROR' :
			return state.setIn([action.id, 'error'], action.error)
		case 'SET_MIDI_INPUT' :
			return state.setIn([action.id, 'inputDevice'], action.input)
									.setIn([action.id, 'error'], null)
		case 'MIDI_GATE_ATTACK_TRIGGER' :
			return state = state.setIn([action.id, 'freq'], action.freq)
		case 'MIDI_GATE_RELEASE_TRIGGER' :
			// TODO: not sure yet
			return state
	}
	return state
}