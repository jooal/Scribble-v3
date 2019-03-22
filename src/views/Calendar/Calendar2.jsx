import React from 'react';
import mobiscroll from "@mobiscroll/react";
import '../Calendar/Calendar.css';
import firebase from 'firebase';
import Firebase from "../../Firebase/Firebase"


// import "@mobiscroll/react/dist/css/mobiscroll.min.css";

mobiscroll.settings = {
    theme: 'ios'
};
class Calendar2 extends React.Component {
    constructor(props) {
        var now = new Date(),
            btn = '<button type="button" class="mbsc-btn mbsc-btn-outline mbsc-btn-danger md-delete-btn">Delete</button>';
            
        super(props);
        this.state = {
            eventText: '',
            eventDesc: '',
            eventDate: [now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2)],
            btn: btn,
            id: 5,
            preventSet: false,
            myEvents: [{
                id: 1,
                start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
                end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
                text: 'Lunch @ Butcher\'s' + btn,
                color: '#26c57d'
            }],
            allDay: false,
            isFree: 'false', 
        };
        
        this.textChange = this.textChange.bind(this);
        this.descChange = this.descChange.bind(this);
        this.allDayChange = this.allDayChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.isFreeChange = this.isFreeChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.onEventSelect = this.onEventSelect.bind(this);
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
                    start: items[item].eventDate,
                    end: items[item].eventDate,
                    text: items[item].text,
                    title: items[item].title,
                    description: items[item].eventDesc,
                    // allDay: items[items].allDay,
                    free: items[item].isFree == 'true'
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


    
    textChange(event) {
        var state = this.state;
        state.eventText = event.target.value;
        this.setState(state);
    }
    
    descChange(event) {
        var state = this.state;
        state.eventDesc = event.target.value;
        this.setState(state);
    }
    
    allDayChange(event) {
        var state = this.state;
        state.allDay = event.target.checked;
        this.refs.range.instance.option({
            controls: state.allDay ? ['date'] : ['date', 'time'],
            dateWheels: state.allDay ? 'MM dd yy' : '|D M d|'
        });
        
        this.setState(state);
    }
    
    dateChange(event, inst) {
        var state = this.state;
        state.eventDate = inst.getVal();
        this.setState(state);
    }
    
    isFreeChange(event){
        var state = this.state;
        state.isFree = event.target.value;
        this.setState(state);
    }
    
    showAddEventPopup = () => {
        this.refs.popup.instance.show();
    }
    
    addEvent(event, inst) {
        const itemsRef = firebase.database().ref('items');
                var changedState = this.state;
        var changedState = this.state;
        const item = {
            id: changedState.id,
            start: changedState.eventDate[0],
            end: changedState.eventDate[1],
            text: (changedState.eventText || 'New Event') + changedState.btn,
            title: changedState.eventText || 'New Event',
            description: changedState.eventDesc,
            allDay: changedState.allDay,
            free: changedState.isFree == 'true'
        }
        itemsRef.push(item);
        var changedState = this.state;
        changedState.myEvents = changedState.myEvents.concat([{
            id: changedState.id,
            start: changedState.eventDate[0],
            end: changedState.eventDate[1],
            text: (changedState.eventText || 'New Event') + changedState.btn,
            title: changedState.eventText || 'New Event',
            description: changedState.eventDesc,
            allDay: changedState.allDay,
            free: changedState.isFree == 'true'
        }]);
        changedState.eventText = '';
        changedState.eventDesc = '';
        changedState.id += 1;
        this.setState(changedState);
        this.navigate(this.refs.monthCal.instance, changedState.eventDate[0]);
    }
    
    onPageChange = (event, inst) => {
        var state = this.state,
            day = event.firstDay;
            
        state.preventSet = true;
        state.eventDate = [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)];
        
