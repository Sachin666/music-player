import React from "react";
import LibrarySong from "./LibrarySong";

function Library({songs, setCurrentSong, audioRef, isPlay, setSong, libraryStatus,}){

    return(
        <div className={`library ${libraryStatus ?  'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                    <LibrarySong
                        audioRef={audioRef} 
                        id={song.id}
                        key={song.id}
                        songs={songs} 
                        song={song} 
                        setSong={setSong}
                        isPlay={isPlay}
                        setCurrentSong={setCurrentSong}/>)}
            </div>
        </div>
    )
}

export default Library;