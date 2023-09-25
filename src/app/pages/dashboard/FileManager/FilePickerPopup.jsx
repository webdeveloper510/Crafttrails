import React, { useContext, useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { isValidUrl, isValidFileName, extractUserId } from './helper'
import { UPLOAD_DOC_RECORD_API_URL, GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_DEVELOPER_KEY, REACT_SERVER_URL } from './constant'
import FileContext from './FileContext';
import useDrivePicker from 'react-google-drive-picker/dist';


function FilePickerPopup() {
    const [fileName, setFileName] = useState('')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [urlName, setUrlName] = useState('')
    const [targetUrl, setTargetUrl] = useState('')
    const [showBrowseFileTab, setShowBrowseFileTab] = useState(true)
    const [showExtractUrlTab, setShowExtractUrlTab] = useState(false)
    const { files, setFiles } = useContext(FileContext);

    const [openPicker, data, authResponse] = useDrivePicker();

    // function handleOpenGoogleDrivePicker(){

    // }
    const handleOpenGoogleDrivePicker = () => {
        openPicker({
            clientId: GOOGLE_DRIVE_CLIENT_ID,
            developerKey: GOOGLE_DRIVE_DEVELOPER_KEY,
            viewId: "DOCS",
            // token: token, // pass oauth token in case you already have one
            showUploadView: false,
            showUploadFolders: true,
            supportDrives: true,
            scope: ['https://www.googleapis.com/auth/drive.file'],
            multiselect: false,
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                }
                else {
                    console.log("Array = ",Array.isArray(data.docs));
                    console.log(data.docs);
                    console.log(data.authResponse);
                    if (data.docs != undefined && Array.isArray(data.docs)) {
                        var file = data.docs[0];
                        setFileName(file.name)
                        if (!(file instanceof File)) {
                            // Fetch the file content from the Google Drive API and append it to the File object
                            fetch(file.url, {
                                mode: 'no-cors',
                                headers: {
                                    'Access-Control-Allow-Origin': REACT_SERVER_URL, // Replace with your own origin
                                },
                            })
                                .then((response) => response.blob())
                                .then((blob) => {
                                    // Manually create a File object 
                                    var newFile = new File([blob], file.name, {
                                        type: file.mimeType,
                                        lastModified: new Date().getTime() ,
                                        name: blob.name,
                                        size: blob.size,
                                        // content: 
                                    });  

                                    // console.log("--file = ", newFile);
                                    // console.log("--file.size = ", blob.size);
                                    // console.log("--file.size = ", newFile.size);
                                    // console.log("--file.name = ", newFile.name);
                                    // console.log("--file instanceof File = ", newFile instanceof File);
                                     
 
                                    setUploadedFile(newFile)
                                    postDocumentToServer(true)

                                })
                        }
                    }
                }
            },
        })
    }


    useEffect(() => {
        if (data) {
            // data.docs.map( (i)=> console.log(i) )
        }
    }, [data])


    function fileFormSubmissionHandler() {
        if (!isValidFileName(fileName)) {
            alert("Invalid File Name")
            return
        }
        if (!uploadedFile) {
            alert("Please Select File")
            return
        }
        postDocumentToServer(true)
    }
    function urlFormSubmissionHandler() {
        if (!isValidFileName(urlName)) {
            alert("Invalid File Name")
            return
        }
        if (!isValidUrl(targetUrl)) {
            alert("Invalid Url")
            return
        }

        postDocumentToServer(false);
    }

    const postDocumentToServer = (is_file) => {
        const formData = new FormData();
        formData.append('user_id', extractUserId());
        if (is_file) {
            console.log("---> uploadedFile ", uploadedFile)
            formData.append('file', uploadedFile);
            formData.append('name', fileName);
        } else {
            formData.append('url', targetUrl);
            formData.append('name', urlName);
        }
        fetch(`${UPLOAD_DOC_RECORD_API_URL}`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                const newFiles = [data, ...files]
                setFiles(newFiles)
                document.getElementById("close_modal").click()
                alert("Your document has been uploaded")
                return
            })
            .catch((error) => {
                alert("Error occured while uploading Document")
            });
    };


    function loadFileUploaderPopup(tab_index) {
        if (tab_index == 0) {
            setShowBrowseFileTab(true)
            setShowExtractUrlTab(false)
        } else {
            setShowBrowseFileTab(false)
            setShowExtractUrlTab(true)
        }
        setFileName('')
        setUploadedFile(null)
        setUrlName('')
        setTargetUrl('')
    }


    return (
        <>
            <div class="btn btn-primary cursor-pointer symbol symbol-35px symbol-md-40px show menu-dropdown" data-kt-menu-trigger="{default: 'click'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                <i className="bi bi-cloud-arrow-up-fill fs-4 me-2"></i>
                Upload Files / URL
                <i className="bi bi-chevron-down fs-4 mx-2 pb-1"></i>
            </div>
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px' data-kt-menu='true'>
                <div className='separator my-2'></div>
                <div className='menu-item px-5 my-1'>
                    <span className='menu-link px-5' onClick={() => { loadFileUploaderPopup(0) }} data-bs-toggle="modal" data-bs-target="#kt_modal_1">
                        <i className="bi bi-upload fs-4 "></i>
                        <span className='mx-5'>Browse File</span>
                    </span>
                </div>

                <div className='menu-item px-5'>
                    <span className='menu-link px-5' onClick={() => { loadFileUploaderPopup(1) }} data-bs-toggle="modal" data-bs-target="#kt_modal_1">
                        <i className="bi bi-link-45deg fs-4 "></i>
                        <span className='mx-5'>Fetch URL</span>
                    </span>
                </div>
                <div className='menu-item px-5'>
                    <span className='menu-link px-5' onClick={() => { handleOpenGoogleDrivePicker() }}>
                        <i class="fab fa-google-drive fs-4"></i>
                        <span className='mx-5'>Google Drive</span>
                    </span>
                </div>


            </div>


            <div className="modal fade" tabIndex={-1} id="kt_modal_1">
                <div className="modal-dialog" style={{ maxWidth: "40%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload File / URL</h5>
                            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close"  >
                                <KTSVG path="/media/icons/duotune/arrows/arr061.svg" className="svg-icon svg-icon-2x" />
                            </div>
                        </div>
                        <div className="modal-body pt-0">
                            <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
                                <li className="nav-item">
                                    <a className={`nav-link ${showBrowseFileTab ? "active" : ''}`} data-bs-toggle="tab" href="#kt_tab_pane_1"    >
                                        Browse File
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${showExtractUrlTab ? "active" : ''}`} data-bs-toggle="tab" href="#kt_tab_pane_2"    >
                                        Target URL
                                    </a>
                                </li>

                            </ul>
                            <div className="tab-content mx-5" id="myTabContent">
                                <div className={`tab-pane fade ${showBrowseFileTab ? "active show" : ''}`} id="kt_tab_pane_1" role="tabpanel">

                                    <form action="" method="post">
                                        <div class="mb-4">
                                            <label for="name" class="required form-label">Name</label>
                                            <input type="email" id='name' class="form-control form-control-solid" placeholder="Assigned Name" value={fileName} onChange={(e) => { setFileName(e.target.value) }} />
                                        </div>
                                        <div class="">
                                            <label for="url" class="required form-label">File</label>
                                            <input onChange={(e) => (setUploadedFile(e.target.files[0]))} type="file" id='url' class="form-control form-control-solid" placeholder="Browse File" accept="text/*, text/html, application/pdf" />
                                        </div>
                                        <button onClick={() => { fileFormSubmissionHandler() }} type="button" className="btn btn-primary mt-5 w-100">  <i className="bi bi-cloud-arrow-up-fill fs-4 me-2"></i> Upload File  </button>
                                    </form>

                                </div>
                                <div className={`tab-pane fade ${showExtractUrlTab ? "active show" : ''}`} id="kt_tab_pane_2" role="tabpanel">

                                    <form action="" method="post">
                                        <div class="mb-4">
                                            <label for="name" class="required form-label">Name</label>
                                            <input type="email" id='name' class="form-control form-control-solid" placeholder="Assigned Name" value={urlName} onChange={(e) => { setUrlName(e.target.value) }} />
                                        </div>
                                        <div class="">
                                            <label for="url" class="required form-label">URL</label>
                                            <input type="url" id='url' class="form-control form-control-solid" placeholder="Enter URL" value={targetUrl} onChange={(e) => { setTargetUrl(e.target.value) }} />
                                        </div>
                                        <button type="button" className="btn btn-primary mt-5 w-100" onClick={() => urlFormSubmissionHandler()}>  <i className="bi bi-cloud-arrow-up-fill fs-4 me-2"></i> Fetch URL  </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='close_modal' className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">   Save changes  </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilePickerPopup