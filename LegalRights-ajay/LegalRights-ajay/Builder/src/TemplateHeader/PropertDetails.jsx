import React from "react";

const PropertyDetails = () => {
  return (
    <form>
      <div className="form-group">
        <strong htmlFor="propertyValuation">Search Your Locality</strong>
        <select
          className="form-control"
          id="propertyValuation"
          name="propertyValuation"
        >
          <option value="">--select--</option>
          <option value="">Kashmere Gate</option>

          {/* Add more options here */}
        </select>
      </div>
      <div className="form-group">
        <strong htmlFor="district">District</strong>
        <select className="form-control" id="district" name="district">
          <option value="">--select--</option>
          <option value="">Central</option>
          {/* Add more options here */}
        </select>
      </div>

      <div className="form-group">
        <strong htmlFor="district">Sub-Division *</strong>
        <select className="form-control" id="district" name="district">
          <option value="">--select--</option>
          <option value="">Kashmere Gate</option>

          {/* Add more options here */}
        </select>
      </div>

      <div className="form-group">
        <strong htmlFor="district">Area/Locality *</strong>
        <select className="form-control" id="district" name="district">
          <option value="">--select--</option>
          <option value="">Kashmere Gate</option>

          {/* Add more options here */}
        </select>
      </div>

      <div className="form-group">
        <strong htmlFor="district">Area Type *</strong>
        <select className="form-control" id="district" name="district">
          <option value="">--select--</option>
          <option value="">Urban</option>

          {/* Add more options here */}
        </select>
      </div>

      <div className="form-group">
        <strong htmlFor="district">Local Governing Body</strong>
        <select className="form-control" id="district" name="district">
          <option value="">--select--</option>
          <option value="">MCD/NDMC</option>

          {/* Add more options here */}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default PropertyDetails;
