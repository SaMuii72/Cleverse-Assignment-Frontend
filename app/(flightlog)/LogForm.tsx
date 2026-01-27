import { useState, useCallback, ChangeEvent } from "react";

type LogType = "departure" | "arrival";

type LogFormProps = {
  onSubmit: (log: {
    passengerName: string;
    airport: string;
    timestamp: number;
    type: LogType;
  }) => void;
};

const emptyForm = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm({ onSubmit }: LogFormProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [type, setType] = useState<LogType>("departure");

  const isFormValid =
    formData.passengerName.trim() &&
    formData.airport.trim() &&
    formData.timestamp;

  const handleSubmit = useCallback(() => {
    onSubmit({
      passengerName: formData.passengerName,
      airport: formData.airport,
      timestamp: Number(formData.timestamp),
      type,
    });    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { id,value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  return (
    <div style={{ display: "flex", columnGap: 8 }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="pname" style={{ fontWeight: "bold" }}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="pname"
          name="pname"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="airport" style={{ fontWeight: "bold" }}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="timestamp" style={{ fontWeight: "bold" }}>
          Timestamp:
        </label>
        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default LogForm;
