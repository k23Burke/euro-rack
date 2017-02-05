export function changeCurve(id, curveType) {
	return {
		type: 'CHANGE_ENV_CURVE_TYPE',
		id,
		curveType
	}
}

export function changeValue(id, component, value) {
	return {
		type: 'CHANGE_ENV_COMP_VALUE',
		id,
		component,
		value
	}
}