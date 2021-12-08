import React from 'react'

export const Pagination = ({ onPageChange, totalPages, currentPage, counter, handleCounter }) => {
    const buttonPerPage = totalPages>20?20:totalPages;
    const startIndex = 1 + buttonPerPage * counter;
    const endIndex = buttonPerPage + buttonPerPage * counter;
    return (
        <div className="d-flex justify-content-center" >
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button className={`page-link ${startIndex == 1 ? "btn disabled" : null}`} name="prev" value={-1} onClick={(e) => handleCounter(parseInt(e.target.value))} >Prev</button></li>
                    {
                        new Array(totalPages + 1).fill("").slice(startIndex, endIndex + 1).map((item, index) => {
                            return <li className={`page-item ${index+startIndex == currentPage ? "active" : null } `} key={index}><button className="page-link" value={index + startIndex} name="numbering" onClick={(e) => onPageChange(e.target.value)} >{index + startIndex}</button></li>
                        })
                    }

                    <li className="page-item"><button className={`page-link ${endIndex == totalPages ? "btn disabled" : null}`} name="next" value={1} onClick={(e) => handleCounter(parseInt(e.target.value))} >Next</button></li>
                </ul>
            </nav>
        </div>
    )
}
