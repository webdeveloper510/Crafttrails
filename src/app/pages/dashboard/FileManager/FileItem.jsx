import React, { useContext } from 'react'
import { formatBytes } from './helper';
import FileContext from './FileContext';
import { DELETE_DOC_RECORD_API_URL } from './constant';

function FileItem(props) {
    const { loadUserFolderHierarchy } = useContext(FileContext);
    const item = props.item;
    async function deleteDocumentRecord(id) {
        const response = await fetch(`${DELETE_DOC_RECORD_API_URL}?id=${id}`)
        const data = await response.json();
        loadUserFolderHierarchy();

    }

    function onClickDeleteDocBtn(id) {
        deleteDocumentRecord(id)
    }

    return (
        <>

            <tr class="odd">
                <td><div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" value="1" />
                </div></td>
                <td data-order="account">
                    <div class="d-flex align-items-center">
                        {/* <span class="icon-wrapper"><i class="ki-duotone ki-folder fs-2x text-primary me-4"><span class="path1"></span><span class="path2"></span></i></span> */}
                        <a href="" class="text-gray-800 text-hover-primary text-muted fw-bold">
                            {item.name}
                        </a>
                    </div>
                </td>
                <td class='text-muted fw-bold'>{formatBytes(item.size)}</td>
                <td data-order="Invalid date" class='text-muted fw-bold'>{item.creation_time}</td>
                <td data-order="Invalid date" class='text-muted fw-bold'>
                    {
                        (item.status == "Complete") ?
                            <span className="badge badge-success">{item.status}</span>
                            :
                            (item.status == "Failed") ?
                                <span className="badge badge-danger">{item.status}</span>
                                :
                                <span className="badge badge-light-primary">{item.status}</span>
                    }

                </td>
                <td class="text-end" data-kt-filemanager-table="action_dropdown">
                    <div class="d-flex justify-content-end">

                        <i className="bi text-danger bi-trash fs-4 me-2" onClick={() => { onClickDeleteDocBtn(item.id) }}></i>
                    </div></td>
            </tr>
        </>
    )
}

export default FileItem