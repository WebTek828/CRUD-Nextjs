import { useState, useEffect } from "react";

const useCheckAllValid = (obj, loginType) => {
  const arr = [];
  if (loginType === "login") {
    delete obj["username"];
  }
  const [isAllValid, setIsAllValid] = useState(false);
  function checkAllValid(obj) {
    for (let key in obj) {
      arr.push(obj[key].isValid);
    }
    setIsAllValid(arr.every((valid) => valid));
    console.log(arr);
  }

  useEffect(() => {
    checkAllValid(obj);
  }, [obj]);

  return [isAllValid];
};

export default useCheckAllValid;
