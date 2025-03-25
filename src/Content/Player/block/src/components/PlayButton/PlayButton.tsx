/**
 * Play button component.
 */

import { cn } from '@/utils';
import { PlayIcon } from 'lucide-react';

export type PlayButtonProps = React.ComponentProps<'button'> & {};

export function PlayButton(props: PlayButtonProps) {
	const { className, ...rest } = props;

	return (
		<button type="button" {...rest}>
			<PlayIcon />
		</button>
	)
}

export default PlayButton;
