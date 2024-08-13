import { useEffect, useState } from "react";
import {decode} from 'html-entities';

export default function Pagination({pagination,handlePageChange , perPage ,handlePerPage }) {

  
  return (
    <>
    <div className="join">
        {pagination.links && pagination.links.map((link, index) => (
          <button
            className="join-item btn btn-md"
            key={index}
            disabled={!link.url || link.active}
            onClick={() => handlePageChange(link.url)}
          >
            {decode(link.label)}
          </button>
        ))}
        
        <select className="select select-bordered w-full max-w-xs"
                value={perPage} 
                onChange={handlePerPage}
          >
          <option value={4}>4</option>
          <option value={8} selected>8</option>
          <option value={16}>16</option>
        </select>

        </div>
    </>
  )
}
