const getHotelsCoords = (hotels) => hotels.map((item) => [item.location.latitude, item.location.longitude]);

export default getHotelsCoords;
