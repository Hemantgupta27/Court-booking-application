
import React from 'react';
import { Court, SportType } from './types';

import imgFootball from './images/download.webp';
import imgCricket from './images/OIP.webp';
import imgBadminton from './images/2sw6dvTFgT.jpg';
import imgTennis from './images/OIP (1).webp';

export const COURTS: Court[] = [
  {
    id: 'c1',
    name: 'Football Turf',
    type: 'Football',
    pricePerHour: 1200,
    imageUrl: imgFootball,
    rating: 4.8,
    location: 'Ratanada, Jodhpur'
  },
  {
    id: 'c2',
    name: 'Cricket Box',
    type: 'Cricket',
    pricePerHour: 1500,
    imageUrl: imgCricket,
    rating: 4.6,
    location: 'Madhuban,Jodhpur'
  },
  {
    id: 'c3',
    name: 'Badminton Court',
    type: 'Badminton',
    pricePerHour: 400,
    imageUrl: imgBadminton,
    rating: 4.9,
    location: 'Pal Road,Jodhpur'
  },
  {
    id: 'c4',
    name: 'Tennis Court',
    type: 'Tennis',
    pricePerHour: 800,
    imageUrl: imgTennis,
    rating: 4.7,
    location: 'Paota C road,Jodhpur'
  }
];

export const OPERATING_HOURS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];