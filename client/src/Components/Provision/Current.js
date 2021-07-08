import React from 'react'
import { formatToEUR } from "../../Functions/CommonFunctions";

export default function Current({data, growth}) {
    return (
        <div className="text-3xl md:text-5xl">
          {formatToEUR(
            data.current?.prevMonth +
              data.current?.currentIncome -
              data.current?.currentOut
          )}
          {!isNaN(growth) && isFinite(growth) ? (
            <sup
              className={
                "text-2xl md:text-4xl " +
                (growth > 0 ? "text-accent" : "text-red-500")
              }
            >
              {growth}%
            </sup>
          ) : (
            ""
          )}
        </div>
    )
}
