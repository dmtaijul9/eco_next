import React, { useState, useEffect } from "react";
import {
  BsFillExclamationCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

const StrengthMeter = ({ password, actions }) => {
  const [lucase, setLucase] = useState(false);
  const [num, setNum] = useState(false);
  const [special, setSpecial] = useState(false);
  const [length, setLength] = useState(false);
  const [passwordValue, setPasswordValue] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState("");

  const initPwdChecker = () => {
    const strength = ["", "weak", "fair", "good", "strong"];
    let pwdCheck = 0;
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      pwdCheck++;
      setLucase(true);
    } else {
      setLucase(false);
    }
    if (password.match(/([0-9])/)) {
      pwdCheck++;
      setNum(true);
    } else {
      setNum(false);
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      pwdCheck++;
      setSpecial(true);
    } else {
      setSpecial(false);
    }
    if (password.match(/^.{8,}$/)) {
      pwdCheck++;
      setLength(true);
    } else {
      setLength(false);
    }

    setPasswordValue(pwdCheck);
    setPasswordStrength(strength[pwdCheck]);
    actions(strength[pwdCheck]);
  };

  useEffect(() => {
    initPwdChecker();
  }, [password]);

  return (
    <>
      <div className="w-full wrapper">
        <progress
          className={`pwd-checker-bar strength-${passwordStrength}`}
          value={passwordValue}
          max="4"
        />
        <br />
        <div className="pwd-label">
          {password && (
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                {lucase ? (
                  <BsFillCheckCircleFill className="mr-2 text-green-600" />
                ) : (
                  <BsFillExclamationCircleFill className="mr-2 text-danger" />
                )}{" "}
                Lowercase & Uppercase
              </div>
              <div className="flex items-center">
                {num ? (
                  <BsFillCheckCircleFill className="mr-2 text-green-600" />
                ) : (
                  <BsFillExclamationCircleFill className="mr-2 text-danger" />
                )}
                Number (0-9)
              </div>
              <div className="flex items-center">
                {special ? (
                  <BsFillCheckCircleFill className="mr-2 text-green-600" />
                ) : (
                  <BsFillExclamationCircleFill className="mr-2 text-danger" />
                )}
                Special Character (!@#$%^&*)
              </div>
              <div className="flex items-center">
                {length ? (
                  <BsFillCheckCircleFill className="mr-2 text-green-600" />
                ) : (
                  <BsFillExclamationCircleFill className="mr-2 text-danger" />
                )}
                Atleast 8 Character
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StrengthMeter;
