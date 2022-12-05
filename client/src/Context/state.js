import { createContext, useEffect, useState } from 'react'

export const TripContext = createContext({})

const TripContextProvider = ({ children }) => {
   
    const [refreshPage, setRefreshPage] = useState(false);

    const refreshFunction = () => {
        setRefreshPage(prevRefreshPage => !prevRefreshPage)
    }

    const value = {
        refreshFunction,
        refreshPage,
    }

  return (
    <TripContext.Provider value={value}>
        {children}
    </TripContext.Provider>
  )
}

export default TripContextProvider