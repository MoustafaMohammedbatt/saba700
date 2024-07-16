"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '@/components/Common/Breadcrumb';
import TicTacToe from '@/components/TicTacToe/TicTacToe';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  

  return (
    <>
      <Breadcrumb
        pageName="XO"
        description={``}
      />
      <TicTacToe />
    </>
  );
}
