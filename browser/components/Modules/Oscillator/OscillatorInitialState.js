import Tone from 'tone'

const initialState = () => {
	return {
		toneComponent: new Tone.OmniOscillator(200, 'sine').start(),
		flexOrder: 0,
	  min: 0,
	  max: 1000,
		frequency: 200,
		type: 'sine',
		// toneRangeStart: [8.176, 16.3515, 32.703, 65.406, 130.813],
		typesArray: ['sine', 'triangle', 'sawtooth', 'pwm'],
		input: {
			frequency: {
				attention: false,
				color: null
			},
			pwModulation: {
				attention: false,
				color: null
			},
			cvFrequency: {
				attention: false,
				color: null
			}
		},
		output: {
			sine: {
				attention: false,
				color: null,
				toneComponent: new Tone.OmniOscillator(200, 'sine').start()
			},
			triangle: {
				attention: false,
				color: null,
				toneComponent: new Tone.OmniOscillator(200, 'triangle').start()
			},
			sawtooth: {
				attention: false,
				color: null,
				toneComponent: new Tone.OmniOscillator(200, 'sawtooth').start()
			},
			pwm: {
				attention: false,
				color: null,
				modulationFrequency: 0,
				toneComponent: new Tone.OmniOscillator(200, 'pwm').start()
			}
		}
	}
}

export default initialState