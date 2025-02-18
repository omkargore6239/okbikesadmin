import React, { useEffect, useRef } from "react";

const BikeBookingStatistics = () => {
  const options = {
    series: [
      {
        name: "Daily Bookings",
        data: [50, 68, 45, 72, 85, 90, 110], // Simulated booking data
        color: "#1A56DB",
      },
      {
        name: "Canceled Bookings",
        data: [5, 8, 4, 10, 12, 6, 9],
        color: "#FF3E00",
      },
    ],
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    legend: {
      show: true,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: function (value) {
          return value + " bookings";
        },
      },
    },
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [options]);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="text-2xl font-bold text-gray-900 pb-2">
            Bike Booking Statistics
          </h5>
          <p className="text-base font-normal text-gray-500">
            Last 7 days performance
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold text-green-600">
            Total Bookings: 540
          </span>
          <div className="flex items-center px-2 py-1 text-base font-semibold text-green-500">
            15% Increase
            <svg
              className="w-4 h-4 ml-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          </div>
        </div>
      </div>
      <div ref={chartRef} id="bike-booking-chart"></div>
    </div>
  );
};

export default BikeBookingStatistics;
