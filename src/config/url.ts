const deveopmentBaseUrl = "http://114.29.237.248:9090/";
const productionBaseUrl = "http://114.29.237.248:9090/";

export default !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  ? deveopmentBaseUrl
  : productionBaseUrl;
