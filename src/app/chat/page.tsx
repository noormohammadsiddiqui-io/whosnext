'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  // selectIsConnectedToRoom,
  useHMSActions,
  // useHMSStore,
  HMSRoomProvider
} from '@100mslive/react-sdk';
import VideoChat from '@/components/VideoChat';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateRandomUsername } from '@/utils/roomUtils';

function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const hmsActions = useHMSActions();
  // const isConnected = useHMSStore(selectIsConnectedToRoom);

  useEffect(() => {
    let isMounted = true;

    async function joinRoom() {
      try {
        setIsLoading(true);
        
        // Fetch token from our API
        const response = await fetch('/api/token');
        const { token } = await response.json();
        
        if (!token) {
          throw new Error('Failed to get token');
        }

        // Initialize and join the room
        await hmsActions.join({
          authToken: token,
          userName: generateRandomUsername(),
        });
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error joining room:', err);
        if (isMounted) {
          setError('Failed to join the chat room. Please try again.');
          setIsLoading(false);
        }
      }
    }

    joinRoom();

    return () => {
      isMounted = false;
      // Leave room when component unmounts
      hmsActions.leave();
    };
  }, [hmsActions]);

  const handleNextChat = async () => {
    try {
      await hmsActions.leave();
      // Reload the page to get a new room connection
      router.refresh();
    } catch (err) {
      console.error('Error leaving room:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <LoadingSpinner size="lg" message="Connecting to chat..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-red-500/20 p-4 rounded-lg mb-4">
          <p className="text-red-500">{error}</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <VideoChat onNextChat={handleNextChat} />
    </div>
  );
}

// Wrap the page with HMSRoomProvider and ErrorBoundary
export default function ChatPageWithProvider() {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <div className="bg-red-500/20 p-6 rounded-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Video Chat Error</h2>
            <p className="mb-4 text-gray-300">
              There was a problem connecting to the video chat service. Please try again later.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Go back home
            </button>
          </div>
        </div>
      }
    >
      <HMSRoomProvider>
        <ChatPage />
      </HMSRoomProvider>
    </ErrorBoundary>
  );
}