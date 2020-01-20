import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from 'axios';
import SearchPage from "../SearchPage/SearchPage";
import {
  Card,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from 'classnames';

const ShowInfo = () => {
  let {id} = useParams();
  const [showInfo, setShowInfo] = useState({});
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  };
  useEffect(
      ()=> {
        const fetchData = async () => {
          const response = await axios.get('http://api.tvmaze.com/shows/' + id);
          const data = response.data;
          setShowInfo(data);
          console.log(data);
        };
        fetchData();
      },
      [id]);

  return (
      Object.entries(showInfo).length !== 0 && (
          <div>
            <SearchPage/>
            <Card style={{padding: '7px'}}>
              <Row>
                <Col xs='3'>
                  <img src={showInfo.image.medium} alt=""/>
                </Col>
                <Col xs='9'>
                  <h1>{showInfo.name} ({showInfo.premiered.substring(0,4)})</h1>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '1' })}
                          onClick={() => { toggle('1'); }}
                      >
                        Main info
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          className={classnames({ active: activeTab === '2' })}
                          onClick={() => { toggle('2'); }}
                      >
                        Primary
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" style={{paddingTop: '7px'}}>
                      <h5>Genres:</h5> {showInfo.genres.join(', ')}
                      <h5>Summary:</h5>
                      <div dangerouslySetInnerHTML={{ __html:showInfo.summary}}></div>
                      <b>Rating: </b> <b>{showInfo.rating.average}</b>
                      <br/>
                      <span><b>Status: </b></span> {showInfo.status}
                    </TabPane>
                    <TabPane tabId="2">
                      <p><span><b>Language: </b></span> {showInfo.language}</p>
                      <p><span><b>Premiered: </b></span> {showInfo.premiered}</p>
                      <hr/>
                      <a href={showInfo.url}>Link to TVMaze</a>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Card>
          </div>
      )

  );
};

export default ShowInfo;