import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Button, Divider, Row, Col } from 'antd';
import APIGetCall from '../../utilities/APIGetCall';
import './district-search.css';
import SlotResults from '../results/SlotResults';
import moment from 'moment';

const STATES_DATA_URL = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
const DISTRICTS_DATA_URL = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/';
const SLOTS_BY_DISTRICT_URL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=';
const { Option } = Select;

const DistrictSearch = ({ facts }) => {

    const [statesList, setstatesList] = useState([]);
    const [districtsList, setdistrictsList] = useState([]);
    const [stateSelected, setStateSelected] = useState(-1);
    const [districtSelected, setdistrictSelected] = useState(undefined);
    const [dateSelected, setDateSelected] = useState(moment(new Date()).format("DD-MM-YYYY"));
    const [shouldGetSlots, setShouldGetSlots] = useState(false);
    const [slotsData, setSlotsData] = useState(-1);
    const size = "middle";

    useEffect(() => {
        const getStatesData = async () => {
            const statesData = await APIGetCall(STATES_DATA_URL);
            setstatesList(statesData.states);
        }
        getStatesData();

    }, []);

    useEffect(() => {
        const getDistrictsData = async () => {
            const districtsData = await APIGetCall(DISTRICTS_DATA_URL + stateSelected);
            setdistrictsList(districtsData.districts);
        }
        getDistrictsData();
    }, [stateSelected]);

    useEffect(() => {
        const getSlotsByDistrict = async () => {
            const slotsData = await APIGetCall(SLOTS_BY_DISTRICT_URL + districtSelected + '&date=' + dateSelected);
            setSlotsData(slotsData.sessions);
            setShouldGetSlots(false);
        }
        if (shouldGetSlots) {
            getSlotsByDistrict();
        }
    }, [shouldGetSlots]);


    const generateSelectOptions = (dataList, optionType) => {
        const optionElements = [];
        const id = optionType + "_id";
        const name = optionType + "_name";
        if (dataList.length) {
            dataList.forEach((item) => {
                optionElements.push(
                    <Option value={item[id]}>{item[name]}</Option>
                );
            })
            return optionElements;
        }
    }

    const onStateSelect = (value) => {
        setStateSelected(value);
        document.getElementsByClassName('district-select')[0].selectedIndex = 0;
        onDistrictSelect(undefined);
    }

    const onDistrictSelect = (value) => {
        setdistrictSelected(value);
    }

    const onDateSelect = (date, dateString) => {
        setDateSelected(dateString);
    }

    const disabledDates = (current) => {
        return current && current.valueOf() < Date.now();
    }

    return (
        < React.Fragment >
            <div className="district-search-container container">
                <Row>
                    <Col className='align-content-center' span={18} offset={3}>
                        <Select size={size} placeholder="Select state" onChange={onStateSelect} className="state-select" style={{ width: '25%' }} >
                            {generateSelectOptions(statesList, "state")}
                        </Select>
                        <Select size={size} value={districtSelected} placeholder="Select district" disabled={stateSelected === -1} autoClearSearchValue={true} className="district-select" onChange={onDistrictSelect} style={{ width: '25%' }} >
                            {generateSelectOptions(districtsList, "district")}
                        </Select>
                        <DatePicker defaultValue={moment()} disabledDate={disabledDates} format="DD-MM-YYYY" placeholder="Select date" className="date-picker" onChange={onDateSelect} />
                        <Button type="primary" disabled={districtSelected === undefined || dateSelected === ""} onClick={() => { setShouldGetSlots(true) }} >Get slots</Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col className="align-content-center" span={22} offset={1}>
                        {
                             slotsData.length > 0 ? <SlotResults slots={slotsData} /> : '' ?
                            slotsData !== -1 || slotsData.length <= 0 ? <p style={{ textAlign: 'center', fontWeight: '500' }}>No slots available!</p> : '':''
                        }
                        {
                            slotsData === -1 ?
                                <p id="vaccine-facts-banner">{facts[Math.floor(Math.random() * facts.length)]}</p>
                                : ''
                        }
                    </Col>
                </Row>
            </div>
        </React.Fragment >
    );
}

export default DistrictSearch;