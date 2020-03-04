import React, { useEffect, useState } from "react";
import Bubble from "../components/charts/Bubble";
import { format, subDays } from "date-fns";
import Calendar from "../components/charts/Calendar";
import ChartsNav from "../components/charts/filters/ChartsNav";
import ChartsByDate from "../components/charts/filters/ChartsByDate";
import ChartsByType from "../components/charts/filters/ChartsByType";
import ChartsByMood from "../components/charts/filters/ChartsByMood";

const Stats = () => {
  //default date (lastweek => today)
  let endDate = format(new Date(), "yyyyMMdd");
  let startDate = format(subDays(new Date(), 7), "yyyyMMdd");
  // setting up what to show (default : calendar)
  const [statType, setStatType] = useState("moodscore");

  // filter by date (default : this week)
  const [filterByDate, setFilterByDate] = useState("last7");

  // filter by date (default : this week)
  const [filterByType, setFilterByType] = useState("t_both");

  // filter by date (default : this week)
  const [filterByMood, setFilterByMood] = useState(5);

  const [allMood, setAllmood] = useState(true);

  // date range to send to the components as props (default : from last week to today)
  const [dateRange, setDateRange] = useState(`${startDate}/${endDate}`);

  const handleClick = value => {
    setStatType(value);
  };
  const handleFilterByDate = date => {
    setFilterByDate(date);
  };
  const handleFilterByType = type => {
    setFilterByType(type);
  };
  const handleFilterByMood = mood => {
    setFilterByMood(Number(mood));
  };
  const handleCheck = () => {
    setAllmood(!allMood);
  };
  useEffect(() => {
    if (filterByDate === "alldate") {
      startDate = format(subDays(new Date(), 20000), "yyyyMMdd");
    } else if (filterByDate === "last365") {
      startDate = format(subDays(new Date(), 365), "yyyyMMdd");
    } else if (filterByDate === "last30") {
      startDate = format(subDays(new Date(), 30), "yyyyMMdd");
    } else {
      startDate = format(subDays(new Date(), 7), "yyyyMMdd");
    }
    setDateRange(`${startDate}/${endDate}`);
  }, [filterByDate]);

  return (
    <section className="section">
      {console.log(filterByMood)}
      <h1 className="title">Your moods</h1>
      <div className="container">
        <ChartsNav clbk={handleClick} />
        {statType !== "moodscore" && (
          <>
            <ChartsByDate
              clbk={handleFilterByDate}
              filterByDate={filterByDate}
            />
            <ChartsByMood
              clbk={handleFilterByMood}
              filterByMood={filterByMood}
              clbkCheck={handleCheck}
              allMood={allMood}
            />
          </>
        )}
        {statType === "moodscore" && <Calendar />}
        {statType === "keyword" && (
          <div style={{ minHeight: "306px" }}>
            <Bubble
              dateRange={dateRange}
              filterByType={filterByType}
              filterByMood={filterByMood}
              allMood={allMood}
            />
          </div>
        )}
        {statType !== "moodscore" && (
          <>
            <ChartsByType
              clbk={handleFilterByType}
              filterByType={filterByType}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Stats;
