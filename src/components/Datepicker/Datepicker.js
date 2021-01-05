import React, { useState, useEffect } from "react";
import styled, {createGlobalStyle} from "styled-components";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

/** fixing the Mobile Calendar version through the Global style
 * as it is React.portal,
 */
const GlobalStyle = createGlobalStyle`
.DayPickerNavigation_button {
  box-sizing: border-box;
}
`

const CustomArrowIconBorder = styled.div`
  height: 57px;
  width: 1px;
  height: 42px;
  margin: 5px 40px 10px 39px;
  border: solid 1px rgba(19, 31, 43, 0.1);
  /* background-color: ${({ theme }) => theme.colorIce}; */
  /* border: solid 1px ${({ theme }) => theme.colorIce}; */
`;

const StyledDatePickerWrapper = styled.div`

/* Itamar code, */
& .DateRangePicker{
    width:100%;
}
   .DateRangePickerInput{
      height:100%;
      color: red;
      display:flex;
      /* align-self:center; */
      /* justify-self:center; */
      width:100%;
  }

    /* Fixing the width wirht the SearchBox comp */
    .DateRangePicker_picker {
      width: 811px;
      
      .DayPicker {
        width: 100% !important;

        & > div > div {
          width: 100% !important;

          /* Calendar Header */
          & .DayPicker_weekHeaders > div:last-child {
            left: 400px !important;
          }

          /* For Seprate Calendar Date */
          & .DayPicker_focusRegion {   
            
            & > .DayPicker_transitionContainer {
              width: 100% !important;

              .CalendarMonthGrid > .CalendarMonthGrid_month__horizontal {
                width: 400px !important;
              }
            }
          }
        }
      }
    }


    .DateInput {
      /* width: 100%; */
      /* display: flex; */
      .DateInput_input {
        font-size: 1rem;
        /* background-color: none; */
        border-bottom: 0;
        padding: 0;
        margin: 0;
        font-family:${({ theme }) => theme.primaryFont};
        color:${({ theme }) => theme.primaryDark || "#ff338f"};
        font-weight:300;
      }
    }
    .CalendarDay__selected {
        background: ${({ theme }) => theme.primaryPink || "#ff338f"};
        /* border: blueviolet; */
        /* border-radius: 90px; */
      }

      .CalendarDay__hovered_span{
        background: ${({ theme }) => theme.colorIce || "#ff338f"};
        /* border: black; */
      }
      .CalendarDay__selected_span{
        background: ${({ theme }) => theme.colorIce || "#ff338f"};
        color:#7c86a2;
      }
      .CalendarDay__default{
          border-radius:40px;
  
          border-color:transparent;
      }

      .DateRangePickerInput_arrow{
          display:none;
      }
  }
`;

export default function RvDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [innerScreenWith, setInnerScreenWidth] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate && startDate.isValid() && endDate.isValid()) {
      const newState = {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      };
      console.log(newState, "dates");
    }
  };

  /** For Mobile only */
  let mobileParams = {};
  if (innerScreenWith < 811)
    mobileParams = {
      orientation: "vertical",
      withFullScreenPortal: true,
      // autoFocus: true,
    };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      <GlobalStyle whiteColor />

    <StyledDatePickerWrapper>
      <DateRangePicker
        {...mobileParams}
        startDate={startDate}
        startDateId="tata-start-date"
        startDatePlaceholderText="Choose date"
        endDate={endDate}
        endDateId="tata-end-date"
        endDatePlaceholderText="Choose date"
        displayFormat="MMM DD YYYY"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        //   customInputIcon={<DateIcon />}
        // orientation={isTabletOrMobile ? "vertical" : "horizontal"}
        // numberOfMonths={1}
        //   numberOfMonths={isTabletOrMobile ? 1 : 2}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        noBorder
        customArrowIcon={<CustomArrowIconBorder />}
      />
    </StyledDatePickerWrapper>
    </>
  );
}
