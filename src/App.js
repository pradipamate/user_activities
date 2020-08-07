import React, { Component } from "react";
import {Col,Row,Container,Modal,Form} from "react-bootstrap";
import moment from "moment"
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,Timezone, Inject } from '@syncfusion/ej2-react-schedule';

const initialdata={
    "ok": true,
    "members": [{
            "id": "W012A3CDE",
            "real_name": "Egon Spengler",
            "tz": "America/Los_Angeles",
            "activity_periods": [{
                    "start_time": "Feb 1 2020  1:33PM",
                    "end_time": "Feb 1 2020 1:54PM"
                },
                {
                    "start_time": "Mar 1 2020  11:11AM",
                    "end_time": "Mar 1 2020 2:00PM"
                },
                {
                    "start_time": "Mar 16 2020  5:33PM",
                    "end_time": "Mar 16 2020 8:02PM"
                }
            ]
        },
        {
            "id": "W07QCRPA4",
            "real_name": "Glinda Southgood",
            "tz": "Asia/Kolkata",
            "activity_periods": [{
                    "start_time": "Feb 1 2020  1:33PM",
                    "end_time": "Feb 1 2020 1:54PM"
                },
                {
                    "start_time": "Mar 2 2020  11:11AM",
                    "end_time": "Mar 2 2020 2:00PM"
                },
                {
                    "start_time": "Mar 21 2020  5:33PM",
                    "end_time": "Mar 21 2020 8:02PM"
                }
            ]
        }
    ]
}  

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            DispalyData:null,
            isModalOpen: false,
            timezone :new Timezone(),
            activity_periods:""
        }
        this.Viewmodal = this.Viewmodal.bind(this);
        this.modalClosehandle=this.modalClosehandle.bind(this);
    }
   
    
    componentDidMount() {
        this.setState({
            DispalyData:initialdata
        }) 
     }

     Viewmodal=(event)=>{
           
           const data = this.state.DispalyData.members.find((item) => item.id === event.target.id);
           this.setState({
            activity_periods:NewData,
            isModalOpen:!this.state.isModalOpen,
            viewrealname:data.real_name,
            viewtz:data.tz,
          })
           let activity_periods=data.activity_periods;
           var i;
           let NewData=[];
           for(i=0;i<=activity_periods.length-1;i++){
              let startTime=activity_periods[i].start_time;
              let s_time=startTime.split(" ").pop();
              let lastIndex_start_time = startTime.lastIndexOf(" ");
              startTime = startTime.substring(0, lastIndex_start_time);
              let StartTime = moment(s_time, ["h:mm A"]).format("HH:mm:ss");
              let newStartTime=startTime+""+StartTime;
              let endTime=activity_periods[i].end_time;
              let e_time=endTime.split(" ").pop();
              let lastIndex_end_time = endTime.lastIndexOf(" ");
               endTime = endTime.substring(0, lastIndex_end_time);
              let EndTime = moment(e_time, ["h:mm A"]).format("HH:mm:ss");
              let newEndTime=endTime+" "+EndTime;
              let obj={};
              obj.StartTime=newStartTime;
              obj.EndTime=newEndTime;
              obj.Subject="Activity Periods";
              NewData.push(obj);
           }
           
           this.setState({
            activity_periods:NewData,
          })
           
    }
    
    modalClosehandle=(event)=>{
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    render() {  
          var Data = this.state.DispalyData;

          if( Data!==null && Data!==undefined){
                    var List=Data.members.map((item)=>
                        <div className="Maindiv" key={item.id}>
                            <div className="" id={item.id}  onClick={this.Viewmodal}>
                                 {item.real_name}
                            </div>
                            <div className="" >
                                 {item.tz}
                            </div>
                        </div>
                   )
            }
        return (
            <div>
              <Container>
                    <Row>
                       {List}
                        <Modal size="lg" show={this.state.isModalOpen} onHide={this.modalClosehandle}>
                            <Modal.Header closeButton >
                                <Modal.Title>View Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                <Row>
                                    <Col sm={12}>
                                        <Form.Group controlId="Summery">
                                            <Form.Label>Real Name</Form.Label>
                                            <Form.Control
                                            type="text"
                                            onChange={this.UpdateTitlechangehandler}
                                            name="Title"
                                            value={this.state.viewrealname}
                                            readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12}>
                                        <Form.Group controlId="Summery">
                                            <Form.Label>Tz</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="Title"
                                            value={this.state.viewtz}
                                            readOnly
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col sm={12}>
                                    <Form.Group controlId="Summery">
                                            <Form.Label>Activity Periods</Form.Label>
                                            <ScheduleComponent height='550px' selectedDate={new Date("Feb 1 2020")} TimeMode="TwelveHours" eventSettings={{ dataSource: this.state.activity_periods }}>
                                                <Inject services={[Day,Week, WorkWeek, Month]} timezone=' UTC+05:30' editable="false"/>
                                            </ScheduleComponent>
                                        </Form.Group>
                                     </Col>
                                  </Row>
                                </Form>
                            </Modal.Body>
                     </Modal>
                    </Row>
               </Container>
            </div>
        );
    }
}

export default App;
