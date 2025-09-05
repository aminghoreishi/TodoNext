import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

function Recaptcha({ setIsLoginGoogle }) {
  const onChangeCaptha = () => {
    setIsLoginGoogle(true);
  };
  return (
    <div style={{ transform: "scale(0.9)", transformOrigin: "0 0" }}>
      <ReCAPTCHA
        width="30"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onChangeCaptha}
      />
    </div>
  );
}

export default Recaptcha;
