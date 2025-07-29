import React, { createContext, useState } from 'react' 
export const BookingContext = createContext({
    bookingData: [],
    handleBookingData: () => {},   
})