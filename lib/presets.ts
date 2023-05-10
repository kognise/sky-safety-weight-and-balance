import { Polygon, WeightArm } from 'lib/calculator'

export interface MainInputs {
	empty: WeightArm;

	frontSeats: WeightArm;
	middleSeats: WeightArm;
	rearSeats: WeightArm;

	bags1: WeightArm;
	bags2: WeightArm;
}

export type DefaultInputs = {
	[K in keyof MainInputs]?: Partial<MainInputs[K]>;
} & { fuel?: Partial<WeightArm> };

export interface ModelPreset {
	name: string;
	defaultInputs: DefaultInputs;
	cgLimits: Polygon[];
	roughFuelBurn: number;
	roughFuelWeight: number;
}

export interface AircraftPreset {
	model: ModelPreset;
	defaultInputs: DefaultInputs;
	customCgLimits?: Polygon[];
	customRoughFuelBurn?: number;
}

export const models: Record<string, ModelPreset> = {
	C172M: {
		name: 'Cessna 172M (1975)',
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
		roughFuelBurn: 6.9,
		roughFuelWeight: 6
	},
	C172N: {
		name: 'Cessna 172N (1978)',
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
		name: 'Cessna 172P (1982)',
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
		roughFuelBurn: 7.3,
		roughFuelWeight: 6
	},
	C172R: {
		name: 'Cessna 172R (1996)',
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
					[ 40.5, 2450 ],
					[ 47.4, 2450 ],
					[ 47.4, 1500 ]
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
		roughFuelBurn: 8.1,
		roughFuelWeight: 6
	},
	C172S: {
		name: 'Cessna 172S (1998)',
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
					[ 41, 2550 ],
					[ 47.3, 2550 ],
					[ 47.3, 1500 ]
				]
			},
			{
				name: 'utility',
				points: [
					[ 35, 1500 ],
					[ 35, 1950 ],
					[ 37.5, 2200 ],
					[ 40.5, 2200 ],
					[ 40.5, 1500 ]
				]
			}
		],
		roughFuelBurn: 8.5,
		roughFuelWeight: 6
	}
}

export const aircraft: Record<string, AircraftPreset> = {
	N3080E: {
		model: models.C172N,
		defaultInputs: {
			empty: { weight: 1496, arm: 39.91 },
			fuel: { weight: 300 }
		}
	},
	N739MY: {
		model: models.C172N,
		defaultInputs: {
			empty: { weight: 1469, arm: 39.33 },
			fuel: { weight: 240 }
		}
	},
	N24155: {
		model: models.C172P,
		defaultInputs: {
			empty: { weight: 1502.1, arm: 39.17 },
			fuel: { weight: 372 }
		}
	},
	N63681: {
		model: models.C172P,
		defaultInputs: {
			empty: { weight: 1533.9, arm: 38.79 },
			fuel: { weight: 240 }
		}
	},
	N543TH: {
		model: models.C172S,
		defaultInputs: {
			empty: { weight: 1696.0, arm: 41.74 },
			fuel: { weight: 336 }
		}
	},
	N992VT: {
		model: models.C172S,
		defaultInputs: {
			empty: { weight: 1650.0, arm: 38.92 },
			fuel: { weight: 336 }
		}
	},
	N364SP: {
		model: models.C172S,
		defaultInputs: {
			empty: { weight: 1635.0, arm: 40.58 },
			fuel: { weight: 336 }
		}
	},
	N298ME: {
		model: models.C172S,
		defaultInputs: {
			empty: { weight: 1692.77, arm: 40.28 },
			fuel: { weight: 336 }
		}
	},
	N959JA: {
		model: models.C172S,
		defaultInputs: {
			empty: { weight: 1692.86, arm: 40.98 },
			fuel: { weight: 336 }
		}
	}
	// N64AF: {
	// 	model: models.C172R,
	// 	defaultInputs: {
	// 		empty: { weight: 1665.21, arm: 39.63 },
	// 		fuel: { weight: _ }
	// 	},
	// 	customCgLimits: [
	// 		{
	// 			name: 'normal',
	// 			points: [
	// 				[ 35, 1500 ],
	// 				[ 35, 1950 ],
	// 				[ 41, 2550 ],
	// 				[ 47.3, 2550 ],
	// 				[ 47.3, 1500 ]
	// 			]
	// 		},
	// 		{
	// 			name: 'utility',
	// 			points: [
	// 				[ 35, 1500 ],
	// 				[ 35, 1950 ],
	// 				[ 36.5, 2100 ],
	// 				[ 40.5, 2100 ],
	// 				[ 40.5, 1500 ]
	// 			]
	// 		}
	// 	]
	// },
	// N785BG: {
	// 	model: models.C172R,
	// 	defaultInputs: {
	// 		empty: { weight: 1635.0, arm: 39.15 },
	// 		fuel: { weight: _ }
	// 	},
	// 	customCgLimits: [
	// 		{
	// 			name: 'normal',
	// 			points: [

	// 	]
	// },
	// N738PV: {
	// 	model: models.C172N,
	// 	defaultInputs: {
	// 		empty: { weight: 1437.2, arm: 38.86 },
	// 		fuel: { weight: _ }
	// 	}
	// },
	// N9698V: {
	// 	model: models.C172M,
	// 	defaultInputs: {
	// 		empty: { weight: 1524.94, arm: 38.46 },
	// 		fuel: { weight: _ }
	// 	}
	// },
	// N73345: {
	// 	model: models.C172M,
	// 	defaultInputs: {
	// 		empty: { weight: 1448.48, arm: 38.96 },
	// 		fuel: { weight: _ }
	// 	}
	// }
}

export const mergeDefaultInputs = <T extends object>(a: T, b: T): T => {
	const result: T = { ...a }
	for (const key of Object.keys(b)) {
		result[key as keyof T] = {
			...result[key as keyof T],
			...b[key as keyof T]
		}
	}
	return result
}
