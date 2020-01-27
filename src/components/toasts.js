import { useToasts } from "react-toast-notifications";
import React from "react";
export const AddedToMap = () => {
  const { addToast } = useToasts();
  return (
    <button
      className="create-entry"
      type="submit"
      value="Create Entry"
      onClick={() =>
        addToast("Success! A New Entry was just added to the map", {
          appearance: "success",
          autoDismiss: true
        })
      }
    >
      Create Entry
    </button>
  );
};
export const Deleted = () => {
  const { addToast } = useToasts();
  return (
    <button
      type="button"
      onClick={() =>
        addToast("An item was removed from your cart", {
          appearance: "warning",
          autoDismiss: true
        })
      }
    >
      Remove
    </button>
  );
};
