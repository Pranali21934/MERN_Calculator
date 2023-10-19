import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calculator.css';
import { TfiReload } from "react-icons/tfi";
import { AiFillDelete } from "react-icons/ai";
import { FaBackspace } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import axios from 'axios';


function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [usertable, setusertable] = useState([]);
  const [calname, setcalname] = useState('');

  const handleInput = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };



  const clearHistory = () => {
    setHistory([]);
  };

  const handleRecalculate = (expression, uid, cid, cname) => {
    deleteCalculation(uid, cid)
    setInput(expression);
    setResult('');
    setcalname(cname);
  };
  const handleBackspace = () => {
    if (input.length > 0) {
      // Remove the last character from the input
      setInput(input.slice(0, -1));
    }
  };

  const handleDelete = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
  };

  var [data, setData] = useState({});
  var [data2, setData2] = useState({});
  let navigate = useNavigate();
  const callAboutPage = async () => {
    try {

      const res = await fetch(`http://localhost:8000/ab`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data1 = await res.json();
      console.log(data1.calculations);
      setData2(data1);
      setusertable(data1.calculations)
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    catch (err) {
      console.log(err);
      navigate('/login');
    }
  }





  const calculateResult = async () => {
    console.log("hellombdsabnhddnasnhdnsavnv");
    // try {
    // console.log(data.email);
    console.log(input);
    // console.log(calculatedResult);

    const calculatedResult = await eval(input);

    setResult(calculatedResult);
    setHistory([...history, { expression: input, result: calculatedResult }]);
    console.log(history);
    const userid = data2._id;
    const res = await fetch(`http://localhost:8000/addcalculation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input, calculatedResult, userid, calname
      })

    });
    console.log("data added added");
    const data = await res.json();
    console.log(data);
    console.log(data.findeduser.calculations);
    setusertable(data.findeduser.calculations)



    setcalname('');
    setInput('');
    // } catch (error) {
    //     setResult('Error');
    // }
  };

  const deleteCalculation = async (userId, calculationId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete`, {
        data: {
          userId,
          calculationId,
        },
      });
      // Handle the response (e.g., update the UI)
      console.log('Calculation deleted:', response.data);
    } catch (error) {
      console.error('Error deleting calculation:', error);
    }
  };


  useEffect(() => {
    callAboutPage();

  }, [usertable]);
  return (
    <>
      <div className='div1'>
        <div className='inner_div1'>
        <div className='heading1'>
            <center> <h1>Calculator</h1></center>
          </div>
          <div className="calculator">
            <div className="display">
              <input type="text" value={input} readOnly />
              {/* <div className="result">{result}</div> */}
            </div>
            <div className="buttons">
              <div className="row">
                <button className='Equal' onClick={clearInput}>C</button>
                <button className='Equal' onClick={() => handleInput('%')}>%</button>
                <button className='Equal' onClick={handleBackspace}><FaBackspace></FaBackspace></button>
                <button className='Equal' onClick={() => handleInput('/')}>/</button>
              </div>
              <div className="row">
                <button onClick={() => handleInput('7')}>7</button>
                <button onClick={() => handleInput('8')}>8</button>
                <button onClick={() => handleInput('9')}>9</button>
                <button className='Equal' onClick={() => handleInput('*')}>*</button>
              </div>
              <div className="row">
                <button onClick={() => handleInput('4')}>4</button>
                <button onClick={() => handleInput('5')}>5</button>
                <button onClick={() => handleInput('6')}>6</button>
                <button className='Equal' onClick={() => handleInput('-')}>-</button>
              </div>
              <div className="row">
                <button onClick={() => handleInput('1')}>1</button>
                <button onClick={() => handleInput('2')}>2</button>
                <button onClick={() => handleInput('3')}>3</button>
                <button className='Equal' onClick={() => handleInput('+')}>+</button>
              </div>
              <div className="row">
                <button onClick={() => handleInput('0')}>0</button>
                <button onClick={() => handleInput('.')}>.</button>
                <button className='Equal' onClick={calculateResult}>=</button>

              </div>

            </div>
          </div>

          <div className='cal_div'>
            <p>Calculation Name</p>
            <input type='text' placeholder='Enter Name' value={calname} onChange={(e) => setcalname(e.target.value)} required name="calname"></input>
          </div>

        </div>

        <div className='inner_div2'>
          <div className='heading'>
            <center> <h1>Your Calculations</h1></center>
          </div>
          <Table striped bordered hover className='table'>
            <thead>
              <tr>
                <th className='t_bold'>Name</th>
                <th className='t_bold'>Calculation</th>
                <th className='t_bold'>Result</th>
                <th className='t_bold'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {
                usertable.map((e, item) => (
                  <>
                    <tr>
                      <td>{e.calname}</td>
                      <td>{e.expression}</td>
                      <td>{e.result}</td>
                      <td> <button className='b1' onClick={() => handleRecalculate(e.expression, data2._id, e._id, e.calname)}><TfiReload></TfiReload></button>
                        <button className='b1' onClick={() => deleteCalculation(data2._id, e._id)}><AiFillDelete></AiFillDelete></button>
                      </td>
                    </tr>

                  </>
                ))
              }


            </tbody>
          </Table>


        </div>

      </div>








    </>
  )
}

export default Calculator;