import * as React from "react";

const ViewersIcon = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: 40,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "40%",
        marginRight: "40%",
      }}
    >
      <EyeIcon style={{ marginRight: 10 }} />
      <p style={{ fontWeight: 700 }}>
        {props.viewerCount < 100 ? props.viewerCount : "99+"}
      </p>
    </div>
  );
};

const EyeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#D9D9D9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 7c3.6-8 14.4-8 18 0"
    />
    <path
      stroke="#D9D9D9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 11a3 3 0 1 1 0-5.999A3 3 0 0 1 10 11Z"
    />
  </svg>
);

export default ViewersIcon;