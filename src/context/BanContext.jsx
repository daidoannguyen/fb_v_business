import { createContext, useEffect, useState } from "react";

const BanContext = createContext();

// eslint-disable-next-line react/prop-types
const BanContextProvider = ({ children }) => {
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch("https://api.db-ip.com/v2/free/self/")
      .then((res) => res.json())
      .then((json) => {
        setCountry(json.countryCode);
      });
  }, []);

  return (
    <BanContext.Provider value={{ country }}>
      {country && country !== "VN" && children}
    </BanContext.Provider>
  );
};

export default BanContextProvider;
