import React, { Component } from 'react';

class offersDetails extends Component {
    render() {
        return (
            <section className="py-5 bg-white">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-10">
                            <div className="flexslider">
                                <ul className="slides">
                                    <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg">
                                        <img src="http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg" />
                                    </li>
                                    <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg">
                                        <img src="http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg" />
                                    </li>
                                    <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg">
                                        <img src="http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg" />
                                    </li>
                                    <li data-thumb="http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg">
                                        <img src="http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-10">

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default offersDetails;