'use client';

import { useState } from 'react';
import {
  selectLocalPeer,
  selectPeers,
  useHMSStore,
  selectIsConnectedToRoom,
  useVideo,
  useHMSActions
} from '@100mslive/react-sdk';
import LoadingSpinner from './LoadingSpinner';

interface VideoChatProps {
  onNextChat: () => void;
}

export default function VideoChat({ onNextChat }: VideoChatProps) {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const hmsActions = useHMSActions();


  const toggleAudio = async () => {
    try {
      const newMutedState = !isMuted;
      await hmsActions.setLocalAudioEnabled(newMutedState);
      setIsMuted(newMutedState);
    } catch (error) {
      console.error('Error toggling audio:', error);
    }
  };

  
  const toggleVideo = async () => {
    try {
      const newVideoState = !isVideoOff;
      await hmsActions.setLocalVideoEnabled(newVideoState);
      console.log('Video state:', newVideoState);
      setIsVideoOff(newVideoState);
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  };

 
  const VideoTile = ({ peerId, isLocal = false }: { peerId: string; isLocal?: boolean }) => {
    const { videoRef } = useVideo({
      trackId: peers.find(p => p.id === peerId)?.videoTrack
    });

    return (
      <div className={`relative rounded-lg overflow-hidden ${isLocal ? 'bg-gray-800' : 'bg-gray-700'}`}>
        <video
          ref={videoRef}
          autoPlay
          muted={isLocal}
          playsInline
          className={`w-full h-full object-cover ${isLocal ? 'mirror' : ''}`}
        />
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-sm">
          {isLocal ? 'You' : peers.find(p => p.id === peerId)?.name}
        </div>
      </div>
    );
  };


  const remotePeer = peers.find(p => !p.isLocal);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">WhosNext</h1>
        <div className="flex space-x-2">
          <button
            onClick={onNextChat}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            Next
          </button>
        </div>
      </header>

      {/* Video Area */}
      <main className="flex-1 p-4 flex flex-col md:flex-row gap-4">
        {isConnected ? (
          <>
            {/* If we have a remote peer, show both videos side by side */}
            {remotePeer ? (
              <>
                <div className="flex-1">
                  <VideoTile peerId={remotePeer.id} />
                </div>
                <div className="md:w-1/3 h-1/3 md:h-auto">
                  <VideoTile peerId={localPeer?.id || ''} isLocal={true} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-md">
                  <VideoTile peerId={localPeer?.id || ''} isLocal={true} />
                </div>
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold mb-2">Waiting for someone to join...</h2>
                  <p className="text-gray-400">You are the first one here. When someone joins, you will see them here.</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <LoadingSpinner size="md" message="Connecting to chat..." />
            </div>
          </div>
        )}
      </main>

      {/* Controls */}
      <footer className="bg-gray-800 p-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
          >
            {isVideoOff ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <button
            onClick={onNextChat}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
