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
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      {/* Passenger */}
      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="passengerName" className="font-bold">
          Passenger Name
        </label>
        <input
          id="passengerName"
          type="text"
          className="border rounded-md px-3 py-2"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>

      {/* Airport */}
      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="airport" className="font-bold">
          Airport
        </label>
        <input
          id="airport"
          type="text"
          className="border rounded-md px-3 py-2"
          value={formData.airport}
          onChange={handleChange}
        />
      </div>

      {/* Timestamp */}
      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="timestamp" className="font-bold">
          Timestamp
        </label>
        <input
          id="timestamp"
          type="number"
          className="border rounded-md px-3 py-2"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1 flex-1">
        <label className="font-bold">Type</label>
        <div className="flex rounded-full border p-1 gap-1.5">
          <button
            type="button"
            onClick={() => setType("departure")}
            className={`flex-1 py-1 px-3 rounded-full transition
              ${
                type === "departure"
                  ? "bg-[#3EBAD0] text-white"
                  : "hover:bg-[#3EBAD0]/20"
              }`}
          >
            Departure
          </button>

          <button
            type="button"
            onClick={() => setType("arrival")}
            className={`flex-1 p-1 rounded-full transition
              ${
                type === "arrival"
                  ? "bg-[#3EBAD0] text-white"
                  : "hover:bg-[#3EBAD0]/20"
              }`}
          >
            Arrival
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`h-[42px] md:w-auto w-full rounded-lg text-white transition px-3
          ${
            isFormValid
              ? "bg-black hover:bg-[#3EBAD0]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Submit
      </button>
    </div>
  );
}

export default LogForm;
