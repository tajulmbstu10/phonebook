import React, { useState, useEffect } from 'react';

function HomeScreen(props) {
    const [inputNumber, setInputNumber] = useState('');
    const [previousInput, setPreviousInput] = useState('');
    const [output, setOutput] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        let input = Math.abs(inputNumber)
        let result = 1;
        for (let i = 2; i <= input; i++) {
            result = result * i;
        }
        setPreviousInput(inputNumber)
        return inputNumber < 0 || inputNumber === '-0' ? setOutput(-result) : setOutput(result);
    }

    useEffect(() => {
        document.title = "Factorial Calculator";
        return () => {
            //
        };
    }, []);
    return (<div className="home-content">
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h1> Factorial calculator </h1>
                    </li>
                    <li>
                        <label htmlFor="inputNumber" > Set your number </label>
                        <input type="number" name="inputNumber" id="inputNumber" onChange={(e) => { setInputNumber(e.target.value) }} placeholder="Enter a number" required ></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary"> Calculate Factorial </button>
                    </li>

                </ul>
                {previousInput && output ? <div><h2> Input: {previousInput}</h2>
                    <h2>Factorial: {output}</h2> </div> : null}
            </form>

        </div>
    </div>
    );
}

export default HomeScreen;