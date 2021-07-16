//will model all the data received from the survey

class surveryInformation {
  constructor(
    barcodeID,
    crop,
    cultivarOrVariety,
    controlMethod,
    hotspotDescription,
    otherNotes,
    imageRoll,
    lat,
    long,
    currentTime
  ) {
    //expected type of code* and number of digits
    this.barcodeID = barcodeID;
    //expected string
    this.crop = crop;
    //expected string
    this.cultivarOrVariety = cultivarOrVariety;
    //expected string
    this.controlMethod = controlMethod;
    //expected string
    this.hotspotDescription = hotspotDescription;
    //expected string
    this.otherNotes = otherNotes;
    //expected [] of file uris
    this.imageRoll = imageRoll;
    //expected [x] amount of digits for accuracy
    this.lat = lat;
    //expected [x] amount of digits for accuracy
    this.long = long;

    this.currentTime = currentTime;
  }
}
