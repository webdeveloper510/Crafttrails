import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';

const DynamicTable = ({ data, moreView, display }) => {

    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortedData, setSortedData] = useState(data?.slice());
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const generateTableHeaders = () => {
        if (sortedData.length === 0) {
            return null;
        }
        const titleDisplay = (key) => {
            if (key.includes("_")) {
                let words = key.split("_")
                let text = words[0]
                for (let i = 1; i < words.length; i++) {
                    text = text + " " + words[i]
                }
                return text
            } else {
                return key
            }
        }

        const firstItem = sortedData[0];
        return Object.keys(firstItem).map((key) => {
            if (key !== "title_submenu") {
                return (
                    <th key={key} onClick={() => sortData(key)}>
                        <div className="header-cell">
                            <span className='text-capitalize'>{titleDisplay(key)}</span>
                            {sortKey === key && (
                                sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />
                            )}
                        </div>
                    </th>
                )
            }
        });
    };

    const sortData = (key) => {
        setSortKey(key);
        setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const dateFormater = (val) => {
        let d = new Date(val)
        let date = d.getDate() + "-" + Number(d.getMonth() + 1) + "-" + d.getFullYear()
        return date
    }

    const itemsCount = sortedData?.length;
    const totalPages = Math.ceil(itemsCount / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (sortKey) {
            const copyData = [...data];
            copyData.sort((a, b) => {
                if (sortDirection === 'asc') {
                    return a[sortKey] - b[sortKey];
                } else {
                    return b[sortKey] - a[sortKey];
                }
            });
            setSortedData(copyData);
        } else {
            setSortedData(data?.slice())
        }
    }, [data, sortKey, sortDirection]);

    const renderPagination = () => {
        const pagesToShow = 3;
        const pageArray = [];

        if (totalPages <= pagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageArray.push(i);
            }
        } else {
            const half = Math.floor(pagesToShow / 2);
            let startPage = currentPage - half;
            let endPage = currentPage + half;

            if (startPage < 1) {
                startPage = 1;
                endPage = pagesToShow;
            } else if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - pagesToShow + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pageArray.push(i);
            }
        }

        return (
            <div className="d-flex justify-content-between align-items-center">
                <span>{`Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, itemsCount)} of ${itemsCount} entries`}</span>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {pageArray.map((page) => (
                        <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        );
    };

    return (
        <Card>
            <Card.Body>
                <div>
                    <Table striped bordered hover>
                        <thead className='bg-dark text-light'>
                            <tr>{generateTableHeaders()}</tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    {Object.keys(item).map((key) => {
                                        if (key !== "title_submenu") {
                                            if (typeof (item[key]) !== "object") {
                                                if (key.includes("date") || key === "first_created" || key === "last_updated") {
                                                    return (
                                                        <td key={key}>{item[key] !== "" ? dateFormater(item[key]) : "N/A"}</td>
                                                    )
                                                } else if (display?.value && key === display?.key) {
                                                    return (
                                                        <td key={key} >
                                                            <span className='rounded_cover' onClick={() => moreView({ toggle: true, data: item["title_submenu"] })}>{item[key] !== "" ? item[key] : "N/A"}</span>
                                                        </td>
                                                    )
                                                } else {
                                                    return (
                                                        <td key={key}>{item[key] !== "" ? item[key] : "N/A"}</td>
                                                    )
                                                }
                                            } else {
                                                if (key === "phone_number") {
                                                    return (
                                                        <td key={key}>{item[key] !== "" ? item?.[key]?.[0]?.["sys_title"] : "N/A"}</td>
                                                    )
                                                } else {
                                                    return (
                                                        <td key={key}>{item[key] !== "" ? item[key][0] : "N/A"}</td>
                                                    )
                                                }
                                            }
                                        }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {renderPagination()}
                </div>
            </Card.Body>
        </Card>
    );
};

export default DynamicTable;