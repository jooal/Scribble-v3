import React, { Component } from "react";
import { Col } from "react-bootstrap";

import { Card1 } from "../../components/Card/Card1.jsx";
import {Card2} from "../../components/Card/Card2.jsx";
import { Tasks } from "../../components/Tasks/Tasks.jsx";

class ToDo extends Component {


  
  render() {
    return (
      <div className="content">
            <Col md={6}>
              <Card1
                title="Tasks"
                category="Today"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      {/* <Tasks /> */}
                    </table>
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card2
                title="Tasks"
                category="This Week"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      {/* <Tasks /> */}
                    </table>
                  </div>
                }
              />
            </Col>
      </div>
    );
  }
}

export default ToDo