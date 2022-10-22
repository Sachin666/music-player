import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

function Player({currentSong, setCurrentSong, isPlay, setIsPlay, audioRef, setSongInfo, songInfo, song, setSong}){
    
    function activeLibrary(nextPrev){
    const newSong = song.map(song =>{
        if(song.id === nextPrev.id){
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
}
   

    const playSongHandler = () => {
        if(isPlay){
            audioRef.current.pause()
            setIsPlay(!isPlay)
        } else{
            audioRef.current.play()
            setIsPlay(!isPlay)
        }
    }
    
    

    function getTime(time){
        return (
            Math.floor(time / 60) + ":" +("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    function dragHandler(e){
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime:e.target.value})
    }

    const skipTrack = async (direction) => {
        let currentIndex = song.findIndex((songs) => songs.id === currentSong.id)
        if(direction === 'skip-forward'){
           await setCurrentSong(song[(currentIndex + 1) % song.length])
           activeLibrary(song[(currentIndex + 1) % song.length])
        }
        if(direction === 'skip-back'){
            if((currentIndex - 1 ) % song.length === -1){
              await  setCurrentSong(song[ song.length - 1 ])
              activeLibrary(song[ song.length - 1 ])
                if(isPlay) audioRef.current.play()
                return;
            }
           await setCurrentSong(song[(currentIndex - 1) % song.length])
           activeLibrary(song[(currentIndex - 1) % song.length])
        }
        if(isPlay) audioRef.current.play()
    }
    
   const trackAnimation = {
    transform: `translateX(${songInfo.animationPercent}%)`
   }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">   
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    type="range"
                    onChange={dragHandler}
                    />
                <div style={trackAnimation} className="animate-track"></div>
            </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>    
            </div>

            <div className="play-control">
                <FontAwesomeIcon  className="skip-back" 
                                  icon={faAngleLeft}
                                  size="2x"
                                  onClick={() => skipTrack('skip-back')}
                                  />
                <FontAwesomeIcon  className="play" 
                                  icon={isPlay ? faPause : faPlay}
                                  size="2x"
                                  onClick={playSongHandler}
                                  />
                <FontAwesomeIcon  className="skip-forward" 
                                  icon={faAngleRight}
                                  size="2x"
                                  onClick={() => skipTrack('skip-forward')}
                                  />
            </div>
        </div> 

    )
}

export default Player;