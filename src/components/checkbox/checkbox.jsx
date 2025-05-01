import * as React from "react";
import "./checkbox.scss";

export const Checkbox = ({
  onClick,
  checked,
  onDelete,
  label,
  onKeyUp,
  onEdit,
  dueDate,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isEditingDate, setIsEditingDate] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState(label);
  const [newDate, setNewDate] = React.useState("");
  // console.log("todo date", dueDate);

  const handleEditSubmit = () => {
    onEdit(newLabel, newDate);
    setIsEditing(false);
    setIsEditingDate(false);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <div className={checked ? "checkbox-checked" : "checkbox"}>
      <div
        tabIndex="0"
        role="checkbox"
        aria-checked={checked}
        className="checkbox-content"
        // onClick={onClick}
        onKeyUp={onKeyUp}
      >
        <input
          tabIndex="-1"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxClick}
          onClick={(e) => e.stopPropagation()}
        />
        {/* {isEditing ? (
          <input
            className="checkbox-edit-input"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditSubmit();
              }
            }}
            // autoFocus
          />
        ) : isEditingDate ? (
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            // onKeyUp={handleKeyUp}
          />
        ) : (
          <span
            // className={checked ? "checkbox-checked" : ""}
            onDoubleClick={() => setIsEditing(true)}
          >
            {label} {`Due date : ${dueDate ?? "N/A"}`}
          </span>
        )} */}
        {isEditing && (
          <input
            className="checkbox-edit-input"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditSubmit();
              }
            }}
            // autoFocus
          />
        )}

        {isEditingDate && (
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditSubmit();
              }
            }}
            // onKeyUp={handleKeyUp}
          />
        )}

        {!isEditing && !isEditingDate && (
          <span
            // className={checked ? "checkbox-checked" : ""}
            onDoubleClick={() => setIsEditing(true)}
          >
            {label} {`Due date : ${dueDate ?? "N/A"}`}
          </span>
        )}

        {/* <span className={checked ? "checkbox-checked" : ""}>{label}</span> */}
      </div>
      <div className="checkbox-actions">
        <button type="button" onClick={() => setIsEditingDate(true)}>
          Date
        </button>
        <button type="button" onClick={() => setIsEditing(true)}>
          ✏️
        </button>
        <button type="button" className="checkbox-delete" onClick={onDelete}>
          ❌
        </button>
      </div>
      {/* <button type="button" className="checkbox-delete" onClick={onDelete}>
        x
      </button> */}
    </div>
  );
};
