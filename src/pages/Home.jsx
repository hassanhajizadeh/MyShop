import React from 'react'
import Categories from '../components/Categories'
import ImageSlider from '../components/ImageSlider'
import TopBlog from '../components/TopBlog'
import TopProducts from '../components/TopProducts'

const Home = () => {
  return (
    <>
        <ImageSlider/>
        <TopBlog/>
        <TopProducts/>
        <Categories/>
    </>
  )
}

export default Home