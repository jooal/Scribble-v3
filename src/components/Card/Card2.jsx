import React, { Component } from "react";
import firebase from 'firebase';
import Firebase from "../../Firebase/Firebase";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton";


export class Card2 extends Component {
  constructor() {
    super();
    this.state = {
    //   dayTasks: [],
      weekTasks: [],
    //   newDayTask: "",
      newWeekTask: ""
    }
    this.handleNewTask = this.handleNewTask.bind(this);
    // this.submitNewTask=this.submitNewTask.bind(this);
  }

  handleNewTask = (event) => {
    const newTask = event.target.name;
    this.setState({
      [newTask]: event.target.value
    })
  }

  submitNewTask = (event) => {
    event.preventDefault();
    const firebaseRef = firebase.database().ref('weekTasks');
    const weekTask = {
      newWeekTask: this.state.newWeekTask,
    }
    firebaseRef.push(weekTask);
    this.setState({
      newWeekTask: ""
    })
  }

  componentDidMount() {
    const firebaseRef = firebase.database().ref("weekTasks");
    firebaseRef.on('value', (snapshot) => {
      let weekTasks = snapshot.val();
      let newTaskState = [];
      for (let weekTask in weekTasks) {
        newTaskState.push({
          id: weekTask,
          newWeekTask: weekTasks[weekTask].newWeekTask,
        });
      }
      this.setState({
        weekTasks: newTaskState
      });
    });
  }

  removeTask(taskId) {
    const firebaseRef = firebase.database().ref(`/weekTasks/${taskId}`);
    firebaseRef.remove();
}

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;


    return (

      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 className="title">{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.state.weekTasks.map((weekTask) => {
            return (
              <div>
                <td key={weekTask.id}>{weekTask.newWeekTask}</td>
                <td className="td-actions text-right">
                  <OverlayTrigger placement="top" overlay={remove}>
                    <Button onClick={()=> this.removeTask(weekTask.id)} bsStyle="danger" simple type="button" bsSize="s">
                      <i className="fa fa-times" />
                    </Button>
                  </OverlayTrigger>
                </td>
              </div>

            )
          })}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <label>Add Task: </label>
            <input name="newWeekTask" type="text" onChange={this.handleNewTask} value={this.state.newWeekTask} className="add-task"></input>
            <button onClick={this.submitNewTask} className="submit-task">Add</button>
            <br></br>
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card2;
