import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from './data'
import './style/app.scss'

function App() {
  const audioRef = useRef(null)
  const [song, setSong] = useState(data())
  const [currentSong, setCurrentSong] = useState(song[0])
  const [isPlay, setIsPlay] = useState(false)
  const[songInfo, setSongInfo]= useState({
    currentTime: 0,
    duration: 0,
    animationPercent: 0,
})
  const [libraryStatus, setLibraryStatus] = useState(false)

function timeUpdateHandler(e){
  const current = e.target.currentTime
  const duration = e.target.duration
  const roundCurrent = Math.round(current)
  const roundDuration = Math.round(duration)
  const animation = Math.round((roundCurrent / roundDuration) * 100)
  setSongInfo({
    ...songInfo, 
    currentTime:current, 
    duration, 
    animationPercent: animation
  })
}

const songEnd = async () =>{
  let currentIndex = song.findIndex((songs) => songs.id === currentSong.id)
  await setCurrentSong(song[(currentIndex + 1) % song.length])
  if(isPlay) audioRef.current.play()
}
return (
    <div className={`App ${libraryStatus ? "library-active" : " "}`}> 
      <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          />
      <Song 
        currentSong={currentSong}
        />
        
      <Player 
        setIsPlay={setIsPlay}
        isPlay={isPlay} 
        currentSong={currentSong}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        song={song}
        setCurrentSong={setCurrentSong}
        setSong={setSong}
        />   

        <Library 
         songs={song} 
         setCurrentSong={setCurrentSong}
         audioRef={audioRef}
         isPlay={isPlay}
         setSong={setSong}
         libraryStatus={libraryStatus}
        />

        <audio 
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef} 
          src={currentSong.audio}
          onEnded={songEnd}
          >
        </audio>
    </div>
  );
}

export default App;
