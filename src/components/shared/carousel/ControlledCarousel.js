import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap';


class ControlledCarousel extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const { index, direction } = this.state;

        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.imgur.com/EBTBvM8.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Let's Save our planet</h3>
                        <p>
                            Let's save our planet and make money out of it.
              </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.imgur.com/wui5DKD.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Let's Save our planet</h3>
                        <p>
                            Let's save our planet and make money out of it.
              </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.imgur.com/JoknsgV.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Let's Save our planet</h3>
                        <p>
                            Let's save our planet and make money out of it.
              </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default ControlledCarousel;