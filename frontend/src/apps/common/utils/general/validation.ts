const minPasswordLength = 8;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const firstNameRegex = /[a-zA-Z ]+/;
const lastNameRegex = /[a-zA-Z ]+/;
const addressRegex = /[a-zA-Z \-//,]+/;
const phoneNumberRegex = /[0-9+-]+/;
const appNameRegex = /[a-zA-Z_]+/;
const nameRegex = /[a-zA-Z\s]+/;
const hostListRegex =
  /^\s*(?:(?:\w+(?:-+\w+)*\.)+[a-z]+)\s*(?:,\s*(?:(?:\w+(?:-+\w+)*\.)+[a-z]+)\s*)*$/;
const emailHostRegex =
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;

export const validate = (
  fieldName: String,
  fieldValue: String,
  password?: String
) => {
  switch (fieldName) {
    case "email":
      return emailRegex.test(fieldValue.toLowerCase());
    case "password":
      return fieldValue !== "" && fieldValue.length >= minPasswordLength;
    case "password1":
      return fieldValue !== "" && fieldValue.length >= minPasswordLength;
    case "firstName":
      return firstNameRegex.test(fieldValue as string);
    case "lastName":
      return lastNameRegex.test(fieldValue as string);
    case "password2":
      return fieldValue === password;
    case "address":
      return addressRegex.test(fieldValue as string);
    case "phoneNumber":
      return phoneNumberRegex.test(fieldValue as string);
    case "birthday":
      return true;
    case "appName":
      return appNameRegex.test(fieldValue as string);
    case "companyName":
      return nameRegex.test(fieldValue as string);
    case "companySize":
      return true;
    case "name":
      return nameRegex.test(fieldValue as string);
    case "allowedOrigins":
      return hostListRegex.test(fieldValue as string);
    case "emailHost":
      return fieldValue === "" || emailHostRegex.test(fieldValue as string);
  }
};
