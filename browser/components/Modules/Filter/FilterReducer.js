export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'filters') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}

		case 'CHANGE_FIL_TYPE' :
			return state.setIn([action.id, 'type'], action.filterType )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										fil.type = action.filterType
										return fil
									})
		case 'CHANGE_FIL_FREQ' :
			return state.setIn([action.id, 'frequency'], action.frequency )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										fil.frequency.value = action.frequency
										return fil
									})
		case 'CHANGE_FIL_ROLLOFF' :
			return state.setIn([action.id, 'rolloff'], action.rolloff )
									.updateIn([action.id, 'toneComponent'], (fil) => {
										fil.rolloff = action.rolloff
										return fil
									})
	}
	return state
}