import { useEffect, useState } from 'react';

function ActiveUserCountBox() {
    const [activeUserCount, setActiveUserCount] = useState(5);

    useEffect(() => {

    }, []);

    return (
        <div className="card card-flush active-count-box py-5 h-md-50 mb-5 mb-xl-10">
            <div className=" display-2 d-flex my-5 justify-content-center">
                {/* <div className='border border-3 border-dark  rounded-circle d-flex justify-content-center align-items-center ' style={{ width: '70px', height: '70px' }} > */}
                <p className='mb-0 text-danger'> {activeUserCount} </p>
                {/* </div> */}
            </div>
            <div className="label text-center">
                <h3>Active User Count</h3>
            </div>
        </div>
    );
}

export default ActiveUserCountBox;