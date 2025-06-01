const DataEntry = (props) => {
  function dataValidation(data) {
    if (props.timeEntry) {
      return parseTime(data);
    } else {
      try {
        const cleanedUp = parseFloat(data);
        if (props.unit == "%") {
          return cleanedUp.toFixed(0);
        }
        return cleanedUp.toFixed(2);
      } catch (error) {
        console.log(error);
        return data;
      }
    }
  }

  function parseTime(time) {
    if (time) {
      const timestamp = new Date(time);
      return timestamp.toLocaleTimeString() + " - " + timestamp.toDateString();
    } else {
      return "Not Available";
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline",
        padding: 10,
      }}
    >
      <p style={{ fontWeight: 700 }}>{props.label} </p>
      <p style={{ marginLeft: 5, ...props.style }}>
        {props.noValidation ? props.data : dataValidation(props.data)}{" "}
      </p>
      <p style={{ fontWeight: 700, fontSize: 10 }}>{props.unit} </p>
    </div>
  );
};

export default DataEntry;