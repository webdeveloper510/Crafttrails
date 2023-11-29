import React, { useEffect } from "react";

const SpecialEvent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div>
        {/* <div
            style={{ width: "100%", height: "500px" }}
            data-fillout-id="pFVZsBqprCus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
            id="formm"
          ></div>          */}
        <iframe
          src="https://tockify.com/tkf2/submitEvent/c51629bbb7254d0eb5e4539048494ba5"
          width="100%"
          height="800"
        ></iframe>
      </div>
      <div style={{ width: "82%", marginTop: "20px" }}>
        <div className="text-end">
          <a
            href="https://tockify.com/tkf2/submitEvent/c51629bbb7254d0eb5e4539048494ba5"
            style={{
              background: "rgb(59, 130, 246)",
              color: "white",
              fontSize: "16px",
              fontWeight: 500,
              padding: "10px",
              marginTop: "50px",
              borderRadius: "10px",
            }}
            target="_blank"
          >
            Submit an Event
          </a>
        </div>
      </div>
    </>
  );
};

export default SpecialEvent;
