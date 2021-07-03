import React from 'react';
import { Tabs, PageHeader, Button } from 'antd';
import DistrictSearch from '../../components/district/DistrictSearch';
import PincodeSearch from '../../components/pincode/PincodeSearch';
import 'antd/dist/antd.css';
import { Footer } from 'antd/lib/layout/layout';
import { UpOutlined } from '@ant-design/icons';
import $ from 'jquery';

const Home = () => {

    const { TabPane } = Tabs;
    const btn = $('#button');
    const VACCINE_FACTS = [
        "Immunization through vaccination is the safest way to protect against disease.",
        "It is always best to get vaccinated, even when you think the risk of infection is low.",
        "Combined vaccines are safe and beneficial.",
        "There is no link between vaccines and autism.",
        "If we stop vaccination, deadly diseases will return."
    ]

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    const scrollToTop = (e) => {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    }

    return (<React.Fragment>
        <main className="home">
            <PageHeader title="💉 VaccSearch" style={{ backgroundColor: '#f0f2f5', fontWeight: '1004' }}>
            </PageHeader>
            <Tabs className="tabs-content" defaultActiveKey="1" centered>
                <TabPane tab="Search by district" key="1">
                    <DistrictSearch facts={VACCINE_FACTS} />
                </TabPane>
                <TabPane tab="Search by Pincode" key="2" >
                    <PincodeSearch facts={VACCINE_FACTS} />
                </TabPane>
                <TabPane tab="Get 7 days slots" key="3" >
                    <p style={{ textAlign: 'center' }}>
                        Coming soon!
                    </p>
                </TabPane>
            </Tabs>
            <Footer style={{ position: 'sticky', bottom: '0', textAlign: 'center' }} >
                Made with ☕️ by <a href="https://twitter.com/iamtechpathi" target="blank">@iamtechpathi</a>  | 🍴 this project on <a href="https://github.com/techpathi/vaccSearch" target="blank"> Github</a>
            </Footer>
            <Button id="button" onClick={scrollToTop}>
                <UpOutlined />
            </Button>
        </main>
    </React.Fragment>);
}

export default Home;