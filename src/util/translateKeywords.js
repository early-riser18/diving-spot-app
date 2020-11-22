const translateKeywords = {
  level(level) {
    switch (level) {
      case "easy":
        return "Facile";
      case "medium":
        return "Intermédiaire";
      case "hard":
        return "Avancé";
      default:
        return "Avancé";
    }
  },
  depth(depth) {
    switch (depth) {
      case "0 to 9m":
        return "0 à 9m";
      case "10 to 19m":
        return "10 à 19m";
      case "20 to 39m":
        return "20 à 39m";
      case "40m and more":
        return "40m et plus";
      default:
        return "";
    }
  },

  caract(caract) {
    let arrToDisplay = [];

    for (let i = 0; i < Object.keys(caract).length; i++) {

      if (Object.values(caract)[i] === true) {
        switch (Object.keys(caract)[i]) {
          case "fishy":
            arrToDisplay.push("Poissonneux")
            break; 
          case "reef":
            arrToDisplay.push("Récif")
            break;
          case "shipwreck":
              arrToDisplay.push("Épave")
              break;
          case "wall":
             arrToDisplay.push("Tombant")
             break;
            default: 
            break;
        }
      } 
    }

return arrToDisplay.join(', ')
  },
};
export default translateKeywords;
