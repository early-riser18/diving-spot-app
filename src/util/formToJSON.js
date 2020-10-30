// from https://www.learnwithjason.dev/blog/get-form-values-as-json/
// Used to extract values from the form and make an array
// Loop through HTML Collection and apply array-method to it
// Create data object and assign key-value pairs based on form elements.
const formToJSON = (elements) => {
  const transformedData = [].reduce.call(
    elements,
    (data, element) => {
      // To assign only radio elements with a checked value and disregard others
      if (element.type === "radio") {
        if (element.checked === true) {
          data[element.name] = element.value;
        }
        // to create an object and assign all checkbox values to it
      } else if (element.type === "checkbox") {
        if (typeof data[element.name] === "object") {
          data[element.name][element.value] = element.checked;
        } else {
          data[element.name] = { [element.value]: element.checked };
        }
      } else if (element.type === "submit" || element.type === "file") {
      } else {
        data[element.name] = element.value;
      }

      return data;
    },
    {}
  );
return transformedData
}

export default formToJSON;
