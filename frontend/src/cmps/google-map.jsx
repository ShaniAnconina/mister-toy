import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div className="pin">{text}</div>

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 12

    return (
        <div className="google-map">
            <div className="map-btns">
                <h2>Our branches</h2>
                <button className="store-btn" onClick={() => setCoordinates({ lat: 32.0853, lng: 34.7818 })}>Tel Aviv</button>
                <button className="store-btn" onClick={() => setCoordinates({ lat: 31.801447, lng: 34.643497 })}>Ashdod</button>
                <button className="store-btn" onClick={() => setCoordinates({ lat: 32.794044, lng: 34.989571 })}>Haifa</button>
                <button className="store-btn" onClick={() => setCoordinates({ lat: 29.5581, lng: 34.9482 })}>Eilat</button>
            </div>
            <div className="map" style={{ height: '60vh', width: '70%', margin: 'auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyD2BO1ZuhBV_3IMU5L1VTCoB_c0rRFCkcM" }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    {/* Tel Aviv */}
                    <AnyReactComponent
                        lat={32.0853}
                        lng={34.7818}
                        text="🧸"
                    />

                    {/* Ashdod */}
                    <AnyReactComponent
                        lat={31.801447}
                        lng={34.643497}
                        text="🧸"
                    />

                    {/* Haifa */}
                    <AnyReactComponent
                        lat={32.794044}
                        lng={34.989571}
                        text="🧸"
                    />

                    {/* Eilat */}
                    <AnyReactComponent
                        lat={29.5581}
                        lng={34.9482}
                        text="🧸"
                    />

                </GoogleMapReact>
            </div>
        </div>
    )
}