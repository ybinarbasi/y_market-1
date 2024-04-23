import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydWxsYWgiLCJhIjoiY2xqMzl0Z3ZhMWF2cTNtcDlnamM2MXp5eiJ9.bCfPB7FxoYyCaTu_v29jPA';

function MapsModal({ setOnClose, onClose, user }) {
    const ref = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (ref.current && !map) {
            const map = new mapboxgl.Map({
                container: ref.current,
                style: 'mapbox://styles/carullah/clj3atguw00xh01qye6xpcgz2',
                center: [0, 0],
                zoom: 1
            });
            setMap(map);
        }
    }, [ref, map]);

    return (
        <>
            {onClose === true ? (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
                    <div className="absolute top-0 left-0 z-40 w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="z-50 w-1/2 px-6 py-4 bg-white rounded shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">Update User</h2>
                        <div className="map-container" ref={ref} />
                        <div className="flex justify-end">
                            <button type="button" className="mr-4" onClick={() => setOnClose(false)}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default MapsModal;

