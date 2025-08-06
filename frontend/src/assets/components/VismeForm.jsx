import React from 'react';

const VismeForm = ({ formUrl, formId }) => {
  return (
    <div
      className="visme_d"
      data-title="Visme Form"
      data-url={formUrl}
      data-domain="forms"
      data-full-page="false"
      data-min-height="500px"
      data-form-id={formId}
    ></div>
  );
};

export default VismeForm;