import React, { Component } from "react"
import "./photos.css"
const PHOTOS_URL = `${process.env.REACT_APP_PHOTOS_URL}/next`
export default class Photos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageRefreshKey: Date.now()
    }
  }

  async componentDidMount() {
    this.startSlideShow()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startSlideShow = () => {
    this.interval = setInterval(() => {
      this.setState({ imageRefreshKey: Date.now() })
    }, 10000)
  }

  render() {
    const { imageRefreshKey } = this.state
    return (
      <div className="slideshow-container box">
        <div className="slideshow-photo">
          <img
            id="photo"
            src={`${PHOTOS_URL}?${imageRefreshKey}`}
            alt="Collinear Media"
          />
        </div>
      </div>
    )
  }
}
