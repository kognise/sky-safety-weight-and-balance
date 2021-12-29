import { FC, useEffect, useState } from 'react'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { MainInputs, mergeDefaultInputs } from 'lib/presets'
import { Popover } from 'react-tiny-popover'
import { WeightArm, findPolygons, sum } from 'lib/calculator'
import { aircraft } from 'lib/presets'
import { useLocalState } from 'lib/hooks'

const mainInputsLabels: { [key in keyof MainInputs]: string } = {
	empty: 'Empty A/C',

	frontSeats: 'Front seats',
	middleSeats: 'Middle seats',
	rearSeats: 'Rear seats',

	bags1: 'Bags 1',
	bags2: 'Bags 2'
}

const IndexPage: FC = () => {
	const [ mainInputs, setMainInputs ] = useLocalState<MainInputs>('mainInputs', {
		empty: { weight: 0, arm: 0 },

		frontSeats: { weight: 0, arm: 0 },
		middleSeats: { weight: 0, arm: 0 },
		rearSeats: { weight: 0, arm: 0 },

		bags1: { weight: 0, arm: 0 },
		bags2: { weight: 0, arm: 0 }
	})
	const dryWeight = sum(...Object.values(mainInputs))

	const [ presetName, setPresetName ] = useLocalState('presetName', Object.keys(aircraft)[0])
	const preset = aircraft[presetName]
	const { cgLimits, roughFuelBurn, roughFuelWeight } = preset.model

	const [ fuel, setFuel ] = useLocalState<WeightArm>('fuel', { weight: 0, arm: 0 })
	const [ fuelGal, setFuelGal ] = useLocalState<number>('fuelGal', 0)
	useEffect(() => setFuel((val) => ({ ...val, weight: fuelGal * roughFuelWeight })), [ fuelGal, roughFuelWeight ])

	const [ taxiFuelGal, setTaxiFuelGal ] = useLocalState<number>('taxiFuelGal', 2)
	const takeoff = sum(dryWeight, fuel, { weight: -taxiFuelGal * roughFuelWeight, arm: fuel.arm })
	
	const [ flightFuelHrs, setFlightFuelHrs ] = useLocalState<number>('flightFuelHrs', 1)
	const landing = sum(takeoff, { weight: -flightFuelHrs * roughFuelBurn * roughFuelWeight, arm: fuel.arm })

	const takeoffSafe = findPolygons(cgLimits, [ takeoff.arm, takeoff.weight ])
	const [ takeoffSafeOpen, setTakeoffSafeOpen ] = useState(false)
	const landingSafe = findPolygons(cgLimits, [ landing.arm, landing.weight ])
	const [ landingSafeOpen, setLandingSafeOpen ] = useState(false)

	useEffect(() => {
		const { fuel, ...defaultInputs } = mergeDefaultInputs(preset.model.defaultInputs, preset.defaultInputs)
		setMainInputs((val) => mergeDefaultInputs(val, defaultInputs) as MainInputs)
		if (fuel?.arm) setFuel((val) => ({ ...val, arm: fuel.arm as number }))
		if (fuel?.weight) setFuelGal(parseFloat((fuel.weight / roughFuelWeight).toFixed(2)))
	}, [ presetName ])

	return (
		<main>
			<h1>Sky Safety W&amp;B</h1>

			<div className='preset-container'>
				<label htmlFor='preset-input'>Preset:</label>{' '}
				<select id='preset-input' value={presetName} onChange={(event) => setPresetName(event.target.value)}>
					{Object.entries(aircraft).map(([ key, value ]) => (
						<option key={key} value={key}>
							{key} ({value.model.name})
						</option>
					))}
				</select>
			</div>

			<table>
				<thead>
					<tr>
						<th style={{ width: '22%' }}>Item</th>
						<th style={{ width: '38%' }}>Weight</th>
						<th style={{ width: '20%' }}>Arm</th>
						<th style={{ width: '20%' }}>Moment</th>
					</tr>
				</thead>

				<tbody>
					{Object.entries(mainInputs).map(([ _key, value ]: [ string, WeightArm ]) => {
						const key = _key as keyof MainInputs
						return (
							<tr key={key}>
								<th>{mainInputsLabels[key]}</th>
								<td>
									<input
										type='number'
										min={0}
										value={mainInputs[key].weight}
										onChange={(event) => setMainInputs({
											...mainInputs,
											[key]: {
												...value,
												weight: parseFloat(event.target.value)
											}
										})}
									/>
								</td>
								<td>
									<input
										type='number'
										min={0}
										value={mainInputs[key].arm}
										onChange={(event) => setMainInputs({
											...mainInputs,
											[key]: {
												...value,
												arm: parseFloat(event.target.value)
											}
										})}
									/>
								</td>
								<td>{(value.weight * value.arm).toFixed(2)}</td>
							</tr>
						)
					})}

					<tr className='result'>
						<th>Weight (no fuel)</th>
						<td>{dryWeight.weight.toFixed(2)}</td>
						<td>{dryWeight.arm.toFixed(2)}</td>
						<td>{dryWeight.moment.toFixed(2)}</td>
					</tr>

					<tr>
						<th>Fuel</th>
						<td>
							<input
								type='number' min={0} value={fuelGal}
								onChange={(event) => setFuelGal(parseFloat(event.target.value))}
								style={{ maxWidth: '5ch' }}
							/>
							&nbsp;gal = {fuel.weight.toFixed(2)}
						</td>
						<td>
							<input
								type='number' min={0} value={fuel.arm}
								onChange={(event) => setFuel({ ...fuel, arm: parseFloat(event.target.value) })}
							/>
						</td>
						<td>{(fuel.weight * fuel.arm).toFixed(2)}</td>
					</tr>

					<tr>
						<th>Start/taxi fuel</th>
						<td>
							<input
								type='number' min={0} value={taxiFuelGal}
								onChange={(event) => setTaxiFuelGal(parseFloat(event.target.value))}
								style={{ maxWidth: '5ch' }}
							/>
							&nbsp;gal = {(-taxiFuelGal * roughFuelWeight).toFixed(2)}
						</td>
						<td>{fuel.arm.toFixed(2)}</td>
						<td>{(-taxiFuelGal * roughFuelWeight * fuel.arm).toFixed(2)}</td>
					</tr>
					
					<tr className='result'>
						<th>Stage</th>
						<th>Weight</th>
						<th>CG</th>
						<th>Moment</th>
					</tr>

					<tr>
						<th>
							Takeoff{' '}
							{takeoffSafe.length > 0 ? (
								<Popover
									isOpen={takeoffSafeOpen}
									positions={[ 'right' ]}
									content={<div
										className='popover'
										onMouseEnter={() => setTakeoffSafeOpen(true)}
										onMouseLeave={() => setTakeoffSafeOpen(false)}
									><div>Within bounds for {takeoffSafe.join(', ')} operation</div></div>}
								>
									<span><IoCheckmarkCircleOutline
										onMouseEnter={() => setTakeoffSafeOpen(true)}
										onMouseLeave={() => setTakeoffSafeOpen(false)}
										className='safety positive'
									/></span>
								</Popover>
							) : (
								<IoAlertCircleOutline className='safety negative' />
							)}
						</th>
						<td>{takeoff.weight.toFixed(2)}</td>
						<td>{takeoff.arm.toFixed(2)}</td>
						<td>{takeoff.moment.toFixed(2)}</td>
					</tr>

					<tr>
						<th>Fuel used</th>
						<td>
							<input
								type='number' min={0} value={flightFuelHrs}
								onChange={(event) => setFlightFuelHrs(parseFloat(event.target.value))}
								style={{ maxWidth: '5ch' }}
							/>
							&nbsp;hrs = {(flightFuelHrs * roughFuelBurn).toFixed(2)} gal = {(-flightFuelHrs * roughFuelBurn * roughFuelWeight).toFixed(2)}
						</td>
						<td>{fuel.arm.toFixed(2)}</td>
						<td>{(-flightFuelHrs * roughFuelBurn * roughFuelWeight * fuel.arm).toFixed(2)}</td>
					</tr>

					<tr className='result'>
						<th>
							Landing{' '}
							{landingSafe.length > 0 ? (
								<Popover
									isOpen={landingSafeOpen}
									positions={[ 'right' ]}
									content={<div
										className='popover'
										onMouseEnter={() => setLandingSafeOpen(true)}
										onMouseLeave={() => setLandingSafeOpen(false)}
									><div>Within bounds for {landingSafe.join(', ')} operation</div></div>}
								>
									<span><IoCheckmarkCircleOutline
										onMouseEnter={() => setLandingSafeOpen(true)}
										onMouseLeave={() => setLandingSafeOpen(false)}
										className='safety positive'
									/></span>
								</Popover>
							) : (
								<IoAlertCircleOutline className='safety negative' />
							)}
						</th>
						<td>{landing.weight.toFixed(2)}</td>
						<td>{landing.arm.toFixed(2)}</td>
						<td>{landing.moment.toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
		</main>
	)
}

export default IndexPage