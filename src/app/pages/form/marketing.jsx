import React, { useEffect } from "react";

const Marketingform = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src="https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div>
        <iframe
          src="https://forms.fillout.com/t/fXkQwoQLkPus"
          width="100%"
          height="1700"
        ></iframe>
      </div>
    </div>
  );
};

export default Marketingform;
