export default async function renderSongElements(playlistElement, timeslot) {
	await fetch(`/api/timeslot/${timeslot.id}`)
		.then((response) => response.json())
		.then((songs) => {
			const addSongButton = document.querySelector(".add-song-button");
			songs.forEach((song) => {
				const newSong = new Song(song);
				// for song modal
				if (
					playlistElement ===
					document.querySelector(".song-playlist-songs")
				)
					playlistElement.appendChild(newSong.render(timeslot.id));
				// for timeslot modal
				else if (
					playlistElement ===
					document.querySelector(".timeslot-playlist-songs")
				) {
					playlistElement.insertBefore(
						newSong.render(null),
						addSongButton
					);
				}
			});
		});
}
