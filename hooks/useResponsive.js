import { useEffect, useState } from 'react'

const sizes = {
  widescreen: 2000,
  desktop: 1920,
  laptop: 1200,
  tablet: 768,
  phone: 600,
}

const useResponsive = () => {
  const [windowWidth, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const handleWindowWidth = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowWidth)
    return () => {
      window.removeEventListener('resize', handleWindowWidth)
    }
  }, [])

  const isWideScreen = windowWidth >= sizes.widescreen
  const isDesktop = windowWidth >= sizes.desktop
  const isLaptop = windowWidth >= sizes.laptop
  const isTablet = windowWidth >= sizes.tablet
  const isPhone = windowWidth >= sizes.phone

  return {
    isWideScreen,
    isDesktop,
    isLaptop,
    isTablet,
    isPhone,
  }
}

export default useResponsive
