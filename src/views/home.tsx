import React from "react";
import { Card, Button } from "antd";

const splash = require("../assets/splash.png");

const View: React.FunctionComponent<{}> = () => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#3A8EDBE5",
        height: "100vh",
      }}
    >
      <Card
        style={{
          marginTop: "250px",
          borderRadius: "20px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ float: "left", maxWidth: "30%" }}>
          <img src={splash} alt="splash" />
        </div>
        <div style={{ float: "left", maxWidth: "50%", marginLeft: "200px" }}>
          <p style={{ fontWeight: "bolder", fontSize: "25px" }}>
            The importance of a more relevant FRISS score tailored to your
            business
          </p>
          <p style={{ fontSize: "17px" }}>
            A good rule set creates an accurate FRISS score. An accurate FRISS
            score will let you pay legitimate claims faster and detect insurance
            fraud before claims are paid
          </p>
          <div style={{ float: "right", marginTop: "100px" }}>
            <Button
              type="primary"
              style={{
                width: "210px",
                height: "70px",
                borderRadius: "6px",
                fontSize: "24px",
              }}
              onClick={() =>
                (window.location.href =
                  "/ruledit/8bbbba9a-cdef-4012-b456-717c2cd8143b")
              }
            >
              Get Started
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Home = View;
