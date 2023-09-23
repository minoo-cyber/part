const deveopmentBaseUrl = "http://82.115.20.205:9090/";
const productionBaseUrl = "http://82.115.20.205:9090/";

export default !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  ? deveopmentBaseUrl
  : productionBaseUrl;
