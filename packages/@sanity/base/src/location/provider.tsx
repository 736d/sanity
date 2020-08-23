import React, {useState, useEffect} from 'react'
import {LocationContext} from './context'
import {Location} from './types'

export function LocationProvider({children}: {children: React.ReactNode}) {
  const [currentLocation, setCurrentLocation] = useState(getLocationFromWindow())

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setCurrentLocation(getLocationFromWindow())
    })
  }, [])

  return (
    <LocationContext.Provider value={{...currentLocation, pushState}}>
      {children}
    </LocationContext.Provider>
  )

  function pushState(loc: Partial<Location>) {
    const newLoc: Location = {...currentLocation, ...loc}
    setCurrentLocation(newLoc)
    const url = `${newLoc.origin}${newLoc.path}`
    window.history.pushState(null, document.title, url)
  }
}

function getLocationFromWindow(): Location {
  return {
    origin: window.location.origin,
    path: window.location.pathname,
    query: {},
    search: window.location.search
  }
}
