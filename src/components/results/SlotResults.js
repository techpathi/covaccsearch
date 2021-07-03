import React from 'react';
import { Table, Tag } from 'antd';
import './slot-results.css';

const columns = [
    {
        title: 'Center Name',
        dataIndex: 'centerName',
        key: 'centerName',
        render: text => <p style={{ fontWeight: 'bold' }}>{text}</p>,
    },
    {
        title: 'Total, 1st & 2nd Dose Availability',
        dataIndex: 'availableCapacities',
        key: 'availableCapacities',
        render: capacities => (
            <>
                {capacities.map(capacity => {
                    return (
                        <Tag color={capacity > 0 ? 'green' : 'red'} key={capacity}>
                            {capacity}
                        </Tag>

                    )
                })}
            </>
        )
    },
    {
        title: 'Vaccine Name',
        dataIndex: 'vaccineName',
        key: 'vaccineName',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Free/Paid',
        dataIndex: 'feeType',
        key: 'feeType',
        render: text => <p>{text}</p>,
    },

    {
        title: 'Fee Amount',
        dataIndex: 'fee',
        key: 'fee',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Min. Age',
        dataIndex: 'minAgeLimit',
        key: 'minAgeLimit',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Address',
        dataIndex: 'centerAddress',
        key: 'centerAddress',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Pincode',
        dataIndex: 'pincode',
        key: 'pincode',
        render: text => <p>{text}</p>,
    },
    {
        title: 'Slot Timings',
        dataIndex: 'slotTimings',
        key: 'slotTimings',
        render: timings => (
            <>
                {timings.map(timing => {
                    return (
                        <Tag color={'blue'} key={timing}>
                            {timing}
                        </Tag>
                    );
                })}
            </>
        )
    },
]

const generateTableData = (rawSlotsData) => {
    let tableData = [];
    rawSlotsData.forEach((slot) => {
        tableData.push({
            centerName: slot.name,
            availableCapacities: [].concat(slot.available_capacity, slot.available_capacity_dose1, slot.available_capacity_dose2),
            feeType: slot.fee_type,
            fee: slot.fee,
            vaccineName: slot.vaccine,
            minAgeLimit: slot.min_age_limit,
            centerAddress: slot.address,
            pincode: slot.pincode,
            slotTimings: [].concat(slot.slots)
        })
    });
    console.log('Table data:', tableData);
    return tableData;
}

const SlotResults = ({ slots }) => {
    let filteredSlots = slots.filter((slot) => {
        return slot.available_capacity !== 0;
    })

    let displayContent = filteredSlots.length > 0 ?
        <Table columns={columns} dataSource={generateTableData(filteredSlots)} /> :
        <h2 style={{ textAlign: 'center', fontWeight: '500' }}>No slots available!</h2>

    return displayContent;

}

export default SlotResults;