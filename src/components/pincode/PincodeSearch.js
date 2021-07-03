import React, { useEffect, useState } from 'react';
import { DatePicker, Button, InputNumber, Divider, Row, Col } from 'antd';
import APIGetCall from '../../utilities/APIGetCall';
import '../district/district-search.css';
import SlotResults from '../results/SlotResults';
import moment from 'moment';

const SLOTS_BY_PINCODE_URL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=';

const PincodeSearch = ({ facts }) => {

    const [pincode, setPinCode] = useState(0);
    const [shouldGetSlots, setShouldGetSlots] = useState(false);
    const [dateSelected, setDateSelected] = useState(moment(new Date()).format('DD-MM-YYYY'));
    const [slotsData, setSlotsData] = useState(-1);

    useEffect(() => {
        const getSlotsByPincode = async () => {
            const slotsData = await APIGetCall(SLOTS_BY_PINCODE_URL + pincode + '&date=' + dateSelected);
            setSlotsData(slotsData.sessions);
            setShouldGetSlots(false);
        }
        if (shouldGetSlots) {
            getSlotsByPincode();
        }
    }, [shouldGetSlots]);


    const onDateSelect = (date, dateString) => {
        setDateSelected(dateString);
    }

    const disabledDates = (current) => {
        return current && current.valueOf() < Date.now();
    }

    const onPincodeInput = (value) => {
        setPinCode(value);
    }

    return (
        < React.Fragment >
            <div className="district-search-container container">
                <Row>
                    <Col className='align-content-center' span={16} offset={4}>
                        <InputNumber onChange={onPincodeInput} type="number" minLength={6} size="middle" placeholder="Enter Pincode" className="pincode-input" style={{ width: '20%' }} />
                        <DatePicker defaultValue={moment()} disabledDate={disabledDates} format="DD-MM-YYYY" placeholder="Select date" className="date-picker" onChange={onDateSelect} style={{ width: '25%' }} />
                        <Button type="primary" disabled={pincode.toString().length !== 6 || dateSelected === ""} onClick={() => { setShouldGetSlots(true) }} >Get slots</Button>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col className="align-content-center" span={22} offset={1}>
                        {
                            slotsData.length > 0 ? <SlotResults slots={slotsData} /> :
                            slotsData !== -1 || slotsData.length <= 0 ? <h2 style={{ textAlign: 'center', fontWeight: '500' }}>No slots available!</h2> : ''
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

export default PincodeSearch;