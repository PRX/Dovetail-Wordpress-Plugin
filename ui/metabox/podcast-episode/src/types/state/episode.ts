export type DovetailPodcast = {
  id: number
}

export type DovetailEpisodeEnclosure = {
  url: string
}

export type DovetailEpisode = {
  id: string,
  enclosure: DovetailEpisodeEnclosure
}

export type EpisodeData = {
  podcast: DovetailPodcast,
  dovetail: DovetailEpisode
}
