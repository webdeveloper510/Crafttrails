/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { TableWidget } from './TableWidget'
import FileContext from './FileContext'
import FilePickerPopup from './FilePickerPopup'
import ReloadWidget from './ReloadWidget'
import { GET_USER_FOLDER_HIERARCHY } from './constant'
import { formatBytes, extractUserInfo, extractUserId } from './helper'
const DcumentManagerWrapper = () => {
    const intl = useIntl()
    const [queryFiles, setQueryFiles] = useState([])
    const [files, setFiles] = useState([])
    const [inputFileNameQuery, setinputFileNameQuery] = useState('')
    const [reloadBtnText, setReloadBtnText] = useState('Reload')
    const [isReloadBtnDisabled, setReloadBtnDisabled] = useState(false)
    const [zeroFileLoadUploadPopup, setZeroFileLoadUploadPopup] = useState(false)
    const totalFilesSize = files.reduce((total, item) => total + item.size, 0);
    const userInfo = extractUserInfo();


    async function loadUserFolderHierarchy(reload = false) {
        if (reload) {
            setReloadBtnText("Loading ...")
            setReloadBtnDisabled(true)
        }
        const response = await fetch(`${GET_USER_FOLDER_HIERARCHY}?user_id=${extractUserId()}`)
        const data = await response.json();
        setFiles(data['data'])
        setQueryFiles(data['data'])
        setReloadBtnText("Reload")
        setReloadBtnDisabled(false)
        if (data['data'].length == 0) {
            setZeroFileLoadUploadPopup(true)
        }


    }


    useEffect(() => {
        loadUserFolderHierarchy();
    }, [])

    function onChangeFileNameQuery(event) {
        const query = event.target.value;
        setinputFileNameQuery(query);
        const filteredFileRecords = queryFiles.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        setFiles(filteredFileRecords)
    }



    const values = { files, setFiles, loadUserFolderHierarchy, reloadBtnText, isReloadBtnDisabled, zeroFileLoadUploadPopup, setZeroFileLoadUploadPopup };
    return (
        <FileContext.Provider value={values}>

            <>
                {/* Header Area */}
                <div class="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10"  >
                    <div class="card-header pt-10">
                        <div class="d-flex align-items-center">
                            <div class="symbol symbol-circle me-5">
                                <div class="symbol-label bg-transparent text-primary border border-secondary border-dashed">
                                    <i class="ki-duotone ki-abstract-47 fs-2x text-primary"><span class="path1"></span><span class="path2"></span></i>                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <h2 class="mb-1">File Manager</h2>
                                <div class="text-muted fw-bold">
                                    <a href="#">Keenthemes</a> <span class="mx-3">|</span>
                                    <a href="#">File Manager</a>
                                    <span class="mx-3">|</span> {formatBytes(totalFilesSize)}<span class="mx-3">|</span> {files.length} items
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body pb-0">
                        <div class="d-flex overflow-auto h-55px">
                            {/* <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap">
                                <li class="nav-item">
                                    <a class="nav-link text-active-primary me-6 active" href="/metronic8/demo1/../demo1/apps/file-manager/folders.html">
                                        Files
                                    </a>
                                </li> 
                                <li class="nav-item">
                                    <a class="nav-link text-active-primary me-6" href="/metronic8/demo1/../demo1/apps/file-manager/settings.html">
                                        Settings
                                    </a>
                                </li> 
                            </ul> */}
                        </div>

                    </div>
                </div>
                {/* File Listing Table */}
                <div class="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-5"  >
                    <div class="card-header pt-8">
                        <div class="card-title">
                            <div class="d-flex align-items-center position-relative my-1">
                                <i class="ki-duotone ki-magnifier fs-1 position-absolute ms-6"><span class="path1"></span><span class="path2"></span></i>
                                <input type="text" data-kt-filemanager-table-filter="search"
                                    class="form-control form-control-solid w-250px ps-15" placeholder="Search Files &amp; Folders" value={inputFileNameQuery} onChange={(e) => onChangeFileNameQuery(e)}
                                />
                            </div>
                        </div>

                        <div class="card-toolbar">
                            <div class="d-flex justify-content-end" data-kt-filemanager-table-toolbar="base">

                                <ReloadWidget></ReloadWidget>
                                <FilePickerPopup></FilePickerPopup>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="d-flex flex-stack">
                            <div class="badge badge-lg badge-light-primary">
                                <div class="d-flex align-items-center flex-wrap">

                                    <i class="ki-duotone ki-user fs-2 text-primary mx-1"></i> <a href="#"> {userInfo['first_name']} {userInfo['last_name']} </a>
                                </div>
                            </div>

                            <div class="badge badge-lg badge-primary">
                                <span id="kt_file_manager_items_counter">{files.length} items</span>
                            </div>
                        </div>
                        <TableWidget></TableWidget>
                    </div>
                </div>
            </>
        </FileContext.Provider>

    )
}

export { DcumentManagerWrapper }
