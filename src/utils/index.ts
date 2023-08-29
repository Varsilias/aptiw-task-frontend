import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export const formatDate = dayjs;

export const DATE_FORMAT = "Do MMMM, YYYY";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const formatString = (str: string) => {
  if (!str.includes("_")) {
    return str;
  }
  return str.split("_").join(" ");
};

export const formateDateType = (str: string) => {
  if (!Date.parse(str)) {
    return str;
  }

  return;
};
