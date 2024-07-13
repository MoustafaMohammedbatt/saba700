"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '@/components/Common/Breadcrumb';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const fetchPlayerName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/GuessPlayer`);
        if (response.status === 200) {
          setPlayerName(response.data.playerName);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerName();
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="XO"
        description={`Player Name: ${playerName}`}
      />
    </>
  );
}
