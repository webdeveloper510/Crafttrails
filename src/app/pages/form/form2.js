import React, { useEffect } from "react";

const Form2 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div
        style={{ width: "100%", height: "500px" }}
        data-fillout-id="5FvjX6SMPTus"
        data-fillout-embed-type="standard"
        data-fillout-inherit-parameters
        data-fillout-dynamic-resize
        id="formm"
      ></div>
    </div>
  );
};

export default Form2;