        this.setState(state);
        this.navigate(this.refs.monthCal.instance, day);
    }
    
    onEventSelect = (event, inst) => {
        if (event.domEvent.target.classList.contains('md-delete-btn')) {
            mobiscroll.confirm({
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this item?',
                okText: 'Delete',
                callback: (res) => {
                    if (res) {
                        //remove element by id
                        var state = this.state,
                            index = state.myEvents.findIndex(item => item.id === event.event.id),
                            newState = React.addons.update(state, {
                                myEvents: {
                                    $splice: [ [index, 1] ]
                                }
                            });
                        
                        this.setState(newState);
                        
                        mobiscroll.toast({
                            message: 'Deleted'
                        });
                    }
                }
            });
        }
    }
    
    onSetDate = (event, inst) => {
         if (!this.state.preventSet && this.refs.dayCal != undefined) {
             var state = this.state,
                day = event.date;
                
            state.eventDate = [day, new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 2)];
            this.navigate(this.refs.dayCal.instance, day);
            this.setState(state);
         }
        this.state.preventSet = false;
    }
    
    navigate = (inst, val) => {
        if (inst) {
            inst.navigate(val);
        }
    }
    
    render () {
        return (
            <div>
                <mobiscroll.Form>
                    <div className="mbsc-grid md-add-event-demo" >
                        <div className="mbsc-row mbsc-no-padding">
                            <div className="mbsc-col-md-4 mbsc-col-12" >
                                <mobiscroll.Eventcalendar
                                    ref="monthCal"
                                    display="inline"
                                    view={{
                                        calendar: { type: 'month' }
                                    }}
                                    data={this.state.myEvents}
                                    onSetDate={this.onSetDate}
                                />
                                <div className="mbsc-btn-group-block">
                                    <button type="button" onClick={this.showAddEventPopup}>Add New Event</button>
                                </div>
                            </div>
                            <div className="mbsc-col-md-8 mbsc-col-12 md-col-right">
                                        <mobiscroll.Eventcalendar
                                        ref="dayCal"
                                        display="inline"
                                        layout="liquid"
                                        view={{
                                            eventList: { type: 'day' }
                                        }}
                                        // key={item.id}
                                        data={this.state.myEvents}
                                        onPageChange={this.onPageChange}
                                        onEventSelect={this.onEventSelect}
                                    />   
                            </div>
                        </div>
                    </div>
                </mobiscroll.Form>
                <mobiscroll.Popup
                    ref="popup"
                    style={{top: "29px", left: "350px", width: "800px"}}
                    display="center"
                    cssClass="mbsc-no-padding"
                    buttons={[{
                            text: 'Add event',
                            handler: 'set'
                        },
                        'cancel'
                    ]}
                    headerText="Add new event"
                    onSet={this.addEvent}
                >
                    <mobiscroll.Form>
                        <mobiscroll.FormGroup>
                            <mobiscroll.Form.Label>
                                Title
                                <input value={this.state.eventText} onChange={this.textChange} />
                            </mobiscroll.Form.Label>
                            <mobiscroll.Textarea value={this.state.eventDesc} onChange={this.descChange}>
                                Description
                            </mobiscroll.Textarea>
                        </mobiscroll.FormGroup>
                        <mobiscroll.FormGroup>  
                            <mobiscroll.Switch value={this.state.allDay} onChange={this.allDayChange}>
                                All-day
                            </mobiscroll.Switch>
                                <mobiscroll.Form.Label>
                                    Starts
                                    <input id="startDate" />
                                </mobiscroll.Form.Label>
                                <mobiscroll.Form.Label>
                                    Ends
                                    <input id="endDate" />
                                </mobiscroll.Form.Label>
                                <mobiscroll.Range
                                    ref="range"
                                    type="hidden"
                                    controls={['date', 'time']}
                                    dateWheels="|D M d|"
                                    startInput="#startDate"
                                    endInput="#endDate"
                                    tabs={false}
                                    responsive={{
                                        large: {
                                            touchUi: false
                                        }
                                    }}
                                    value={this.state.eventDate}
                                    onSet={this.dateChange}
                                    showSelector={false}
                                />
                            <mobiscroll.Segmented name="group" value="false" checked={this.state.isFree === 'false'} onChange={this.isFreeChange}>
                                Show as busy
                            </mobiscroll.Segmented>
                            <mobiscroll.Segmented name="group" value="true" checked={this.state.isFree === 'true'} onChange={this.isFreeChange}>
                                Show as free
                            </mobiscroll.Segmented>
                        </mobiscroll.FormGroup>
                    </mobiscroll.Form>
                </mobiscroll.Popup>
            </div>
        );
    }    
}

export default Calendar2;