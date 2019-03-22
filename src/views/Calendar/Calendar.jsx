import React, {Component} from "react";
import dateFns from "date-fns";
import Modal from 'simple-react-modal';
import "../Calendar/Calendar.css";
// import Dashboard from "../../layouts/Dashboard/Dashboard";
import firebase from 'firebase';
import Firebase from "../../Firebase/Firebase"
// import Firebase from '../../Firebase/Firebase';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

class Calendar extends Component {
    constructor() {
        super();

    this.state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        title: "",
        date: "",
        startTime: "",
        endTime: "", 
        items: [], 
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange= (event) => {
        // console.log(event.target)
        const title = event.target.name;
        // const endTime = event.target.endTime;
        console.log(event.target);
     
        this.setState ({
            // value: event.target.value,
            [title]: event.target.value,
            // [startTime]: event.target.value, 
            // endTime: event.target.value, 
            // date: event.target.value
        }) 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            title: this.state.title, 
            startTime: this.state.startTime, 
            endTime: this.state.endTime,
        }
        itemsRef.push(item);
        this.setState({
            title: '',
            startTime: '',
            endTime: '',
        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot)=> {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    endTime: items[item].endTime,
                    startTime: items[item].startTime
                });
            }
            this.setState({
            items: newState
        });
    });
    }

    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }


    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
              </div>
                </div>
                <div className="col col-center">
                    <span className="month-name">
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }


    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                    
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    showModal = (day) => {
        const { currentMonth, selectedDate } = this.state;

        console.log("Modal");
        this.setState({
            showModal: true, 
            // selectedDate: this.state.selectedDate

        });
    }

    closeModal = () => {
        console.log("closed modal")
        this.setState({ showModal: false })
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day,

        });
        this.showModal();
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };


    render() {
        return (
            <div className="calendar">
                {/* <Sidebar /> */}
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}


                    <Modal animationType="fade"
                        transparent={true}
                        visible={this.props.visible}
                        containerClassName="test"
                        style={{backgroundColor: "rgba(0,0,0,0.2)", marginLeft: "260px" }} 
                        closeOnOuterClick={true}
                        show={this.state.showModal}
                        onClose={this.closeModal}>

                        {/* <a className="close-modal" onClick={this.closeModal}>X</a> */}
                  
                        <h5 className="this-date">{this.state.selectedDate
                        ? this.state.selectedDate.toLocaleDateString():''}</h5>
                        {/* <div className="modal-content"> */}

                        <ul className="task-items">
                            {this.state.items.map((item)=> {
                                return(
                            <li key={item.id}>{item.title}, {item.startTime} - {item.endTime} <span></span>
                            <button onClick={()=> this.removeItem(item.id)}>x</button>
                            </li> )
                            })}
                        </ul>
                        <form className="add-event">
                            <input name="title" type="text" placeholder="Title *" onChange={this.handleChange} value={this.state.title}></input><br></br>
                            <input name="startTime" type="text" placeholder="Start *" onChange = {this.handleChange} value={this.state.startTime}></input><br></br>
                            <input name="endTime" type="text" placeholder="End" onChange={this.handleChange} value={this.state.endTime}></input><br></br>
                            <button onClick = {this.handleSubmit} className ="add-new-event" type="submit">Add</button>
                        </form>
                        {/* </div> */}

                        <div className="modalOverlay">
                            <div className="modal-info">
                            </div>
                         </div>

                    </Modal>
                </div>
        );
    }
}

export default Calendar;