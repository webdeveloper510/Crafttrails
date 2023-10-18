import { useEffect, useState } from 'react';
import { getActiveUserCount } from '../../../utils/Api';

function ActiveUserCountBox() {
    const [activeUserCount, setActiveUserCount] = useState(0);

    useEffect(() => {
        getActiveUserCount().then(res => {
            if (res.code === 200) {
                setActiveUserCount(res?.data?.active_count);
            }
        })
    }, []);

    return (
        <div style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }} 
        className="card card-flush user_active py-5 d-flex justify-content-center  mb-5 mb-xl-10 user_active">
            <div className=" display-2 d-flex justify-content-center">
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