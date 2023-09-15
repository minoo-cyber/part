const deveopmentBaseUrl = "http://212.90.102.10:9090/";
const productionBaseUrl = "http://212.90.102.10:9090/";

export default !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  ? deveopmentBaseUrl
  : productionBaseUrl;
