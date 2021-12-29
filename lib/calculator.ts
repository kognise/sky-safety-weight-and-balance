export interface WeightArm {
	weight: number,
	arm: number,
}

export interface WeightMoment {
	weight: number,
	moment: number,
}

export interface WeightArmMoment {
	weight: number,
	arm: number,
	moment: number,
}

export type Point = [ number, number ]

export interface Polygon {
	name: string,
	points: Point[],
}

type TransmuteResult<T> =
	T extends WeightArm ? WeightMoment :
	T extends WeightMoment ? WeightArm :
	never

export const nan0 = (input: number): number => isNaN(input) ? 0 : input

export const transmute = <T extends WeightArm | WeightMoment>(weightThing: T): TransmuteResult<T> => {
	if ('arm' in weightThing) {
		return {
			weight: weightThing.weight,
			moment: weightThing.weight * (weightThing as WeightArm).arm
		} as TransmuteResult<T>
	} else {
		return {
			weight: weightThing.weight,
			arm: nan0((weightThing as WeightMoment).moment / weightThing.weight)
		} as TransmuteResult<T>
	}
}

export const sum = (...inputs: WeightArm[]): WeightArmMoment => {
	const wm: WeightMoment = { weight: 0, moment: 0 }
	for (const { weight, arm } of inputs) {
		wm.weight += weight
		wm.moment += weight * arm
	}
	return {
		...wm,
		arm: nan0(wm.moment / wm.weight)
	}
}

const pointInPolygon = ([ x, y ]: Point, polygon: Polygon) => {
	let inside = false
	for (let i = 0, j = polygon.points.length - 1; i < polygon.points.length; j = i++) {
		const [ xi, yi ] = polygon.points[i]
		const [ xj, yj ] = polygon.points[j]
        
		const intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
		if (intersect) inside = !inside
	}
	return inside
}

export const findPolygons = (polygons: Polygon[], point: Point): string[] =>
	polygons.filter((polygon) => pointInPolygon(point, polygon)).map(({ name }) => name)
