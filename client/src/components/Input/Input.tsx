import React, { LegacyRef, forwardRef } from 'react';
import { GlobalError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error: GlobalError | undefined;
}

export const Input = forwardRef(
	(
		{ label, error, ...props }: InputProps,
		ref: LegacyRef<HTMLInputElement>
	) => {
		return (
			<label>
				{label}
				<input
					ref={ref}
					{...props}
					//  autoComplete="off"
				/>
				{error && <span>{error.message}</span>}
			</label>
		);
	}
);
