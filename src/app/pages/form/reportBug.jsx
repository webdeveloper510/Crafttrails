import React, { useEffect } from "react";

const ReportBug = () => {
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
        data-fillout-id="84YNtYT4H9us"
        data-fillout-embed-type="standard"
        data-fillout-inherit-parameters
        data-fillout-dynamic-resize
      ></div>
    </div>
  );
};

export default ReportBug;
