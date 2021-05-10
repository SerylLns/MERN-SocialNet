import React, { useContext } from "react";
import { Row, Col } from "antd";
import Log from "../Components/Log/Log";
import LoginImg from "../assets/images/login-img.png";
import { UidContext } from "../Components/AppContext";
import Navbar from "../Components/Navbar";
import UpdateProfil from "../Components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <>
          <Navbar />
      {uid ? (
          <UpdateProfil/>
      ) : (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <Log />
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={LoginImg} className="img-login" alt="Login" />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Profil;
