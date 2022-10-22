import React from "react";

function LibrarySong({song, songs, setCurrentSong, id, audioRef, setSong, isPlay}){

    const songSelectHandler= async() => {
        await setCurrentSong(song)
        const newSong = songs.map(song =>{
            if(song.id === id){
                return {
                    ...song,
                    active: true
                }
            }else {
                return{
                    ...song,
                    active: false
                }
            }
        })
        setSong(newSong)
        if(isPlay) audioRef.current.play()
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;