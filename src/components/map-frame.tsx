const MapFrame = () => {
  return (
    <iframe
      className="rounded-[20px] absolute inset-0 w-full h-full"
      frameBorder="0"
      allowFullScreen
      allow="geolocation"
      src="//umap.openstreetmap.fr/en/map/aaa-matchmaker-map-preview_1124433?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=false&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=false&onLoadPanel=none&captionBar=false&captionMenus=false&fullscreenControl=false&attributionControl=false&locateControl=false"
    />
  );
};

export default MapFrame; 