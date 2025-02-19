/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "../src/components/DatePicker.module.css";
import {
  addDays,
  addMonths,
  differenceInMonths,
  format,
  isSameDay,
  lastDayOfMonth,
  startOfMonth,
  subDays
} from "date-fns";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function DatePickerDist({
 endDate,
 beginDate,
 selectDate,
 getSelectedDay,
 color,
 labelFormat
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const firstSection = {
    marginLeft: '40px'
  };
  const startDate = new Date();
  const firstDate = subDays(startDate, beginDate || 10);
  const lastDate = addDays(startDate, endDate || 90);
  const primaryColor = color || 'rgb(54, 105, 238)';
  const selectedStyle = {
    fontWeight: "bold",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: `2px solid ${primaryColor}`,
    color: primaryColor
  };
  const buttonColor = {
    background: primaryColor
  };
  const labelColor = {
    color: primaryColor
  };

  const getStyles = day => {
    if (isSameDay(day, selectedDate)) {
      return selectedStyle;
    }

    return null;
  };

  const getId = day => {
    if (isSameDay(day, selectedDate)) {
      return 'selected';
    } else {
      return "";
    }
  };

  function renderDays() {
    const dayFormat = "E";
    const dateFormat = "d";
    const months = [];
    let days = [];
    let k = 0;
    let end_k = beginDate ? beginDate -1: 9;

    for (let i = 0; i <= differenceInMonths(lastDate, firstDate); i++) {
      let start, end;
      const month = startOfMonth(addMonths(firstDate, i));
      start = i === 0 ? Number(format(firstDate, dateFormat)) - 1 : 0;
      end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));

      for (let j = start; j < end; j++) {
        if (k > end_k) {
          days.push( /*#__PURE__*/React.createElement("div", {
            id: `${getId(addDays(startDate, j))}`,
            className: styles.dateDayItem,
            style: getStyles(addDays(month, j)),
            key: addDays(month, j),
            onClick: () => onDateClick(addDays(month, j))
          }, /*#__PURE__*/React.createElement("div", {
            className: styles.dayLabel
          }, format(addDays(month, j), dayFormat)), /*#__PURE__*/React.createElement("div", {
            className: styles.dateLabel
          }, format(addDays(month, j), dateFormat))));
        } else{
          days.push( /*#__PURE__*/React.createElement("div", {
            id: `${getId(addDays(startDate, j))}`,
            className: styles.dateDayItem,
            style: getStyles(addDays(month, j)),
            key: addDays(month, j),
            onClick: () => onDateClick(addDays(month, j))
          }, /*#__PURE__*/React.createElement("div", {
            className: styles.prevDayLabel
          }, format(addDays(month, j), dayFormat)), /*#__PURE__*/React.createElement("div", {
            className: styles.prevDateLabel
          }, format(addDays(month, j), dateFormat))));
        }

        k+=1;
      }

      months.push( /*#__PURE__*/React.createElement("div", {
        className: styles.monthContainer,
        key: month
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.monthYearLabel,
        style: labelColor
      }, format(month, labelFormat || "MMMM yyyy")), /*#__PURE__*/React.createElement("div", {
        className: styles.daysContainer,
        style: i === 0 ? firstSection : null
      }, days)));
      days = [];
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "container",
      className: styles.dateListScrollable
    }, months);
  }

  const onDateClick = day => {
    setSelectedDate(day);

    if (getSelectedDay) {
      getSelectedDay(day);
    }
  };

  useEffect(() => {
    if (getSelectedDay) {
      if (selectDate) {
        getSelectedDay(selectDate);
      } else {
        let end = beginDate ? beginDate : 10;
        for (let i = 0; i <= end - 5; i++) {
          const e = document.getElementById('container');
          e.scrollLeft += 90;
        }
        getSelectedDay(startDate);
      }
    }
  }, []);
  useEffect(() => {
    if (selectDate) {
      if (!isSameDay(selectedDate, selectDate)) {
        setSelectedDate(selectDate);
        setTimeout(() => {
          let view = document.getElementById('selected');

          if (view) {
            view.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest"
            });
          }
        }, 20);
      }
    }
  }, [selectDate]);

  const nextWeek = () => {
    const e = document.getElementById('container');
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft += width/2 - 61;
  };

  const prevWeek = () => {
    const e = document.getElementById('container');
    const width = e ? e.getBoundingClientRect().width : null;
    e.scrollLeft -= width/2 - 61;
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.buttonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.buttonLeft,
    style: buttonColor,
    onClick: prevWeek
  }, React.createElement(ArrowBackIosIcon, {}) )), renderDays(), /*#__PURE__*/React.createElement("div", {
    className: styles.buttonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.buttonRight,
    style: buttonColor,
    onClick: nextWeek
  }, React.createElement(ArrowForwardIosIcon, {}))));
}
/*more pictures
* example code sandbox
* update readme*/