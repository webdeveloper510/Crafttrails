import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ParticipantTable from "./lists/participants/Table";
import BreweryTable from "./lists/breweries/Table";
import TableTrail from "./lists/trails/Table";
import VisitsTable from "./lists/visits/Table";
import PointsTable from "./lists/points/Table";

const Overallpoint = () => {
  const url = window.location.pathname?.split("/");
  const passport = url?.[2];

  console.log("url location----------", url?.[2]);
  return (
    <div>
      <h1>Overall points</h1>
      <Tabs
        defaultActiveKey="breweries"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="breweries" title="Breweries">
          <BreweryTable passport={passport} />
        </Tab>
        <Tab eventKey="trails" title="Trails">
          <TableTrail passport={passport} />
        </Tab>
        <Tab eventKey="participants" title="Participants">
          <ParticipantTable passport={passport} />
        </Tab>
        <Tab eventKey="participants-points" title="Participants Points">
          <PointsTable passport={passport} />
        </Tab>
        <Tab eventKey="visits" title="Visits">
          <VisitsTable passport={passport} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Overallpoint;
