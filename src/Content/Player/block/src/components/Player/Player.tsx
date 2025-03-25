/**
 * Player controls wrapper component.
 */

import type { DovetailEpisode } from "@_types/api";


export type PlayerProps = React.PropsWithChildren & {
	episode: DovetailEpisode
}

export function Player({ episode, children }: PlayerProps) {

	return (
		<div className='dovetail-player'>
			{children}
		</div>
	)
}

export default Player;
