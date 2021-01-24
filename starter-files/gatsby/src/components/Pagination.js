import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStypes = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-items: center;
    border: 1px solid var(--grey);
    margin: 2 rem 0;
    border-radius: 5px;
    text-align: center;
    & > * {
        padding: 1rem;
        flex: 1;
        border-right: 1px solid var(--grey);
        text-decoration: none;
        &[aria-current], &.current {
            color: var(--red);
        }
        &[disabled] {
            pointer-events: none;
            color: var(--grey);
        }
    }

    @media(max-width: 800px) {
        .word {
            display: done
        }
        fonts-size: 1.5rem;
    }


`;

export default function Pagination({
    pageSize,
    totalCount,
    currentPage,
    skip,
    base,
}) {
    const totalPages = Math.ceil(totalCount / pageSize);
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const hasNextPage = nextPage <= totalPages;
    const hasPrevPage = prevPage >= 1;

    return (
        <PaginationStypes>
            <Link
                to={`${base}/${prevPage}`}
                disabled={!hasPrevPage}
            >
                ← <span title="Prev Page" className="word">Prev</span>
            </Link>
            {Array.from({length: totalPages}).map((_, i)=>{
                return (
                    <Link
                        key={`page-${i}`}
                        className={currentPage === 1 && i === 0 ? 'current' : ''}
                        to={`${base}/${ i>0 ? i + 1 : ''}`}
                    >
                        {`${i+1}`}
                    </Link>
                )
            })}
            <Link
                to={`${base}/${nextPage}`}
                disabled={!hasNextPage}
            >
                <span title="Next Page" className="word">Next</span> →
            </Link>
        </PaginationStypes>
    );
}