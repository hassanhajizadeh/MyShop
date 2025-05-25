import React from "react";

const NumberInput = ({ count, setCount ,maxCount , showAlert }) => {
    const decrease = () => {
        if (count === 1) {
            showAlert({type:'alert' , msg:"تعداد کمتر از این نمی شود."});
        } else {
            setCount((prev) => {
                return prev - 1;
            });
        }
    };
    const increase = () => {
        if(count === Number(maxCount)) {
            showAlert({type:'alert',msg:"درخواست شما بیش از تعداد موجود است."});
        } else {
            setCount((prev) => {
                return prev + 1;
            });
        }
    };
    const handleChange = (e) =>{
        if(Number(e.target.value)<1){
            e.target.value='1'
        }
        else if(Number(e.target.value)>maxCount){
            e.target.value=maxCount;
        }
        setCount(Number(e.target.value))
    }
    return (
        <div className="number-input">
            <button
                className="inc"
                onClick={() => increase()}
            >
                +
            </button>
            <input
                type="number"
                value={count}
                onChange={(e) => handleChange(e)}

            />
            <button onClick={() => decrease()}>-</button>
        </div>
    );
};

export default NumberInput;
