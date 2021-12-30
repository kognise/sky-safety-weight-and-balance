import { Polygon, WeightArm } from 'lib/calculator'

export interface MainInputs {
	empty: WeightArm,

	frontSeats: WeightArm,
	middleSeats: WeightArm,
	rearSeats: WeightArm,
	
	bags1: WeightArm,
	bags2: WeightArm,
}

export type DefaultInputs = { [K in keyof MainInputs]?: Partial<MainInputs[K]> } & { fuel?: Partial<WeightArm> }

export interface ModelPreset {
	name: string,
	defaultInputs: DefaultInputs,
	cgLimits: Polygon[],
	roughFuelBurn: number,
	roughFuelWeight: number,
}

export interface AircraftPreset {
	model: ModelPreset,
	defaultInputs: DefaultInputs,
}

export const models: Record<string, ModelPreset> = {
	C172N: {
		name: '1978 Cessna 172N',
		defaultInputs: {
			frontSeats: { arm: 37 },
			middleSeats: { weight: 0, arm: 0 },
			rearSeats: { arm: 73 },
			bags1: { arm: 95 },
			bags2: { arm: 123 },
			fuel: { arm: 46 }
		},
		cgLimits: [
			{
				name: 'normal',
				points: [
					[ 35, 1500 ],
					[ 35, 1950 ],
					[ 38.5, 2300 ],
					[ 47.3, 2300 ],
					[ 47.3, 1500 ]
				]
			},
			{
				name: 'utility',
				points: [
					[ 35, 1500 ],
					[ 35, 1950 ],
					[ 35.5, 2000 ],
					[ 40.5, 2000 ],
					[ 40.5, 1500 ]
				]
			}
		],
		roughFuelBurn: 7.1,
		roughFuelWeight: 6
	},
	C172P: {
		name: '1982 Cessna 172P',
		defaultInputs: {
			frontSeats: { arm: 37 },
			middleSeats: { weight: 0, arm: 0 },
			rearSeats: { arm: 73 },
			bags1: { arm: 95 },
			bags2: { arm: 123 },
			fuel: { arm: 48 }
		},
		cgLimits: [
			{
				name: 'normal',
				points: [
					[ 35, 1500 ],
					[ 35, 1950 ],
					[ 39.5, 2400 ],
					[ 47.3, 2400 ],
					[ 47.3, 1500 ]
				]
			},
			{
				name: 'utility',
				points: [
					[ 35, 1500 ],
					[ 35, 1950 ],
					[ 36.5, 2100 ],
					[ 40.5, 2100 ],
					[ 40.5, 1500 ]
				]
			}
		],
		roughFuelBurn: 7.4,
		roughFuelWeight: 6
	}
}

export const aircraft: Record<string, AircraftPreset> = {
	N3080E: {
		model: models.C172N,
		defaultInputs: {
			empty: { weight: 1496, arm: 39.91 },
			rearSeats: { weight: 3 },
			fuel: { weight: 300 }
		}
	},
	N739MY: {
		model: models.C172N,
		defaultInputs: {
			empty: { weight: 1469, arm: 39.33 },
			rearSeats: { weight: 3 },
			fuel: { weight: 240 }
		}
	},
	N24155: {
		model: models.C172P,
		defaultInputs: {
			empty: { weight: 1502.1, arm: 39.17 },
			rearSeats: { weight: 3 },
			fuel: { weight: 372 }
		}
	},
	N63681: {
		model: models.C172P,
		defaultInputs: {
			empty: { weight: 1533.9, arm: 38.79 },
			rearSeats: { weight: 3 },
			fuel: { weight: 240 }
		}
	}
}

export const mergeDefaultInputs = <T>(a: T, b: T): T => {
	const result: T = { ...a }
	for (const key of Object.keys(b)) {
		result[key as keyof T] = { ...result[key as keyof T], ...b[key as keyof T] }
	}
	return result
}
