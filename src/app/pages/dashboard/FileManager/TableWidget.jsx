import React, { useContext } from 'react'
import FileItem from './FileItem'
import FileContext from './FileContext'
const TableWidget = () => { 
    const { files } = useContext(FileContext);
 
    return (
        <>
            {
                (files.length > 0) ?
                    <div className="table-responsive">
                        <table className="table table-striped gy-7 gs-7">
                            <thead>
                                <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"><th class="w-10px pe-2 sorting_disabled" rowspan="1" colspan="1" style={{ width: 29.9 }}>
                                    <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                                        <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_file_manager_list .form-check-input" value="1" />
                                    </div>
                                </th>
                                    <th class="min-w-250px sorting_disabled" rowspan="1" colspan="1" style={{ width: 488.938 }}>Name</th>
                                    <th class="min-w-10px sorting_disabled" rowspan="1" colspan="1" style={{ width: 109.3 }}>Size</th>
                                    <th class="min-w-125px sorting_disabled" rowspan="1" colspan="1" style={{ width: 303.075 }}>Upload Date</th>
                                    <th class="min-w-125px sorting_disabled" rowspan="1" colspan="1" style={{ width: 303.075 }}>Status</th>
                                    <th class="w-125px sorting_disabled" rowspan="1" colspan="1" style={{ width: 124.938 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    files.map((item, index) => (
                                        <FileItem key={item.id} item={item}></FileItem>
                                    ))
                                } 
                            </tbody>
                        </table>
                    </div>
                    :
                    <center>
                        <h1 className='text-muted'>No Document Upload</h1>
                    </center>
            }
        </>
    )
}


export { TableWidget }