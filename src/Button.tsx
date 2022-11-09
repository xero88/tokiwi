import styled, { css } from 'styled-components'

export const Button = styled('button')<{ color: string }>`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0.5em 1em;
	padding: 0.25em 1em;

	${(props) =>
		props.color &&
		css`
			background: ${props.color};
			color: white;
		`}
`
